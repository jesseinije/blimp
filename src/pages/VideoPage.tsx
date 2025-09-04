import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VideoPageFeed from "../components/reels/ReelsFeed";
import { mockPosts } from "../data/mockData";
import { useAppStore } from "../store/appStore";
import { CaretLeft, MagnifyingGlass } from "phosphor-react";
import { useViewportHeight } from "../hooks/useViewportHeight"; // <-- Add this line

const VideoPage = () => {
  useViewportHeight(); // <-- Add this line

  const { videoId } = useParams<{ videoId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setReels, setVideosFilter } = useAppStore();

  useEffect(() => {
    if (!videoId) {
      setError("Video ID is required");
      setLoading(false);
      return;
    }

    try {
      // Find the video post that matches the ID
      const foundPost = mockPosts.find(
        (post) => post.id === videoId && post.media[0].type === "video"
      );

      if (foundPost) {
        // Get all other video posts excluding the current one
        const otherVideoPosts = mockPosts.filter(
          (post) => post.id !== videoId && post.media[0].type === "video"
        );

        // Shuffle the other video posts for random suggestions
        const shuffledVideoPosts = [...otherVideoPosts].sort(
          () => 0.5 - Math.random()
        );

        // Take the first 4 as suggested videos
        const suggestedVideos = shuffledVideoPosts.slice(0, 4);

        // Add a custom property to identify which reels are suggestions
        // The main video doesn't get the isSuggested flag
        const mainVideo = { ...foundPost, isSuggested: false };

        // The suggested videos get the isSuggested flag set to true
        const markedSuggestedVideos = suggestedVideos.map((video) => ({
          ...video,
          isSuggested: true,
        }));

        // Combine the selected video with marked suggested videos
        const reelsToShow = [mainVideo, ...markedSuggestedVideos];

        // Set the reels in the app store for ReelsFeed to display
        setReels(reelsToShow);

        // Reset any filters that might be applied in ReelsFeed
        setVideosFilter("for-you");

        // Set VideoPage flag
        useAppStore.getState().setIsVideoPage(true);

        setLoading(false);
      } else {
        setError("Video not found");
        setLoading(false);
      }
    } catch (err) {
      setError("Failed to load video");
      console.error(err);
      setLoading(false);
    }

    // Cleanup function
    return () => {
      // Restore reels and reset VideoPage flag
      useAppStore.getState().restoreReels();
      useAppStore.getState().setIsVideoPage(false);
    };
  }, [videoId, setReels, setVideosFilter]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleNavigateToSearch = () => {
    navigate("/search");
  };

  if (loading) {
    return (
      <div
        className="flex justify-center items-center bg-black"
        style={{
          height: `calc(100dvh - env(safe-area-inset-top, 0px))`,
        }}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex flex-col items-center justify-center bg-black text-white"
        style={{
          height: `calc(100dvh - env(safe-area-inset-top, 0px))`,
        }}
      >
        <div className="text-lg font-medium mb-4">{error}</div>
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-gray-800 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div
      className="max-w-2xl mx-auto bg-black relative"
      style={{
        minHeight: "100dvh",
        height: `calc(100dvh - env(safe-area-inset-top, 0px))`,
        maxHeight: `calc(100dvh - env(safe-area-inset-top, 0px))`,
      }}
    >
      {/* Navigation bar with back and search buttons */}
      <div
        className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent"
        style={{
          paddingTop: `calc(env(safe-area-inset-top, 0px) + 0.75rem)`,
          paddingBottom: "0.75rem",
        }}
      >
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
          <span className="text-white/70 text-sm">Search</span>
        </div>
      </div>

      {/* Video feed content - full height */}
      <div
        style={{
          height: `calc(100dvh - env(safe-area-inset-top, 0px))`,
          maxHeight: `calc(100dvh - env(safe-area-inset-top, 0px))`,
        }}
      >
        <VideoPageFeed />
      </div>
    </div>
  );
};

export default VideoPage;
