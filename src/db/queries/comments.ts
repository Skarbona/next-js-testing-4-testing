import type { Comment } from "@prisma/client";
import { cache } from "react";
import { db } from "@/db";

export type CommentWithAuthor = Comment & {
  user: {
    image: string | null;
    name: string | null;
  };
};

export const getCommentsByPostId = cache(
  async (postId: string): Promise<CommentWithAuthor[]> => {
    console.log("Fetching comments for postId:", postId);
    return db.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            image: true,
            name: true,
          },
        },
      },
    });
  },
);
