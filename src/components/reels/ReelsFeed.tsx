import { useState, useRef, useEffect } from "react";
import Reel from "./Reel";
import type { ReelData } from "./Reel";
import { useAppStore } from "../../store/appStore";
import { useLocation } from "react-router-dom";
import { useNavBarHeight } from "../../hooks/useNavBarHeight";
import { useViewportHeight } from "../../hooks/useViewportHeight";

// Add props interface with optional navBarHeightOverride
interface ReelsFeedProps {
  navBarHeightOverride?: number;
}

// Update component to accept props
const ReelsFeed = ({ navBarHeightOverride }: ReelsFeedProps) => {
  const { reels, videosFilter } = useAppStore();
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const feedRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Use the override if provided, otherwise use the hook
  const calculatedNavBarHeight = useNavBarHeight(100);
  const navBarHeight =
    navBarHeightOverride !== undefined
      ? navBarHeightOverride
      : calculatedNavBarHeight;

  const viewportHeight = useViewportHeight(); // Get the actual viewport height

  // Check if we're on the VideoPage based on the URL path
  const isVideoPage = location.pathname.startsWith("/video/");

  // Convert posts to reels format and filter based on selected filter
  const [filteredReels, setFilteredReels] = useState<ReelData[]>(
    convertPostsToReels(
      reels.filter((reel) => {
        if (videosFilter === "following") {
          return reel.user?.isFollowing || false;
        } else if (videosFilter === "live") {
          // For demo, let's consider reel id 3 as "live"
          return reel.id === "3";
        }
        // Default is "for-you" which shows all reels
        return true;
      })
    )
  );

  // Update reels when filter changes
  useEffect(() => {
    setFilteredReels(
      convertPostsToReels(
        reels.filter((reel) => {
          if (videosFilter === "following") {
            return reel.user?.isFollowing || false;
          } else if (videosFilter === "live") {
            // For demo, let's consider reel id 3 as "live"
            return reel.id === "3";
          }
          // Default is "for-you" which shows all reels
          return true;
        })
      )
    );
    setCurrentReelIndex(0); // Reset current reel index when filter changes
  }, [reels, videosFilter]);

  // Handle intersection observer to determine which reel is visible
  useEffect(() => {
    if (!feedRef.current) return;

    const options = {
      root: feedRef.current,
      rootMargin: "0px",
      threshold: 0.8,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(
            entry.target.getAttribute("data-index") || "0"
          );
          setCurrentReelIndex(index);
        }
      });
    }, options);

    // Observe all reel elements
    const reelElements = feedRef.current.querySelectorAll(".reel-item");
    reelElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      reelElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [filteredReels, isVideoPage]);

  // Action handlers
  const handleLike = (reelId: string) => {
    useAppStore.getState().likePost(reelId);
  };

  const handleComment = (reelId: string) => {
    console.log("Comment on reel:", reelId);
    // Open comment modal or section
  };

  const handleShare = (reelId: string) => {
    console.log("Share reel:", reelId);
    // Open share dialog
  };

  const handleSave = (reelId: string) => {
    useAppStore.getState().savePost(reelId);
  };

  const handleFollow = (userId: string) => {
    setFilteredReels((prevReels) =>
      prevReels.map((reel) =>
        reel.user.id === userId
          ? { ...reel, user: { ...reel.user, isFollowing: true } }
          : reel
      )
    );
  };

  // Add a useEffect to handle resize and update container height
  useEffect(() => {
    const handleResize = () => {
      // Force a re-render to update dimensions
      setCurrentReelIndex((prev) => prev);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Trigger once on mount
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return (
    <div
      ref={feedRef}
      className="w-full overflow-y-scroll snap-y snap-mandatory bg-black scrollbar-hide"
      style={{
        // Use the navBarHeight which may be from props or from the hook
        height: `${viewportHeight - navBarHeight}px`,
      }}
    >
      {filteredReels.length > 0 ? (
        filteredReels.map((reel, index) => (
          <div
            key={reel.id}
            data-index={index}
            className="reel-item w-full snap-start snap-always relative h-full"
          >
            <Reel
              data={reel}
              isVisible={index === currentReelIndex}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
              onSave={handleSave}
              onFollow={handleFollow}
            />
          </div>
        ))
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-center text-white p-4">
            <p className="text-xl font-semibold mb-2">No videos available</p>
            <p className="text-sm opacity-70">
              {videosFilter === "following"
                ? "Follow some creators to see their videos here."
                : videosFilter === "live"
                ? "No live videos available right now."
                : "No videos available in the For You section."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Function to convert posts with video media to Reel format
const convertPostsToReels = (posts: any[]): ReelData[] => {
  return posts
    .filter((post) => post.media.some((item: any) => item.type === "video"))
    .map((post) => {
      // Find the first video in the post's media array
      const videoMedia = post.media.find((item: any) => item.type === "video");

      return {
        id: post.id,
        videoUrl: videoMedia?.url || "",
        user: {
          id: post.user.id,
          username: post.user.username,
          avatar: post.user.avatar,
          isFollowing: post.user.isFollowing,
          isVerified: post.user.isVerified,
        },
        caption: post.caption,
        likes: post.likes,
        comments: post.comments?.length || 0,
        shares: 0,
        timestamp: post.createdAt, // <-- Pass raw date string here!
        music: `Track by ${post.user.username}`,
        albumCover: post.user.avatar,
        isLiked: post.liked || false,
        location: post.location,
        sponsored: post.sponsored,
      };
    });
};

export default ReelsFeed;
