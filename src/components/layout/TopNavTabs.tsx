import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Menu, Search } from "../../Icons";
import { Check } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "./TopNavTabs.css";
import Drawer from "../ui/Drawer";

type TabType = "posts" | "videos";
type FeedType = "for-you" | "following" | "live";

interface TopNavTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TopNavTabs = ({ activeTab, onTabChange }: TopNavTabsProps) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const postsButtonRef = useRef<HTMLButtonElement>(null);
  const videosButtonRef = useRef<HTMLButtonElement>(null);

  const y = useMotionValue(0);
  const lastScrollY = useRef(0);
  const containerHeight = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const [showBorder, setShowBorder] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState<FeedType>("for-you");

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

  const handleNavigateToSearch = () => {
    setDrawerOpen(false);
    navigate("/search");
  };

  return (
    <motion.div ref={containerRef} className={containerClasses} style={{ y }}>
      <div className="flex items-center justify-between w-full max-w-screen-lg mx-auto px-3 h-12">
        {/* Logo Component - Hide when Videos tab is active */}
        <div
          className={`${
            activeTab === "videos"
              ? "opacity-0" // This will hide the logo but maintain its space
              : "text-gray-900"
          }`}
        >
          <Logo />
        </div>

        {/* Center Tabs */}
        <nav className="flex space-x-6">
          <button
            ref={postsButtonRef}
            id="posts-tab-button"
            className={`relative py-3 text-lg focus:outline-none ${
              activeTab === "posts"
                ? "font-semibold text-gray-900 "
                : activeTab === "videos"
                ? "font-normal text-white/70 text-shadow-realistic"
                : "font-normal text-gray-400"
            }`}
            onClick={() => onTabChange("posts")}
          >
            <span className="text-base tab-name">Posts</span>
          </button>
          <button
            ref={videosButtonRef}
            id="videos-tab-button"
            className={`relative py-3 text-lg focus:outline-none ${
              activeTab === "videos"
                ? "font-semibold text-white text-shadow-realistic "
                : "text-gray-400 font-normal"
            }`}
            onClick={() => onTabChange("videos")}
          >
            <span className="text-base tab-name">Videos</span>
          </button>
        </nav>

        {/* Menu Button (formerly Search Button) */}
        <button
          className="flex items-center justify-center"
          aria-label="Menu" // Updated aria-label
          onClick={() => setDrawerOpen(true)} // You might want to change this handler name and function
        >
          <Menu
            size={24}
            weight="regular"
            className={`${
              activeTab === "videos"
                ? "text-white icon-shadow-realistic"
                : "text-gray-900"
            }`}
          />
        </button>
      </div>

      {/* Drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {/* Search Section */}
        <div className="px-3 py-2 bg-white">
          <div
            onClick={handleNavigateToSearch}
            className="bg-gray-100 border-0 w-full pl-10 pr-10 py-2 rounded-lg flex items-center cursor-pointer relative"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <span className="text-gray-400 text-sm">
              Search for creators...
            </span>
          </div>
        </div>

        {/* Feed Selection Section */}
        <div className="px-3 pt-6">
          <h2 className="text-xl font-semibold mb-4">Feeds</h2>

          {/* Options Container with border */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* For You Option */}
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setSelectedFeed("for-you")}
            >
              <div>
                <h3 className="text-sm font-medium">For You</h3>
                <p className="text-xs text-gray-500">
                  Posts we think you'll like based on your interests
                </p>
              </div>
              {selectedFeed === "for-you" && (
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                  <Check size={14} weight="bold" className="text-white" />
                </div>
              )}
            </div>

            {/* Following Option */}
            <div
              className="flex items-center justify-between p-4 cursor-pointer border-t border-gray-200 hover:bg-gray-50"
              onClick={() => setSelectedFeed("following")}
            >
              <div>
                <h3 className="text-sm font-medium">Following</h3>
                <p className="text-xs text-gray-500">
                  Posts from people you follow
                </p>
              </div>
              {selectedFeed === "following" && (
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                  <Check size={14} weight="bold" className="text-white" />
                </div>
              )}
            </div>

            {/* Live Option - Only show in Videos tab */}
            {activeTab === "videos" && (
              <div
                className="flex items-center justify-between p-4 cursor-pointer border-t border-gray-200 hover:bg-gray-50"
                onClick={() => setSelectedFeed("live")}
              >
                <div>
                  <h3 className="text-sm font-medium">Live</h3>
                  <p className="text-xs text-gray-500">
                    Live content from around the world
                  </p>
                </div>
                {selectedFeed === "live" && (
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                    <Check size={14} weight="bold" className="text-white" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </motion.div>
  );
};

export default TopNavTabs;
