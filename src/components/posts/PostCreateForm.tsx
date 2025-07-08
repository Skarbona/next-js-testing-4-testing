"use client";
import { startTransition, useActionState } from "react";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import * as actions from "@/actions";
import FormButton from "../common/FormButton";

interface PostCreateFormProps {
  slug: string | undefined;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, action, isPending] = useActionState(
    actions.createPost.bind(null, slug ?? ""),
    {
      errors: {},
    },
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary" variant="flat">
          Create a Post
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form className="flex flex-col gap-4 p-4 w-80" onSubmit={handleSubmit}>
          <h3 className="text-lg font-semibold">Create a Post</h3>
          <Input
            placeholder="Title"
            label="Content"
            name="title"
            labelPlacement="outside"
            isInvalid={!!formState.errors.title}
            errorMessage={formState.errors.title?.join(", ")}
          />
          <Textarea
            placeholder="Content"
            name="content"
            label="Content"
            labelPlacement="outside"
            isInvalid={!!formState.errors.content}
            errorMessage={formState.errors.content?.join(", ")}
          />
          {formState.errors._form && (
            <div className="text-red-500">
              {formState.errors._form.join(", ")}
            </div>
          )}
          <FormButton isLoading={isPending}>Submit</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
}
