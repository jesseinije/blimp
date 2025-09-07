import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { PushPin } from "phosphor-react";
import type { Post } from "../../types";
import { mockPosts } from "../../data/mockData";

interface ExploreGridProps {
  posts?: Post[];
  showUserInfo?: boolean;
  showPinnedIcon?: boolean;
  batchSize?: number;
  initialBatchSize?: number;
  overscanRows?: number;
}

const COLS = 3;

const ExploreGrid: React.FC<ExploreGridProps> = ({
  posts = mockPosts,
  showUserInfo = true,
  showPinnedIcon = false,
  batchSize = 30,
  initialBatchSize = 30,
  overscanRows = 2,
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
    navigate(mediaType === "video" ? `/video/${postId}` : `/post/${postId}`);
  };

  return (
    <div className="relative">
      {/* Spacer above */}
      <div style={{ height: topSpacer }} aria-hidden />

      {/* Visible window grid */}
      <div className="grid grid-cols-3 gap-0.5 bg-white">
        {virtualizedPosts.map((post) => (
          <PostGridItem
            key={post.id + "-" + post.media[0]?.url}
            post={post}
            onPostClick={handlePostClick}
            showUserInfo={showUserInfo}
            showPinnedIcon={showPinnedIcon}
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
}

const PREVIEW_SECONDS = 5; // adjust as desired

const PostGridItem: React.FC<PostGridItemProps> = ({
  post,
  onPostClick,
  showUserInfo = true,
  showPinnedIcon = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const previewEndRef = useRef<number | null>(null);

  const [isInView, setIsInView] = useState(false);
  const [hasEverBeenInView, setHasEverBeenInView] = useState(false);

  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPreviewing] = useState(true); // could toggle later if you add a “hold to preview full” feature

  const currentMedia = post.media[currentIndex];
  const isVideo = currentMedia?.type === "video";

  useEffect(() => {
    if (!itemRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          if (!hasEverBeenInView) setHasEverBeenInView(true);
        } else {
          setIsInView(false);
        }
      },
      {
        threshold: 0.5,
        root: document.getElementById("explore-scroll-container") || undefined,
        rootMargin: "150px",
      }
    );
    observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, [hasEverBeenInView]);

  useEffect(() => {
    if (isVideo && hasEverBeenInView) {
      setVideoLoaded(false);
      setVideoSrc(currentMedia.url);
    } else if (!isVideo) {
      setVideoSrc(null);
      setVideoLoaded(false);
    }
  }, [isVideo, currentMedia?.url, hasEverBeenInView, currentIndex]);

  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    if (isInView && videoSrc) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isInView, isVideo, videoSrc]);

  // after videoSrc set / metadata loaded
  useEffect(() => {
    if (!isVideo || !videoRef.current) {
      previewEndRef.current = null;
      return;
    }
    const vid = videoRef.current;

    const handleLoadedMetadata = () => {
      if (!isPreviewing) {
        previewEndRef.current = null;
        return;
      }
      const dur = vid.duration;
      if (isFinite(dur) && dur > 0) {
        if (dur <= PREVIEW_SECONDS + 0.15) {
          // Very short video: just let native loop do full cycle
          previewEndRef.current = null;
          vid.loop = true;
        } else {
          vid.loop = false;
          // Leave a tiny headroom to avoid hitting exact duration boundary
          previewEndRef.current = Math.min(PREVIEW_SECONDS, dur - 0.08);
        }
      }
    };

    const handleTimeUpdate = () => {
      if (
        previewEndRef.current != null &&
        vid.currentTime >= previewEndRef.current
      ) {
        // Seamless restart
        vid.currentTime = 0.03; // small offset avoids a potential first-frame flash
        // Ensure playback continues
        if (!vid.paused) {
          // (On some browsers currentTime seek can pause if near end)
          vid.play().catch(() => {});
        }
      }
    };

    vid.addEventListener("loadedmetadata", handleLoadedMetadata);
    vid.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      vid.removeEventListener("loadedmetadata", handleLoadedMetadata);
      vid.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isVideo, videoSrc, isPreviewing]);

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
  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
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
        <>
          {!videoSrc && (
            <div
              className="absolute inset-0 bg-gray-200 animate-pulse"
              aria-label="Video placeholder"
            />
          )}
          {videoSrc && (
            <video
              ref={videoRef}
              src={videoSrc}
              className={`object-cover w-full h-full transition-opacity duration-300 ${
                videoLoaded ? "opacity-100" : "opacity-0"
              }`}
              muted
              playsInline
              preload="none"
              onLoadedData={() => setVideoLoaded(true)}
            />
          )}
        </>
      ) : (
        <img
          src={currentMedia.url}
          alt={`Post by ${post.user.username}`}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      )}

      {post.media.length > 1 && (
        <div className="absolute top-2 right-2 flex space-x-1">
          {post.media.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => handleDotClick(e, idx)}
              className={`w-1.5 h-1.5 rounded-full ${
                idx === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to media ${idx + 1}`}
            />
          ))}
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
    </div>
  );
};

export default ExploreGrid;
