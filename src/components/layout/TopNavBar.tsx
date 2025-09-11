import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Menu, Bell, Search } from "../../Icons";
import { Check } from "phosphor-react";
import Logo from "./Logo";
import "./TopNavBar.css";
import Drawer from "../ui/Drawer"; // Import the Drawer component

type TabType = "posts" | "following";
type FeedType = "for-you" | "following" | "live";

interface TopNavBarProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

const TopNavBar: React.FC<TopNavBarProps> = ({
  activeTab = "posts",
  onTabChange = () => {},
}) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showBorder, setShowBorder] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Add state for drawer
  const [selectedFeed, setSelectedFeed] = useState<FeedType>("for-you");

  const y = useMotionValue(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const containerHeight = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerHeight.current = containerRef.current.offsetHeight;
    }

    // Get initial scroll position
    lastScrollY.current = window.scrollY;
    lastScrollTime.current = Date.now();

    // Set initial border state
    setShowBorder(window.scrollY > 0);

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

          if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
          }

          // Ignore very small scroll movements
          if (Math.abs(scrollDiff) < 3) {
            ticking = false;
            return;
          }

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const handleNavigateToMenu = () => {
    // Open the drawer when menu is clicked
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    // Close the drawer
    setIsDrawerOpen(false);
  };

  const handleNavigateToNotifications = () => {
    navigate("/notifications");
  };

  // Modified tab click handler to prevent double state changes
  const handleTabClick = (tab: TabType) => {
    // Simply update the active tab without navigation
    onTabChange(tab);
  };

  // Add this function to handle feed selection
  const handleFeedSelection = (feed: FeedType) => {
    setSelectedFeed(feed);
    handleCloseDrawer();

    // Update activeTab based on feed selection without navigation to reels
    if (feed === "for-you") {
      onTabChange("posts");
    } else if (feed === "following") {
      onTabChange("following");
    } else if (feed === "live") {
      // Handle live feed selection if needed
      console.log("Live feed selected");
    }
  };

  return (
    <>
      <motion.div
        ref={containerRef}
        className={`top-nav-bar ${
          showBorder ? "top-nav-bar--with-border" : ""
        }`}
        style={{ y }}
      >
        {/* Main navbar section */}
        <div className="main-nav-section">
          <div className="nav-container">
            {/* Left: Menu Button */}
            <button
              className="nav-icon-button"
              aria-label="Menu"
              onClick={handleNavigateToMenu}
            >
              <Menu size={24} weight="regular" />
            </button>

            {/* Center: Logo */}
            <div className="nav-logo">
              <Logo />
            </div>

            {/* Right: Notifications Button */}
            <button
              className="nav-icon-button"
              aria-label="Notifications"
              onClick={handleNavigateToNotifications}
            >
              <Bell size={24} weight="regular" />
            </button>
          </div>
        </div>

        {/* Tabs section */}
        <div className="border-b border-gray-300">
          <div className="nav-container">
            <nav className="tabs-container">
              <button
                className={`tab-button ${
                  activeTab === "posts" ? "active" : ""
                }`}
                data-tab="posts"
                onClick={() => handleTabClick("posts")}
              >
                <span
                  className={`tab-text text-sm font-semibold ${
                    activeTab === "posts"
                      ? "text-gray-900 font-semibold"
                      : "text-gray-400"
                  }`}
                >
                  Posts
                </span>
              </button>

              <button
                className={`tab-button ${
                  activeTab === "following" ? "active" : ""
                }`}
                onClick={() => {
                  onTabChange("following");
                  navigate("/reels");
                }}
              >
                <span
                  className={`tab-text text-sm font-semibold ${
                    activeTab === "following"
                      ? "text-gray-900"
                      : "text-gray-500"
                  }`}
                >
                  Videos
                </span>
                {activeTab === "following" && (
                  <div className="tab-indicator"></div>
                )}
              </button>
            </nav>
          </div>
        </div>
      </motion.div>

      {/* Add the Drawer component */}
      <Drawer
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        position="left" // Position the drawer on the left side
      >
        {/* Search Section */}
        <div className="px-3 py-2 bg-white">
          <div
            onClick={() => navigate("/search")}
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
              onClick={() => handleFeedSelection("for-you")}
            >
              <div>
                <h3 className="text-sm font-medium">For You</h3>
                <p className="text-xs text-gray-500">
                  Videos we think you'll like based on your interests
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
              onClick={() => handleFeedSelection("following")}
            >
              <div>
                <h3 className="text-sm font-medium">Following</h3>
                <p className="text-xs text-gray-500">
                  Videos from people you follow
                </p>
              </div>
              {selectedFeed === "following" && (
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                  <Check size={14} weight="bold" className="text-white" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default TopNavBar;
