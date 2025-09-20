import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, Bell } from "../../Icons"; // Import Bell icon
import Logo from "./Logo";
import "./TopNavBar.css";

type TabType = "posts" | "videos" | "for-you" | "following"; // Add new tab types

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

  const y = useMotionValue(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const containerHeight = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Add a threshold for scroll distance before hiding the navbar
  const scrollThreshold = 100; // Adjust this value to control how far to scroll before hiding

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
    // Track accumulated scroll distance for hiding the navbar
    let accumulatedScrollDown = 0;

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

          // Handle direction changes
          if (currentDirection !== lastDirection) {
            if (currentDirection > 0) {
              // Scrolling down - start accumulating scroll distance
              accumulatedScrollDown = scrollDiff;
            } else {
              // Scrolling up - reset accumulated scroll and show navbar immediately
              accumulatedScrollDown = 0;
              animate(y, 0, {
                type: "tween",
                duration: 0.2,
                ease: "easeOut",
              });
            }
            lastDirection = currentDirection;
          } else if (currentDirection > 0) {
            // Continue scrolling down - accumulate distance
            accumulatedScrollDown += scrollDiff;

            // Only hide navbar when accumulated scroll exceeds threshold
            if (accumulatedScrollDown > scrollThreshold) {
              animate(y, -containerHeight.current, {
                type: "tween",
                duration: 0.2,
                ease: "easeOut",
              });
            }
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

  const handleNavigateToNotifications = () => {
    // Demo: Do nothing or show a message
    // alert("Notifications feature coming soon!");
  };

  // Update tab click handler to handle all tab types
  const handleTabClick = (tab: TabType) => {
    onTabChange(tab);
    if (tab === "videos") {
      navigate("/reels");
    }
    if (tab === "for-you") {
      // Add navigation or logic for "For You" tab if needed
    }
    if (tab === "following") {
      // Add navigation or logic for "Following" tab if needed
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
            {/* Left: Logo */}
            <div className="nav-logo">
              <Logo />
            </div>

            {/* Center: (empty, or you can add something else if needed) */}
            <div style={{ flex: 1 }}></div>

            {/* Right: Bell and Search icons */}
            <div className="nav-icons-right">
              <button
                className="nav-icon-button"
                aria-label="Notifications"
                onClick={handleNavigateToNotifications}
              >
                <Bell size={24} weight="regular" />
              </button>
              <button
                className="nav-icon-button"
                aria-label="Search"
                onClick={() => navigate("/search")}
              >
                <Search size={24} weight="regular" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs section */}
        <div className="border-b border-gray-200">
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
                  For You
                </span>
              </button>
              <button
                className={`tab-button ${
                  activeTab === "following" ? "active" : ""
                }`}
                data-tab="following"
                onClick={() => handleTabClick("following")}
              >
                <span
                  className={`tab-text text-sm font-semibold ${
                    activeTab === "following"
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  Following
                </span>
                {activeTab === "following" && (
                  <div className="tab-indicator"></div>
                )}
              </button>

              <button
                className={`tab-button ${
                  activeTab === "videos" ? "active" : ""
                }`}
                data-tab="videos"
                onClick={() => handleTabClick("videos")}
              >
                <span
                  className={`tab-text text-sm font-semibold ${
                    activeTab === "videos" ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  Videos
                </span>
                {activeTab === "videos" && (
                  <div className="tab-indicator"></div>
                )}
              </button>
            </nav>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default TopNavBar;
