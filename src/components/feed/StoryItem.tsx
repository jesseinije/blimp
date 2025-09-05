import { type User } from "../../types";
import { Plus } from "phosphor-react";

interface StoryItemProps {
  user: User & { hasStory: boolean };
  isCurrentUser: boolean;
}

const StoryItem = ({ user, isCurrentUser }: StoryItemProps) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative">
        <div
          className={`w-20 h-20 rounded-full overflow-hidden ${
            user.hasStory && !isCurrentUser
              ? "ring-2 ring-offset-2 ring-blue-500"
              : ""
          }`}
        >
          <img
            src={user.avatar}
            alt={`${user.username}'s story`}
            className="w-full h-full object-cover"
          />
          {isCurrentUser && (
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-2 border-white">
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
