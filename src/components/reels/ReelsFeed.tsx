import { useState, useRef, useEffect } from "react";
import Reel from "./Reel";
import type { ReelData } from "./Reel";
import { useAppStore } from "../../store/appStore";
import { useLocation } from "react-router-dom";

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

// Enhanced suggested label component with animation
const SuggestedLabel = ({ visible }: { visible: boolean }) => (
  <div
    className={`absolute bottom-[9rem] left-4 z-20 bg-black/30 px-3 py-1 rounded-md transition-all duration-500 ease-in-out ${
      visible ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <span className="text-xs font-medium text-white">Suggested for you</span>
  </div>
);

const ReelsFeed = () => {
  const { reels, videosFilter } = useAppStore(); // Use reels from store instead of mockPosts
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [visibleLabels, setVisibleLabels] = useState<{
    [key: string]: boolean;
  }>({});
  const feedRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

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

          // When a new reel comes into view, show its label
          const reelId = filteredReels[index]?.id;
          if (reelId && isVideoPage && index > 0) {
            setVisibleLabels((prev) => ({ ...prev, [reelId]: true }));

            // Hide the label after 3 seconds
            const timerId = setTimeout(() => {
              setVisibleLabels((prev) => ({ ...prev, [reelId]: false }));
            }, 3000);

            return () => clearTimeout(timerId);
          }
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

  // Reset visible labels when reels change
  useEffect(() => {
    // Initialize labels for all reels
    const initialLabels: { [key: string]: boolean } = {};
    filteredReels.forEach((reel, index) => {
      if (isVideoPage && index > 0) {
        initialLabels[reel.id] = true;
      }
    });
    setVisibleLabels(initialLabels);
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

  return (
    <div
      ref={feedRef}
      className="h-full w-full overflow-y-scroll snap-y snap-mandatory bg-black scrollbar-hide"
      style={{
        overscrollBehavior: "contain",
        margin: 0,
        padding: 0,
        height: `calc(calc(var(--vh, 1vh) * 100) - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px))`,
        maxHeight: `calc(calc(var(--vh, 1vh) * 100) - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px))`,
      }}
    >
      {filteredReels.length > 0 ? (
        filteredReels.map((reel, index) => (
          <div
            key={reel.id}
            data-index={index}
            className="reel-item w-full snap-start snap-always relative"
            style={{
              height: `calc(calc(var(--vh, 1vh) * 100) - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px))`,
            }}
          >
            {/* Always render the label but control its visibility with the visible prop */}
            {isVideoPage && index > 0 && (
              <SuggestedLabel visible={!!visibleLabels[reel.id]} />
            )}

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

export default ReelsFeed;
