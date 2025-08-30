import { useRef, useState, useEffect } from "react";
import { MagnifyingGlass, CheckCircle } from "phosphor-react"; // Replace Check with CheckCircle
import { useAppStore } from "../../store/appStore";
import type { FeedFilterType } from "../../store/appStore";
import BottomSheet from "../ui/BottomSheet";
import { motion, useMotionValue, animate } from "framer-motion";
import "./TopNavTabs.css";

type TabType = "posts" | "videos";

interface TopNavTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

// Replace the single filterOptions with two separate arrays:
const postFilterOptions: {
  value: FeedFilterType;
  label: string;
  description: string;
}[] = [
  {
    value: "for-you",
    label: "For You",
    description: "Posts we think you'll like based on your interests",
  },
  {
    value: "following",
    label: "Following",
    description: "Posts from people you follow",
  },
];

const videoFilterOptions: {
  value: FeedFilterType;
  label: string;
  description: string;
}[] = [
  {
    value: "for-you",
    label: "For You",
    description: "Videos we think you'll like based on your interests",
  },
  {
    value: "following",
    label: "Following",
    description: "Videos from people you follow",
  },
  {
    value: "live",
    label: "Live",
    description: "Real-time videos and active streams",
  },
];

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className="w-[24px] h-[24px]"
  >
    <rect width="256" height="256" fill="none" />
    <line
      x1="40"
      y1="96"
      x2="200"
      y2="96"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <line
      x1="40"
      y1="160"
      x2="200"
      y2="160"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
  </svg>
);

const TopNavTabs = ({ activeTab, onTabChange }: TopNavTabsProps) => {
  const { postsFilter, setPostsFilter, videosFilter, setVideosFilter } =
    useAppStore();
  const [menuSheetOpen, setMenuSheetOpen] = useState(false);
  const [postsBottomSheetOpen, setPostsBottomSheetOpen] = useState(false);
  const [videosBottomSheetOpen, setVideosBottomSheetOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const postsButtonRef = useRef<HTMLButtonElement>(null);
  const videosButtonRef = useRef<HTMLButtonElement>(null);

  const y = useMotionValue(0);
  const lastScrollY = useRef(0);
  const containerHeight = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const [showBorder, setShowBorder] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      containerHeight.current = containerRef.current.offsetHeight;
    }

    // Only enable scroll behavior for posts tab
    const shouldEnable = activeTab === "posts";

    if (!shouldEnable) {
      animate(y, 0, { duration: 0.3 });
      return;
    }

    lastScrollY.current = window.scrollY;
    let ticking = false;
    let lastDirection = 0;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDiff = currentScrollY - lastScrollY.current;
          const currentDirection = Math.sign(scrollDiff);

          // Update border visibility based on scroll position
          setShowBorder(currentScrollY > 0);

          // Clear existing timeout
          if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
          }

          // Ignore very small scroll movements
          if (Math.abs(scrollDiff) < 3) {
            ticking = false;
            return;
          }

          // If direction changed, immediately snap based on the new direction
          if (currentDirection !== lastDirection) {
            if (currentDirection > 0) {
              // Scrolling down - hide navbar
              animate(y, -containerHeight.current, {
                type: "tween",
                duration: 0.2,
                ease: "easeOut",
              });
            } else {
              // Scrolling up - show navbar
              animate(y, 0, {
                type: "tween",
                duration: 0.2,
                ease: "easeOut",
              });
            }
            lastDirection = currentDirection;
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Set initial border state
    setShowBorder(window.scrollY > 0);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [activeTab]);

  const containerClasses = `top-nav-tabs ${
    activeTab === "videos" ? "top-nav-tabs--videos" : "top-nav-tabs--posts"
  } ${showBorder && activeTab === "posts" ? "top-nav-tabs--with-border" : ""}`;

  // Handle menu option select
  const handleMenuSelect = (filter: FeedFilterType) => {
    setPostsFilter(filter);
    setMenuSheetOpen(false);
  };

  return (
    <motion.div ref={containerRef} className={containerClasses} style={{ y }}>
      <div className="flex items-center justify-between w-full max-w-screen-lg mx-auto px-3 h-12">
        {/* Menu Button */}
        <button
          className="flex items-center justify-center"
          aria-label="Open menu"
          onClick={() => setMenuSheetOpen(true)}
        >
          <div
            className={`${
              activeTab === "videos"
                ? "text-white icon-shadow-realistic"
                : "text-gray-500 dark:text-white"
            }`}
          >
            <MenuIcon />
          </div>
        </button>

        {/* Center Tabs */}
        <nav className="flex space-x-6">
          <button
            ref={postsButtonRef}
            id="posts-tab-button"
            className={`relative py-3 text-lg focus:outline-none ${
              activeTab === "posts"
                ? "font-bold text-gray-900 dark:text-white after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-black dark:after:bg-white"
                : activeTab === "videos"
                ? "font-normal text-white/80 text-shadow-realistic"
                : "font-normal text-gray-500 dark:text-gray-400"
            }`}
            onClick={() => onTabChange("posts")}
          >
            <span className="text-base">Posts</span>
          </button>
          <button
            ref={videosButtonRef}
            id="videos-tab-button"
            className={`relative py-3 text-lg focus:outline-none ${
              activeTab === "videos"
                ? "font-bold text-white text-shadow-realistic after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-white"
                : "text-gray-500 dark:text-gray-400 font-normal"
            }`}
            onClick={() => onTabChange("videos")}
          >
            <span className="text-base">Videos</span>
          </button>
        </nav>

        {/* Search Button */}
        <button
          className="flex items-center justify-center"
          aria-label="Search"
        >
          <MagnifyingGlass
            className={`${
              activeTab === "videos"
                ? "text-white icon-shadow-realistic"
                : "text-gray-500 dark:text-white"
            }`}
            weight="regular"
            size={24}
          />
        </button>
      </div>

      {/* Menu BottomSheet */}
      <BottomSheet
        isOpen={menuSheetOpen}
        onClose={() => setMenuSheetOpen(false)}
        title="Select Feed"
      >
        <div className="space-y-2 py-2 border border-gray-200 dark:border-gray-700 rounded-lg mb-3">
          {(activeTab === "posts" ? postFilterOptions : videoFilterOptions).map(
            (option) => (
              <button
                key={option.value}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-left bg-transparent ${
                  postsFilter === option.value
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300"
                } focus:outline-none transition-colors duration-150`}
                onClick={() => handleMenuSelect(option.value)}
                tabIndex={0}
                type="button"
              >
                <div className="flex-1 pr-4">
                  <span className="text-base block text-gray-900 dark:text-white">
                    {option.label}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 block">
                    {option.description}
                  </span>
                </div>
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  {postsFilter === option.value && (
                    <CheckCircle
                      className="text-blue-600 w-6 h-6"
                      weight="fill"
                    />
                  )}
                </div>
              </button>
            )
          )}
        </div>
      </BottomSheet>
    </motion.div>
  );
};

export default TopNavTabs;
