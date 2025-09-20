import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { House, Search, Plus, Chat, Refresh } from "../../Icons";
import "./NavBar.css";
import { userData } from "../../data/userData"; // Add this import

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeTab } = useAppStore();
  const navRef = useRef<HTMLElement>(null);
  const [showRefresh, setShowRefresh] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const y = useMotionValue(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const navHeight = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Add a threshold for scroll distance before hiding the navbar
  const scrollThreshold = 100; // Same threshold value as in TopNavBar

  const handleAddPost = () => {
    navigate("/create");
  };

  // Updated condition to include /reels path as well
  const isVideoMode =
    (location.pathname === "/" && activeTab === "videos") ||
    location.pathname === "/reels";

  // Get user id 115 for the avatar
  const user115 = userData.find((u) => u.id === "115");

  useEffect(() => {
    if (navRef.current) {
      navHeight.current = navRef.current.offsetHeight;
    }

    const isMobile = () => window.innerWidth < 640;
    const shouldEnable =
      isMobile() && location.pathname === "/" && activeTab === "posts";

    if (!shouldEnable) {
      animate(y, 0, { duration: 0.3 });
      return;
    }

    lastScrollY.current = window.scrollY;
    lastScrollTime.current = Date.now();

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

          if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
          }

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
              animate(y, navHeight.current, {
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
  }, [location.pathname, activeTab]);

  const notificationCount = 3; // Replace with your actual count

  const handleHomeClick = () => {
    if (isActive("/")) {
      setShowRefresh(true);
      setTimeout(() => {
        setShowRefresh(false);
        window.location.reload(); // Simulate refresh
      }, 1000); // Duration matches icon animation
    } else {
      navigate("/");
    }
  };

  return (
    <motion.nav
      ref={navRef}
      className={`nav-bar z-10 fixed bottom-0 left-0 right-0 pb-safe ${
        isVideoMode ? "video-mode" : "border-t border-gray-200"
      }`}
      style={{
        y,
        paddingBottom: `calc(env(safe-area-inset-bottom, 0px))`,
      }}
    >
      <div className="hidden sm:block sm:flex-1">
        <Link to="/" className="flex items-center">
          <h1
            className={`text-xl font-bold ${
              isVideoMode ? "text-white" : "text-gray-900"
            }`}
          >
            BlimpSocial
          </h1>
        </Link>
      </div>

      <div className="flex justify-around w-full py-1.5 sm:w-auto sm:justify-end sm:space-x-8">
        <button
          onClick={handleHomeClick}
          className={`flex items-center ${
            isActive("/")
              ? isVideoMode
                ? "text-white"
                : "text-gray-900"
              : isVideoMode
              ? "text-white/80"
              : "text-gray-400"
          }`}
        >
          {isActive("/") && showRefresh ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: 1, duration: 1, ease: "linear" }}
              style={{ display: "inline-block" }}
            >
              <Refresh size={26} weight="bold" />
            </motion.span>
          ) : (
            <House size={26} weight={isActive("/") ? "fill" : "regular"} />
          )}
        </button>

        <Link
          to="/explore"
          className={`flex items-center ${
            isActive("/explore")
              ? isVideoMode
                ? "text-white"
                : "text-gray-900"
              : isVideoMode
              ? "text-white/80"
              : "text-gray-400"
          }`}
        >
          <Search
            size={26}
            weight={isActive("/explore") ? "bold" : "regular"}
          />
        </Link>

        <button
          onClick={handleAddPost}
          className={`flex items-center justify-center w-12 h-8 rounded-lg ${
            isVideoMode ? "bg-white text-gray-900" : "bg-gray-100 text-gray-400"
          }`}
        >
          <Plus size={22} weight="bold" />
        </button>

        <Link
          to="/messages"
          className={`flex items-center relative ${
            isActive("/messages")
              ? isVideoMode
                ? "text-white"
                : "text-gray-900"
              : isVideoMode
              ? "text-white/80"
              : "text-gray-400"
          }`}
        >
          <Chat size={26} weight={isActive("/messages") ? "fill" : "regular"} />
          {/* Notification Badge */}
          {notificationCount > 0 && (
            <span
              className="absolute -top-0.5 -right-2 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white"
              style={{ lineHeight: "18px" }}
            >
              {notificationCount > 99 ? "99+" : notificationCount}
            </span>
          )}
        </Link>

        <Link to="/profile" className="flex items-center">
          <img
            src={user115?.avatar}
            alt="Profile"
            className="w-[32px] h-[32px] rounded-full object-cover"
          />
        </Link>
      </div>
    </motion.nav>
  );
};

export default NavBar;
