import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { PushPin, Cards } from "phosphor-react";
import type { Post } from "../../types";
import { mockPosts } from "../../data/mockData";

// Create a simple debounce function since lodash.debounce isn't installed
const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

// Constants
const COLS = 3;
const VIDEO_ROTATION_INTERVAL = 5000; // Time in ms to switch between videos

interface ExploreGridProps {
  posts?: Post[];
  showUserInfo?: boolean;
  showPinnedIcon?: boolean;
  batchSize?: number;
  initialBatchSize?: number;
  overscanRows?: number;
  onPostClick?: (postId: string, mediaType: string) => void;
  showViewCountOverlay?: boolean; // <-- Add this line
}

const ExploreGrid: React.FC<ExploreGridProps> = ({
  posts = mockPosts,
  showUserInfo = true,
  showPinnedIcon = false,
  batchSize = 30,
  initialBatchSize = 30,
  overscanRows = 2,
  onPostClick,
  showViewCountOverlay = false, // <-- Add default
}) => {
  const navigate = useNavigate();

  // Data paging (already-lazy batches)
  const [visibleCount, setVisibleCount] = useState(initialBatchSize);
  const [loadingMore, setLoadingMore] = useState(false);

  // Virtualization state
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const scrollContainerId = "explore-scroll-container";
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const rafRef = useRef<number | null>(null);

  const hasMore = visibleCount < posts.length;

  const loadMore = useCallback(() => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((v) => Math.min(v + batchSize, posts.length));
      setLoadingMore(false);
    }, 400);
  }, [hasMore, loadingMore, batchSize, posts.length]);

  // Infinite scroll sentinel (still works with virtualization)
  useEffect(() => {
    if (!hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const rootEl = document.getElementById(scrollContainerId) || undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) loadMore();
      },
      {
        root: rootEl,
        rootMargin: "500px",
        threshold: 0.01,
      }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore, visibleCount]);

  // Attach scroll + size listeners for virtualization
  useEffect(() => {
    const scroller = document.getElementById(scrollContainerId);
    if (!scroller) return;

    const handleScroll = () => {
      const st = scroller.scrollTop;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setScrollTop(st));
    };

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    setViewportHeight(scroller.clientHeight);
    setContainerWidth(scroller.clientWidth);

    resizeObserverRef.current = new ResizeObserver(() => {
      setViewportHeight(scroller.clientHeight);
      setContainerWidth(scroller.clientWidth);
    });
    resizeObserverRef.current.observe(scroller);

    return () => {
      scroller.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      resizeObserverRef.current?.disconnect();
    };
  }, []);

  // Derive geometry
  const rowHeight = useMemo(() => {
    if (!containerWidth) return 0;
    const cellWidth = containerWidth / COLS;
    return cellWidth * (4 / 3); // 3:4 aspect (w:h) -> h = w * 4/3
  }, [containerWidth]);

  const totalLoadedRows = Math.ceil(visibleCount / COLS);

  const windowRows = useMemo(() => {
    if (rowHeight === 0) {
      return { startRow: 0, endRow: totalLoadedRows - 1 };
    }
    const rawStart = Math.floor(scrollTop / rowHeight);
    const rawEnd = Math.ceil((scrollTop + viewportHeight) / rowHeight) - 1;

    const startRow = Math.max(0, rawStart - overscanRows);
    const endRow = Math.min(totalLoadedRows - 1, rawEnd + overscanRows);
    return { startRow, endRow };
  }, [scrollTop, viewportHeight, rowHeight, totalLoadedRows, overscanRows]);

  const { startRow, endRow } = windowRows;

  const virtualizedPosts = useMemo(() => {
    if (rowHeight === 0) return posts.slice(0, visibleCount); // initial render fallback
    const needed: Post[] = [];
    for (let r = startRow; r <= endRow; r++) {
      const from = r * COLS;
      needed.push(...posts.slice(from, Math.min(from + COLS, visibleCount)));
    }
    return needed;
  }, [rowHeight, startRow, endRow, posts, visibleCount]);

  const topSpacer = rowHeight * startRow;
  const bottomSpacer = rowHeight * Math.max(0, totalLoadedRows - endRow - 1);

  // Click navigation
  const handlePostClick = (postId: string, mediaType: string) => {
    if (onPostClick) {
      onPostClick(postId, mediaType); // Use the passed-in handler if provided
    } else {
      navigate(mediaType === "video" ? `/video/${postId}` : `/post/${postId}`);
    }
  };

  // Video auto-play logic
  const videoRefs = useRef<
    Array<{ ref: React.RefObject<HTMLVideoElement>; id: string }>
  >([]);
  const [visibleVideoIds, setVisibleVideoIds] = useState<string[]>([]);
  const [currentPlayingIdx, setCurrentPlayingIdx] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const registerVideoRef = useCallback(
    (ref: React.RefObject<HTMLVideoElement>, id: string) => {
      // Avoid duplicates
      if (!videoRefs.current.some((v) => v.id === id)) {
        videoRefs.current.push({ ref, id });
      }
    },
    []
  );

  // Track visible videos
  useEffect(() => {
    const handleVisibility = debounce(() => {
      const visibleIds: string[] = [];
      videoRefs.current.forEach(({ ref, id }) => {
        const el = ref.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          // Check if at least half of the video is visible
          const isVisible =
            rect.top < window.innerHeight &&
            rect.bottom > 0 &&
            rect.height > 0 &&
            rect.top + rect.height / 2 < window.innerHeight &&
            rect.bottom - rect.height / 2 > 0;
          if (isVisible) visibleIds.push(id);
        }
      });

      // Only update if the visible videos have changed
      if (JSON.stringify(visibleIds) !== JSON.stringify(visibleVideoIds)) {
        setVisibleVideoIds(visibleIds);
        // Reset current playing index when visible videos change
        setCurrentPlayingIdx(0);
      }
    }, 100);

    window.addEventListener("scroll", handleVisibility, { passive: true });
    window.addEventListener("resize", handleVisibility);
    handleVisibility();

    return () => {
      window.removeEventListener("scroll", handleVisibility);
      window.removeEventListener("resize", handleVisibility);
    };
  }, [visibleVideoIds]);

  // Handle video visibility changes with browser tab visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause all videos when tab is hidden
        videoRefs.current.forEach(({ ref }) => {
          if (ref.current) ref.current.pause();
        });

        // Clear the rotation timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      } else {
        // Resume video rotation when tab becomes visible again
        setCurrentPlayingIdx((prev) => prev); // Trigger effect to restart playing
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Play current video and rotate
  useEffect(() => {
    if (visibleVideoIds.length === 0) return;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    let idx = currentPlayingIdx % visibleVideoIds.length;

    // Pause all videos first
    videoRefs.current.forEach(({ ref }) => {
      if (ref.current) ref.current.pause();
    });

    // Play the current video
    const currentId = visibleVideoIds[idx];
    const currentRef = videoRefs.current.find((v) => v.id === currentId)?.ref;
    if (currentRef?.current) {
      currentRef.current.currentTime = 0;
      currentRef.current.play().catch(() => {});
    }

    // After interval, move to the next
    timeoutRef.current = setTimeout(() => {
      setCurrentPlayingIdx((prev) => (prev + 1) % visibleVideoIds.length);
    }, VIDEO_ROTATION_INTERVAL);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [visibleVideoIds, currentPlayingIdx]);

  // After updating visible posts, clean up refs for videos no longer in view
  useEffect(() => {
    // Only keep refs for currently rendered videos
    const currentIds = new Set(
      virtualizedPosts.map((post) => post.id + "-" + post.media[0]?.url)
    );
    videoRefs.current = videoRefs.current.filter((v) => currentIds.has(v.id));
  }, [virtualizedPosts]);

  return (
    <div className="relative mb-20">
      {/* Spacer above */}
      <div style={{ height: topSpacer }} aria-hidden />

      {/* Visible window grid */}
      <div className="grid grid-cols-3 gap-[0.05rem] bg-white">
        {virtualizedPosts.map((post) => (
          <PostGridItem
            key={post.id + "-" + post.media[0]?.url}
            post={post}
            onPostClick={handlePostClick}
            showUserInfo={showUserInfo}
            showPinnedIcon={showPinnedIcon}
            registerVideoRef={registerVideoRef}
            videoId={post.id + "-" + post.media[0]?.url}
            isPlaying={
              visibleVideoIds.includes(post.id + "-" + post.media[0]?.url) &&
              visibleVideoIds[currentPlayingIdx % visibleVideoIds.length] ===
                post.id + "-" + post.media[0]?.url
            }
            showViewCountOverlay={showViewCountOverlay} // <-- Pass down
          />
        ))}
      </div>

      {/* Spacer below */}
      <div style={{ height: bottomSpacer }} aria-hidden />

      {/* Sentinel after current loaded content (not full dataset) */}
      {hasMore && (
        <div
          ref={sentinelRef}
          className="flex justify-center py-6"
          aria-label="Loading more posts"
        >
          <Spinner spinning={loadingMore} />
        </div>
      )}
    </div>
  );
};

const Spinner: React.FC<{ spinning: boolean }> = ({ spinning }) => (
  <div className="flex items-center space-x-2 text-xs text-gray-500">
    <div
      className={`h-6 w-6 rounded-full border-2 border-gray-300 border-t-gray-600 ${
        spinning ? "animate-spin" : ""
      }`}
    />
    <span>{spinning ? "Loading..." : "Scroll to load more"}</span>
  </div>
);

interface PostGridItemProps {
  post: Post;
  onPostClick: (postId: string, mediaType: string) => void;
  showUserInfo?: boolean;
  showPinnedIcon?: boolean;
  registerVideoRef?: (
    ref: React.RefObject<HTMLVideoElement>,
    id: string
  ) => void;
  videoId?: string;
  isPlaying?: boolean;
  showViewCountOverlay?: boolean; // <-- Add this line
}

const PostGridItem: React.FC<PostGridItemProps> = ({
  post,
  onPostClick,
  showUserInfo = true,
  showPinnedIcon = false,
  registerVideoRef,
  videoId,
  showViewCountOverlay = false, // <-- Add default
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const [, setIsInView] = useState(false);

  const currentMedia = post.media[currentIndex];
  const isVideo = currentMedia?.type === "video";

  // Track element visibility
  useEffect(() => {
    if (!itemRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.5,
        root: document.getElementById("explore-scroll-container") || undefined,
        rootMargin: "150px",
      }
    );
    observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  // Register video reference for auto-play management
  useEffect(() => {
    if (isVideo && registerVideoRef && videoId) {
      registerVideoRef(videoRef as React.RefObject<HTMLVideoElement>, videoId);
    }
  }, [isVideo, registerVideoRef, videoId]);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (!startX.current || post.media.length <= 1) return;
    const diff = startX.current - e.touches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < post.media.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
      }
      startX.current = null;
    }
  };

  const handleTouchEnd = () => {
    startX.current = null;
  };

  const handleClick = () => {
    if (post.media.length <= 1 || currentIndex === 0) {
      onPostClick(post.id, currentMedia.type);
    }
  };

  // Add this helper function at the top-level (outside the component)
  const formatNumber = (num: number): string => {
    if (num >= 1000000)
      return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`;
    return num.toString();
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
      {showPinnedIcon && post.pinned && (
        <div className="absolute top-2 left-2 z-10">
          <PushPin
            size={18}
            weight="fill"
            className="text-yellow-500 drop-shadow"
          />
        </div>
      )}

      {isVideo ? (
        <video
          ref={videoRef}
          src={currentMedia.url}
          className="object-cover w-full h-full"
          muted
          playsInline
          preload="metadata"
          loop={false}
        />
      ) : (
        <img
          src={currentMedia.url}
          alt={`Post by ${post.user.username}`}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      )}

      {/* Show a single ImagesSquare icon for multiple images */}
      {post.media.length > 1 && (
        <div className="absolute top-2 right-2 z-10">
          <Cards size={16} weight="fill" className="text-white drop-shadow" />
        </div>
      )}

      {showUserInfo && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1.5">
          <div className="flex items-center">
            <img
              src={post.user.avatar}
              alt={`${post.user.username}'s avatar`}
              className="w-4 h-4 rounded-full mr-1.5 object-cover border border-white"
              loading="lazy"
            />
            <span className="text-xs font-medium text-white truncate">
              {post.user.username}
            </span>
          </div>
        </div>
      )}

      {/* View count overlay */}
      {showViewCountOverlay && (
        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1 pointer-events-none">
          <svg
            width="16"
            height="16"
            fill="currentColor"
            className="inline-block"
            viewBox="0 0 16 16"
          >
            <path d="M8 3C4 3 1.73 6.11 1.08 7.11a1 1 0 0 0 0 .78C1.73 9.89 4 13 8 13s6.27-3.11 6.92-4.11a1 1 0 0 0 0-.78C14.27 6.11 12 3 8 3zm0 8c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
          </svg>
          {formatNumber(post.views ?? 0)}
        </div>
      )}
    </div>
  );
};

export default ExploreGrid;
