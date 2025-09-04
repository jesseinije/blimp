import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { House, Search, Plus, Bell } from "../../Icons"; // Update imports to use custom icons
import "./NavBar.css";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeTab, currentUser } = useAppStore();
  const navRef = useRef<HTMLElement>(null);

  const isActive = (path: string) => location.pathname === path;
  const y = useMotionValue(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const navHeight = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleAddPost = () => {
    navigate("/create");
  };

  // Check if we're on homepage and videos tab is active
  const isVideoMode = location.pathname === "/" && activeTab === "videos";

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

          if (currentDirection !== lastDirection) {
            if (currentDirection > 0) {
              animate(y, navHeight.current, {
                type: "tween",
                duration: 0.2,
                ease: "easeOut",
              });
            } else {
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
  }, [location.pathname, activeTab]);

  return (
    <motion.nav
      ref={navRef}
      className={`nav-bar z-10 fixed bottom-0 left-0 right-0 pb-safe ${
        isVideoMode ? "video-mode" : ""
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
        <Link
          to="/"
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
          <House size={26} weight={isActive("/") ? "fill" : "regular"} />
        </Link>

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
          to="/notifications"
          className={`flex items-center relative ${
            isActive("/notifications")
              ? isVideoMode
                ? "text-white"
                : "text-gray-900"
              : isVideoMode
              ? "text-white/80"
              : "text-gray-400"
          }`}
        >
          <Bell
            size={26}
            weight={isActive("/notifications") ? "fill" : "regular"}
          />
          {/* Notification Badge */}
          <span className="absolute top-2 right-0.5 w-2 h-2 bg-blue-500 rounded-full"></span>
        </Link>

        <Link to="/profile" className="flex items-center">
          <img
            src={currentUser?.avatar || "https://i.pravatar.cc/150?img=1"}
            alt="Profile"
            className="w-[26px] h-[26px] rounded-full object-cover"
          />
        </Link>
      </div>
    </motion.nav>
  );
};

export default NavBar;
