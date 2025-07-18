import Image from "next/image";
import {
  getCommentsByPostId,
  type CommentWithAuthor,
} from "@/db/queries/comments";
import CommentCreateForm from "./CommentCreateForm";
import { get } from "http";
import { comment } from "postcss";

interface CommentShowProps {
  commentId: string;
  // comments: CommentWithAuthor[];
  postId: string;
}

export default async function CommentShow({
  commentId,
  postId,
}: CommentShowProps) {
  const comments = await getCommentsByPostId(postId);
  const comment = comments.find((c) => c.id === commentId);

  if (!comment) {
    return null;
  }

  const children = comments.filter((c) => c.parentId === commentId);

  return (
    <div className="p-4 border mt-2 mb-1">
      <div className="flex gap-3">
        <Image
          src={comment.user.image || ""}
          alt="user image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-gray-500">
            {comment.user.name}
          </p>
          <p className="text-gray-900">{comment.content}</p>

          <CommentCreateForm postId={comment.postId} parentId={comment.id} />
        </div>
      </div>
      <div className="pl-4">
        {children.map((child) => {
          return (
            <CommentShow
              key={child.id}
              commentId={child.id}
              comments={comments}
            />
          );
        })}
      </div>
    </div>
  );
}
