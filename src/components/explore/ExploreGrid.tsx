import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PushPin } from "phosphor-react";
import type { Post } from "../../types/index";
import { mockPosts } from "../../data/mockData";

interface ExploreGridProps {
  posts?: Post[];
  showUserInfo?: boolean;
  showPinnedIcon?: boolean; // <-- Add this prop
}

const ExploreGrid: React.FC<ExploreGridProps> = ({
  posts = mockPosts,
  showUserInfo = true,
  showPinnedIcon = false, // <-- Default to false
}) => {
  const navigate = useNavigate();

  // Handle click on a post
  const handlePostClick = (postId: string, mediaType: string) => {
    if (mediaType === "video") {
      // Navigate to video detail page
      navigate(`/video/${postId}`);
    } else {
      // Navigate to the post detail page for images
      navigate(`/post/${postId}`);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-0.5 mt-0.5 bg-white">
      {posts.map((post) => (
        <PostGridItem
          key={post.id}
          post={post}
          onPostClick={handlePostClick}
          showUserInfo={showUserInfo}
          showPinnedIcon={showPinnedIcon} // <-- Pass down
        />
      ))}
    </div>
  );
};

interface PostGridItemProps {
  post: Post;
  onPostClick: (postId: string, mediaType: string) => void;
  showUserInfo?: boolean;
  showPinnedIcon?: boolean; // <-- Add this prop
}

const PostGridItem: React.FC<PostGridItemProps> = ({
  post,
  onPostClick,
  showUserInfo = true,
  showPinnedIcon = false, // <-- Default to false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const currentMedia = post.media[currentIndex];
  const isVideo = currentMedia.type === "video";

  // Setup Intersection Observer to detect when post is in view
  useEffect(() => {
    if (!itemRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.5, // Consider in view when 50% visible
        rootMargin: "50px",
      }
    );

    observer.observe(itemRef.current);

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);

  // Control video playback based on visibility
  useEffect(() => {
    if (!isVideo || !videoRef.current) return;

    if (isInView) {
      // Play video when in view
      videoRef.current.play().catch((error) => {
        // Handle autoplay restrictions
        console.log("Autoplay prevented:", error);
      });
    } else {
      // Pause when out of view
      videoRef.current.pause();
    }
  }, [isInView, isVideo, currentIndex]);

  // Handle swipe for carousel
  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (!startX.current || post.media.length <= 1) return;

    const currentX = e.touches[0].clientX;
    const diff = startX.current - currentX;

    // Threshold for swipe (50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < post.media.length - 1) {
        // Swipe left - next image
        setCurrentIndex(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        // Swipe right - previous image
        setCurrentIndex(currentIndex - 1);
      }
      startX.current = null;
    }
  };

  const handleTouchEnd = () => {
    startX.current = null;
  };

  // Navigate when clicking on the grid item, except during swiping
  const handleClick = () => {
    // Only navigate if we're showing the first image or it's a single media post
    // This prevents navigation when user is interacting with the carousel
    if (post.media.length <= 1 || currentIndex === 0) {
      onPostClick(post.id, currentMedia.type);
    }
  };

  // Handle dot indicator click
  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation(); // Prevent navigation
    setCurrentIndex(index);
  };

  return (
    <div
      ref={itemRef}
      onClick={handleClick}
      className="aspect-[3/4] relative overflow-hidden cursor-pointer bg-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pin icon for pinned posts, only if showPinnedIcon is true */}
      {showPinnedIcon && post.pinned && (
        <div className="absolute top-2 left-2 z-10">
          <PushPin
            size={18}
            weight="fill"
            className="text-yellow-500 drop-shadow"
          />
        </div>
      )}

      {/* Post thumbnail - handle both image and video */}
      {isVideo ? (
        <video
          ref={videoRef}
          src={currentMedia.url}
          className="object-cover w-full h-full"
          preload="metadata"
          muted
          playsInline
          loop
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={currentMedia.url}
          alt={`Post by ${post.user.username}`}
          className="object-cover w-full h-full"
        />
      )}

      {/* Dots indicator for multiple media */}
      {post.media.length > 1 && (
        <div className="absolute top-2 right-2 flex space-x-1">
          {post.media.map((_, index) => (
            <button
              key={index}
              onClick={(e) => handleDotClick(e, index)}
              className={`w-1.5 h-1.5 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to media ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* User info section as overlay on the post */}
      {showUserInfo && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1.5">
          <div className="flex items-center">
            {/* User avatar */}
            <img
              src={post.user.avatar}
              alt={`${post.user.username}'s avatar`}
              className="w-4 h-4 rounded-full mr-1.5 object-cover border border-white"
            />

            {/* Username - without verification badge */}
            <span className="text-xs font-medium text-white truncate">
              {post.user.username}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreGrid;
