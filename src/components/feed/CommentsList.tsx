import Comment from "./Comment";
import type { Comment as CommentType } from "../../types";

interface CommentsListProps {
  postId: string;
  comments: CommentType[];
  onReply?: (commentId: string, username: string) => void;
  showReplies?: boolean;
  onToggleReplies?: (commentId: string) => void;
  expandedComments?: Set<string>;
}
const CommentsList = ({
  comments,
  onReply,
  onToggleReplies,
  expandedComments = new Set(),
}: CommentsListProps) => {
  const handleReply = (commentId: string, username: string) => {
    if (onReply) {
      onReply(commentId, username);
    }
  };

  const handleToggleReplies = (commentId: string) => {
    if (onToggleReplies) {
      onToggleReplies(commentId);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id}>
            <Comment
              comment={comment}
              onReply={handleReply}
              onViewReplies={() => handleToggleReplies(comment.id)}
              showRepliesButton={(comment.replies?.length || 0) > 0}
              isExpanded={expandedComments.has(comment.id)}
            />

            {/* Render replies if expanded */}
            {expandedComments.has(comment.id) &&
              comment.replies &&
              comment.replies.length > 0 && (
                <div className="pl-8 border-l border-gray-100 mt-2">
                  {comment.replies.map((reply) => (
                    <Comment
                      key={reply.id}
                      comment={reply}
                      onReply={handleReply}
                    />
                  ))}
                </div>
              )}
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
          <p className="text-lg font-medium">No comments yet</p>
          <p className="text-sm">Be the first to comment on this post!</p>
        </div>
      )}
    </div>
  );
};

export default CommentsList;
