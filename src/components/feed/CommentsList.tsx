import { useState, useRef, useEffect } from "react";
import { useAppStore } from "../../store/appStore";
import Comment from "./Comment";
import type { Comment as CommentType } from "../../types";

interface CommentsListProps {
  postId: string;
  comments: CommentType[];
  onViewReplies: (comment: CommentType, title: string) => void;
}

const CommentsList = ({
  postId,
  comments,
  onViewReplies,
}: CommentsListProps) => {
  const { currentUser } = useAppStore();
  const [commentText, setCommentText] = useState("");
  const [replyTo, setReplyTo] = useState<{
    id: string;
    username: string;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleSubmitComment = () => {
    if (commentText.trim() === "") return;

    // In a real app, you'd add the comment to the post
    console.log("Adding comment:", {
      postId,
      text: commentText,
      replyTo: replyTo?.id,
    });

    // Clear the input and reset reply state
    setCommentText("");
    setReplyTo(null);
  };

  const handleReply = (commentId: string, username: string) => {
    setReplyTo({ id: commentId, username });
    if (inputRef.current) {
      inputRef.current.focus();
      setCommentText(`@${username} `);
    }
  };

  const handleViewReplies = (comment: CommentType) => {
    onViewReplies(comment, "Replies");
  };

  const cancelReply = () => {
    setReplyTo(null);
    setCommentText("");
  };

  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col h-full -mx-4">
      <div className="flex-1 overflow-y-auto px-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              onViewReplies={() => handleViewReplies(comment)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
            <p className="text-lg font-medium">No comments yet</p>
            <p className="text-sm">Be the first to comment on this post!</p>
          </div>
        )}
      </div>

      {/* Comment input area */}
      <div className="border-t border-gray-200 ">
        <div className="px-4 py-3">
          {replyTo && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">
                Replying to{" "}
                <span className="font-medium text-gray-900">
                  @{replyTo.username}
                </span>
              </span>
              <button onClick={cancelReply} className="text-gray-400 text-sm">
                Cancel
              </button>
            </div>
          )}
          <div className="flex items-center">
            {currentUser && (
              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="w-8 h-8 rounded-full mr-3 object-cover"
              />
            )}
            <div className="flex-1 flex items-center">
              <input
                ref={inputRef}
                type="text"
                placeholder="Add a comment..."
                className="flex-1 text-sm py-1 px-0 border-none bg-transparent placeholder-gray-400 focus:outline-none"
                value={commentText}
                onChange={handleCommentChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitComment();
                  }
                }}
              />
              <button
                onClick={handleSubmitComment}
                disabled={commentText.trim() === ""}
                className={`ml-2 ${
                  commentText.trim() === ""
                    ? "text-blue-200 "
                    : "text-blue-500 hover:text-blue-600"
                }`}
              >
                <span className="font-semibold text-sm">Post</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsList;
