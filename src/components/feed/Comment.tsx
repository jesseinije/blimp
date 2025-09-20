import { useState } from "react";
import { CheckCircle } from "phosphor-react";
import { Heart } from "../../Icons";
import { getUserById } from "../../data/mockData";
import type { Comment as CommentType } from "../../types";
import Caption from "../ui/Caption";
import { Link } from "react-router-dom";

interface CommentProps {
  comment: CommentType;
  onReply?: (commentId: string, username: string) => void;
  onViewReplies?: () => void;
  showRepliesButton?: boolean;
  isExpanded?: boolean;
}

const Comment = ({
  comment,
  onReply,
  onViewReplies,
  showRepliesButton = false,
  isExpanded = false,
}: CommentProps) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes);
  const replyCount = comment.replies?.length || 0;

  const user = getUserById(comment.userId);

  if (!user) return null;

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleReply = () => {
    if (onReply) {
      onReply(comment.id, user.username);
    }
  };

  const formattedDate = new Date(comment.createdAt).toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
    }
  );

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}K`;
    }
    return count.toString();
  };

  return (
    <div className="flex mb-4">
      <Link to={`/profile/${user.username}`} className="shrink-0">
        <img
          src={user.avatar}
          alt={user.username}
          className="w-8 h-8 rounded-full object-cover mr-3"
        />
      </Link>
      <div className="flex-1">
        <div className="flex items-start">
          <div className="flex-1">
            <div className="flex items-center">
              <div className="inline-flex items-center">
                <Link
                  to={`/profile/${user.username}`}
                  className="font-semibold text-sm mr-1 text-gray-900"
                >
                  {user.username}
                </Link>
                {user.isVerified ? (
                  <span className="text-blue-500 mr-2">
                    <CheckCircle
                      size={18}
                      weight="fill"
                      className="text-blue-500"
                    />
                  </span>
                ) : (
                  <span className="mr-2"></span>
                )}
                <span className="text-xs text-gray-400">{formattedDate}</span>
              </div>
            </div>

            {/* Comment text */}
            <Caption text={comment.text} maxLength={120} />

            {/* Actions row */}
            <div className="flex items-center mt-8">
              <div className="flex items-center space-x-4 text-xs text-gray-900">
                <button onClick={handleLike} className="flex items-center">
                  <Heart
                    size={17}
                    weight={liked ? "fill" : "regular"}
                    className={liked ? "text-red-500" : ""}
                  />
                  {likes > 0 && (
                    <span className="ml-1">{formatCount(likes)}</span>
                  )}
                </button>

                <button onClick={handleReply}>Reply</button>

                {showRepliesButton && (
                  <button onClick={onViewReplies}>
                    {isExpanded
                      ? `Hide replies`
                      : `View ${replyCount} ${
                          replyCount === 1 ? "reply" : "replies"
                        }`}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
