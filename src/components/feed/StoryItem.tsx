import { type User } from "../../types";
import { Plus } from "phosphor-react";

interface StoryItemProps {
  user: User & { hasStory: boolean; isRead?: boolean };
  isCurrentUser: boolean;
}

const StoryItem = ({ user, isCurrentUser }: StoryItemProps) => {
  const currentUserAvatar =
    "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757584555/defaultProfile_0_kyvmqg.png";

  // Determine ring color: blue for unread, gray for read
  const ringClass =
    user.hasStory && !isCurrentUser
      ? user.isRead
        ? "ring-2 ring-offset-2 ring-gray-300"
        : "ring-2 ring-offset-2 ring-blue-500"
      : "";

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative">
        <div
          className={`w-[5.5rem] h-[5.5rem] rounded-full overflow-hidden ${ringClass}`}
        >
          <img
            src={isCurrentUser ? currentUserAvatar : user.avatar}
            alt={`${user.username}'s story`}
            className="w-full h-full object-cover"
          />
          {isCurrentUser && (
            <div className="absolute bottom-0 right-1 bg-blue-500 rounded-full p-1 border-2 border-white">
              <Plus size={12} weight="bold" className="text-white" />
            </div>
          )}
        </div>
      </div>
      <span className="text-xs truncate w-20 text-center text-gray-900">
        {isCurrentUser ? "Your story" : user.username}
      </span>
    </div>
  );
};

export default StoryItem;
