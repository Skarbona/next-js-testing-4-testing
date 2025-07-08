"use server";

import { z } from "zod";
import { auth } from "@/auth";
import type { Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import paths from "@/paths";
import { revalidatePath } from "next/cache";

const createTopicSchema = z.object({
  name: z.string().min(3, "Topic must be at least 3 characters long"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long"),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formsState: CreateTopicFormState,
  formData: FormData,
): Promise<CreateTopicFormState> {
  const result = createTopicSchema.safeParse({
    name: formData.get("name")?.toString().trim(),
    description: formData.get("description")?.toString().trim(),
  });

  const session = await auth();

  if (!session?.user) {
    return {
      errors: {
        name: undefined,
        description: undefined,
        _form: ["You must be signed in to create a topic"],
      },
    };
  }

  if (!result.success) {
    return {
      errors: {
        name: result.error.formErrors.fieldErrors.name,
        description: result.error.formErrors.fieldErrors.description,
        _form: undefined,
      },
    };
  }

  let topic: Topic | null = null;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });

    if (!topic) {
      return {
        errors: {
          name: undefined,
          description: undefined,
          _form: ["Failed to create topic"],
        },
      };
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          name: [err.message],
          description: undefined,
          _form: undefined,
        },
      };
    }
    return {
      errors: {
        name: undefined,
        description: undefined,
        _form: ["An unexpected error occurred while creating the topic"],
      },
    };
  }

  revalidatePath(paths.home());
  redirect(paths.topicShow(topic.slug || ""));

  return {
    errors: {},
  };
}
