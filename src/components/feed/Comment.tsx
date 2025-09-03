import { useState } from "react";
import { Heart, ArrowBendUpLeft, CheckCircle } from "phosphor-react";
import { getUserById } from "../../data/mockData";
import type { Comment as CommentType } from "../../types";
import Caption from "../ui/Caption";
import { Link } from "react-router-dom";

interface CommentProps {
  comment: CommentType;
  onReply?: (commentId: string, username: string) => void;
  onViewReplies?: () => void;
}

const Comment = ({ comment, onReply, onViewReplies }: CommentProps) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes);
  const [replyCount] = useState(comment.replies?.length || 0);

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

  const handleViewReplies = () => {
    if (onViewReplies && replyCount > 0) {
      onViewReplies();
    } else {
      // If no replies but user wants to reply, trigger the reply function
      handleReply();
    }
  };

  const formattedDate = new Date(comment.createdAt).toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
    }
  );

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

            {/* Modified Reactions row */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <button
                  onClick={handleViewReplies}
                  className="text-gray-900 hover:text-gray-700 mr-1.5"
                >
                  <ArrowBendUpLeft size={18} />
                </button>
                <span className="text-xs text-gray-900 font-medium">
                  {replyCount > 0 ? replyCount : ""}
                </span>
              </div>

              <div className="flex items-center">
                <button onClick={handleLike} className="mr-1.5 text-gray-900">
                  <Heart
                    size={18}
                    weight={liked ? "fill" : "regular"}
                    className={liked ? "text-red-500" : ""}
                  />
                </button>
                <span className="text-xs text-gray-900 font-medium">
                  {likes > 0 ? likes : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
