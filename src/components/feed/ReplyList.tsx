import { useEffect, useRef, useState } from "react";
import { useAppStore } from "../../store/appStore";
import { getUserById } from "../../data/mockData";
import type { Comment as CommentType } from "../../types";
import Comment from "./Comment";

interface ReplyListProps {
  comment: CommentType;
  onReply: (commentId: string, username: string) => void;
}

const ReplyList = ({ comment, onReply }: ReplyListProps) => {
  const { currentUser } = useAppStore();
  const [replyText, setReplyText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [replyToUser, setReplyToUser] = useState<string | null>(null);

  const user = getUserById(comment.userId);

  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyText(e.target.value);
  };

  const handleSubmitReply = () => {
    if (replyText.trim() === "") return;

    // In a real app, you'd add the reply to the comment
    console.log("Adding reply:", {
      commentId: comment.id,
      text: replyText,
      replyTo: replyToUser,
    });

    // Clear the input
    setReplyText("");
    setReplyToUser(null);
  };

  const handleReplyToReply = (username: string) => {
    setReplyToUser(username);
    if (inputRef.current) {
      inputRef.current.focus();
      setReplyText(`@${username} `);
    }
  };

  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Original comment */}
      <div>
        <Comment
          comment={comment}
          onReply={() => onReply(comment.id, user?.username || "")}
        />
      </div>

      {/* Divider between comment and replies */}
      <hr className="my-2 mx-[-16px] border-gray-200 " />

      {/* Replies list */}
      <div className="flex-1 overflow-y-auto">
        {comment.replies && comment.replies.length > 0 ? (
          <div className="mt-2 ml-8 pl-4">
            {comment.replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                onReply={handleReplyToReply}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center text-gray-400">
            <p className="text-lg font-medium">No replies yet</p>
            <p className="text-sm">Be the first to reply to this comment</p>
          </div>
        )}
      </div>

      {/* Reply input area */}
      <div className="border-t border-gray-200 -mx-4">
        <div className="px-4 py-3">
          {replyToUser && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">
                Replying to{" "}
                <span className="font-medium text-gray-900">
                  @{replyToUser}
                </span>
              </span>
              <button
                onClick={() => {
                  setReplyToUser(null);
                  setReplyText("");
                }}
                className="text-gray-400 text-sm"
              >
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
                placeholder="Add a reply..."
                className="flex-1 text-sm py-1 px-0 border-none bg-transparent placeholder-gray-400 focus:outline-none"
                value={replyText}
                onChange={handleReplyChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitReply();
                  }
                }}
              />
              <button
                onClick={handleSubmitReply}
                disabled={replyText.trim() === ""}
                className={`ml-2 ${
                  replyText.trim() === ""
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

export default ReplyList;
