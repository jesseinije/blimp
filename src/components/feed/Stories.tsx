import { useEffect, useState } from "react";
import { useAppStore } from "../../store/appStore";
import StoryItem from "./StoryItem";
import { getUserById } from "../../data/mockData";
import type { User } from "../../types";

const Stories = () => {
  const { stories, currentUser } = useAppStore();
  const [storyUsers, setStoryUsers] = useState<
    (User & { hasStory: boolean })[]
  >([]);

  useEffect(() => {
    // First, add current user with "Your story" option
    if (currentUser) {
      const userStories = stories.filter(
        (story) => story.userId === currentUser.id
      );
      const hasUserStory = userStories.length > 0;

      // Get unique users who have stories
      const usersWithStories: { [key: string]: boolean } = {};
      stories.forEach((story) => {
        usersWithStories[story.userId] = true;
      });

      const storyUsersList = Object.keys(usersWithStories)
        .map((userId) => {
          const user = getUserById(userId);
          return user ? { ...user, hasStory: true } : null;
        })
        .filter((user): user is User & { hasStory: boolean } => user !== null);

      // Add current user at the beginning if not already included
      const currentUserExists = storyUsersList.some(
        (user) => user.id === currentUser.id
      );

      if (!currentUserExists) {
        setStoryUsers([
          { ...currentUser, hasStory: hasUserStory },
          ...storyUsersList.filter((user) => user.id !== currentUser.id),
        ]);
      } else {
        // Make sure current user is first in the list
        setStoryUsers([
          ...storyUsersList.filter((user) => user.id === currentUser.id),
          ...storyUsersList.filter((user) => user.id !== currentUser.id),
        ]);
      }
    } else {
      // If no current user, just show all users with stories
      const usersWithStories = stories.reduce<{ [key: string]: boolean }>(
        (acc, story) => {
          acc[story.userId] = true;
          return acc;
        },
        {}
      );

      const storyUsersList = Object.keys(usersWithStories)
        .map((userId) => {
          const user = getUserById(userId);
          return user ? { ...user, hasStory: true } : null;
        })
        .filter((user): user is User & { hasStory: boolean } => user !== null);

      setStoryUsers(storyUsersList);
    }
  }, [stories, currentUser]);

  if (storyUsers.length === 0) {
    return null;
  }

  return (
    <div className="bg-white overflow-x-auto no-scrollbar">
      <div className="px-3">
        <div className="flex py-6">
          {/* Add left spacer */}
          <div className="flex-shrink-0" />

          {/* Stories list with consistent spacing */}
          <div className="flex space-x-6">
            {storyUsers.map((user) => (
              <StoryItem
                key={user.id}
                user={user}
                isCurrentUser={currentUser?.id === user.id}
              />
            ))}
          </div>

          {/* Add right spacer */}
          <div className="flex-shrink-0 w-3" />
        </div>
      </div>
    </div>
  );
};

export default Stories;
