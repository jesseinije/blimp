import { useRef, useState, useEffect, useCallback } from "react";
import { Play } from "phosphor-react";
import ReelActionBar from "./ReelActionBar";
import ReelContentInfo from "./ReelContentInfo";
import { getPostById } from "../../data/mockData";
import { useNavBarHeight } from "../../hooks/useNavBarHeight";

export type ReelData = {
  id: string;
  videoUrl: string;
  user: {
    id: string;
    username: string;
    avatar: string;
    isFollowing: boolean;
    isVerified?: boolean;
  };
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  music: string;
  albumCover: string;
  isLiked: boolean;
  location?: string;
  sponsored?: { buttonText: string; buttonUrl: string }; // <-- Add this line
};

interface ReelProps {
  data: ReelData;
  isVisible: boolean;
  onLike: (id: string) => void;
  onComment: (id: string) => void;
  onShare: (id: string) => void;
  onSave: (id: string) => void;
  onFollow: (userId: string) => void;
}

const Reel = ({
  data,
  isVisible,
  onLike,
  onComment,
  onShare,
  onSave,
  onFollow,
}: ReelProps) => {
  const navBarHeight = useNavBarHeight();
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const actionBarRef = useRef<HTMLDivElement>(null);
  const contentInfoRef = useRef<HTMLDivElement>(null);
  const [isLiked, setIsLiked] = useState(data.isLiked);
  const [likeCount, setLikeCount] = useState(data.likes);

  // Handle progress update
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!isDragging) {
        const progress = (video.currentTime / video.duration) * 100;
        setProgress(progress);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isDragging]);

  // Calculate time from mouse/touch position
  const calculateTimeFromPosition = useCallback((clientX: number) => {
    const progressBar = progressBarRef.current;
    if (!progressBar || !videoRef.current) return;

    const rect = progressBar.getBoundingClientRect();
    const position = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = position / rect.width;
    const time = videoRef.current.duration * percentage;

    return {
      time,
      percentage: percentage * 100,
    };
  }, []);

  // Handle drag start
  const handleDragStart = useCallback(
    (clientX: number) => {
      if (!videoRef.current) return;
      setIsDragging(true);
      const result = calculateTimeFromPosition(clientX);
      if (result) {
        setProgress(result.percentage);
      }
    },
    [calculateTimeFromPosition]
  );

  // Handle drag move
  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !videoRef.current) return;
      const result = calculateTimeFromPosition(clientX);
      if (result) {
        setProgress(result.percentage);
      }
    },
    [isDragging, calculateTimeFromPosition]
  );

  // Handle drag end
  const handleDragEnd = useCallback(
    (clientX: number) => {
      if (!videoRef.current || !isDragging) return;
      const result = calculateTimeFromPosition(clientX);
      if (result) {
        videoRef.current.currentTime = result.time;
        setProgress(result.percentage);
      }
      setIsDragging(false);
    },
    [isDragging, calculateTimeFromPosition]
  );

  // Mouse event handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleDragMove(e.clientX);
    const handleMouseUp = (e: MouseEvent) => handleDragEnd(e.clientX);
    const handleTouchMove = (e: TouchEvent) =>
      handleDragMove(e.touches[0].clientX);
    const handleTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length > 0) {
        handleDragEnd(e.changedTouches[0].clientX);
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  // Progress bar click and touch handlers
  const handleProgressBarClick = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      let clientX: number;

      if ("touches" in e) {
        clientX = e.touches[0].clientX;
      } else {
        clientX = e.clientX;
      }

      const result = calculateTimeFromPosition(clientX);
      if (result && videoRef.current) {
        videoRef.current.currentTime = result.time;
        setProgress(result.percentage);
      }
    },
    [calculateTimeFromPosition]
  );

  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.play().catch((error) => {
          console.error("Autoplay prevented:", error);
        });
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isVisible]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      // Add check for progress bar
      if (
        actionBarRef.current?.contains(e.target as Node) ||
        progressBarRef.current?.contains(e.target as Node)
      ) {
        return;
      }

      if (
        contentInfoRef.current &&
        contentInfoRef.current.contains(e.target as Node)
      ) {
        const target = e.target as HTMLElement;
        if (
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a")
        ) {
          return;
        }
      }

      console.log("Container area clicked");
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    container.addEventListener("click", handleClick);
    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, [isPlaying]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    onLike(data.id);
  };

  const handleCommentClick = () => {
    onComment(data.id);
  };

  const handleShareClick = () => {
    onShare(data.id);
  };

  const handleSaveClick = () => {
    onSave(data.id);
  };

  // Get the full post data including comments
  const postData = getPostById(data.id);

  // Add useEffect to handle viewport height updates
  useEffect(() => {
    const setViewportHeight = () => {
      // Set CSS variable for viewport height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setViewportHeight();

    // Update on resize and orientation change
    window.addEventListener("resize", setViewportHeight);
    window.addEventListener("orientationchange", setViewportHeight);

    return () => {
      window.removeEventListener("resize", setViewportHeight);
      window.removeEventListener("orientationchange", setViewportHeight);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black cursor-pointer overflow-hidden"
      style={{
        height: `calc(calc(var(--vh, 1vh) * 100) - ${navBarHeight}px - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px))`,
        maxHeight: `calc(100dvh - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px))`,
      }}
    >
      {/* Main video container */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={data.videoUrl}
          className="h-full w-full object-cover"
          loop
          playsInline
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

        {/* Play button */}
        {!isPlaying && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Play
              size={54}
              weight="fill"
              className="text-white/80 filter drop-shadow-[0_2px_1px_rgba(0,0,0,0.2)]"
            />
          </div>
        )}
      </div>

      {/* Content wrapper - adjusted bottom padding to account for NavBar */}
      <div className="absolute inset-0 flex flex-col justify-between">
        <div className="flex-1" /> {/* Spacer */}
        {/* Bottom content area */}
        <div className="space-y-4 p-4 pb-6">
          {/* ReelContentInfo */}
          <div ref={contentInfoRef} onClick={(e) => e.stopPropagation()}>
            <ReelContentInfo
              username={data.user.username}
              caption={data.caption}
              timestamp={data.timestamp}
              music={data.music}
              avatar={data.user.avatar}
              isFollowing={data.user.isFollowing}
              isVerified={data.user.isVerified}
              location={data.location}
              sponsored={postData?.sponsored ? "Sponsored" : undefined} // <-- Pass sponsored prop
              onFollow={() => onFollow(data.user.id)}
            />
          </div>

          {/* Action bar */}
          <div ref={actionBarRef} onClick={(e) => e.stopPropagation()}>
            <ReelActionBar
              reelId={data.id}
              comments={postData?.comments || []}
              likeCount={likeCount}
              commentCount={data.comments}
              shareCount={data.shares}
              saveCount={0}
              albumCover={data.albumCover}
              onLike={handleLike}
              onComment={handleCommentClick}
              onShare={handleShareClick}
              onSave={handleSaveClick}
              isLiked={isLiked}
              username={data.user.username}
              videoElement={videoRef.current}
            />
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div
        ref={progressBarRef}
        className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/30 cursor-pointer group hover:h-[4px] transition-all z-20"
        onClick={handleProgressBarClick}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        role="slider"
        aria-label="Video progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        tabIndex={0}
      >
        <div
          className="h-full bg-blue-500 transition-all duration-100 ease-linear relative"
          style={{ width: `${progress}%` }}
        >
          <div
            className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full transform scale-0 group-hover:scale-100 transition-transform ${
              isDragging ? "scale-100" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Reel;
