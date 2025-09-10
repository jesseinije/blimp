import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReelsFeed from "../components/reels/ReelsFeed";
import { mockPosts, mockUsers } from "../data/mockData";
import { useAppStore } from "../store/appStore";
import { CaretLeft, MagnifyingGlass } from "phosphor-react";
import { useViewportHeight } from "../hooks/useViewportHeight";

const UserReelsPage = () => {
  useViewportHeight();

  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setReels, setVideosFilter } = useAppStore();
  // Store the username for search placeholder
  const [searchUsername, setSearchUsername] = useState<string>("");

  useEffect(() => {
    if (!userId) {
      setError("User ID is required");
      setLoading(false);
      return;
    }

    try {
      // Find the user
      const user = mockUsers.find((u) => u.id === userId);

      if (!user) {
        setError("User not found");
        setLoading(false);
        return;
      }

      // Set the username for display and search placeholder
      setSearchUsername(user.username || user.displayName || "");

      // Find all video posts from this user
      const userVideoPosts = mockPosts.filter(
        (post) => post.user.id === userId && post.media[0].type === "video"
      );

      if (userVideoPosts.length === 0) {
        setError(
          `${
            user.username || user.displayName || "User"
          } doesn't have any videos`
        );
        setLoading(false);
        return;
      }

      // Add a custom property to identify which reels are from this user
      const markedUserVideos = userVideoPosts.map((video) => ({
        ...video,
        isUserVideo: true,
      }));

      // Set the reels in the app store for ReelsFeed to display
      setReels(markedUserVideos);

      // Reset any filters that might be applied in ReelsFeed
      setVideosFilter("for-you");

      // Set VideoPage flag
      useAppStore.getState().setIsVideoPage(true);

      setLoading(false);
    } catch (err) {
      setError("Failed to load videos");
      console.error(err);
      setLoading(false);
    }

    // Cleanup function
    return () => {
      // Restore reels and reset VideoPage flag
      useAppStore.getState().restoreReels();
      useAppStore.getState().setIsVideoPage(false);
    };
  }, [userId, setReels, setVideosFilter]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleNavigateToSearch = () => {
    navigate("/search");
  };

  return (
    <div className="fixed inset-0 bg-black">
      {loading ? (
        <div className="flex justify-center items-center h-full w-full bg-black">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-full w-full bg-black text-white">
          <div className="text-lg font-medium mb-4">{error}</div>
          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-gray-800 rounded-lg"
          >
            Go Back
          </button>
        </div>
      ) : (
        <>
          {/* Navigation bar with back and search buttons */}
          <div className="absolute top-3 left-0 right-0 z-50 flex justify-between items-center">
            <button
              onClick={handleGoBack}
              className="p-2 rounded-full text-white"
              aria-label="Go back"
            >
              <CaretLeft size={24} />
            </button>

            <div
              onClick={handleNavigateToSearch}
              className="flex-1 mx-3 flex items-center rounded-lg border-[1px] border-[rgba(255,255,255,0.5)] px-4 py-1.5 cursor-pointer"
            >
              <MagnifyingGlass
                size={18}
                weight="light"
                className="text-white/70 mr-2"
              />
              <span className="text-white/70 text-sm">
                {searchUsername ? `Search for ${searchUsername}` : "Search"}
              </span>
            </div>
          </div>

          {/* ReelsFeed with navBarHeightOverride set to 0 */}
          <ReelsFeed navBarHeightOverride={0} />
        </>
      )}
    </div>
  );
};

export default UserReelsPage;
