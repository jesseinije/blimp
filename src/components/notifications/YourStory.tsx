import { useAppStore } from "../../store/appStore";
import StoryItem from "../feed/StoryItem";

const YourStory = () => {
  const { currentUser, stories } = useAppStore();

  if (!currentUser) {
    return null;
  }

  const hasUserStory = stories.some((story) => story.userId === currentUser.id);

  return (
    <div className="bg-white px-3 py-4 w-full">
      <div className="flex">
        <StoryItem
          user={{ ...currentUser, hasStory: hasUserStory }}
          isCurrentUser={true}
        />
      </div>
    </div>
  );
};

export default YourStory;
