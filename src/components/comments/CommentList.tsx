import { CommentWithAuthor, getCommentsByPostId } from "@/db/queries/comments";
import CommentShow from "./CommentShow";

interface CommentListProps {
  // fetchData: () => Promise<CommentWithAuthor[]>;
  postId: string; // Optional, if needed for context
}

export default async function CommentList({
  fetchData,
  postId,
}: CommentListProps) {
  // const comments = await fetchData();

  const comments = await getCommentsByPostId(postId);

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null,
  );

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {topLevelComments.map((comment) => {
        return (
          <CommentShow
            key={comment.id}
            commentId={comment.id}
            postId={postId}
            // comments={comments}
          />
        );
      })}
    </div>
  );
}
