import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";
import {
  HouseSimple,
  MagnifyingGlass,
  Plus,
  Bell,
} from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import "./NavBar.css";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeTab, currentUser } = useAppStore(); // Add currentUser from store
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
              animate(y, navHeight.current, {
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
  }, [location.pathname, activeTab]);

  // Remove the inline border class and use our new CSS class
  const navBarClasses = "nav-bar dark:bg-gray-900 z-10";

  return (
    <motion.nav
      ref={navRef}
      className={navBarClasses}
      style={{
        y,
      }}
    >
      <div className="hidden sm:block sm:flex-1">
        <Link to="/" className="flex items-center">
          <h1 className="text-xl font-bold">BlimpSocial</h1>
        </Link>
      </div>

      <div className="flex justify-around w-full py-1.5 sm:w-auto sm:justify-end sm:space-x-8">
        <Link
          to="/"
          className={`flex items-center ${
            isActive("/")
              ? "text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <HouseSimple size={26} weight={isActive("/") ? "fill" : "regular"} />
        </Link>

        <Link
          to="/explore"
          className={`flex items-center ${
            isActive("/explore")
              ? "text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <MagnifyingGlass
            size={26}
            weight={isActive("/explore") ? "bold" : "regular"}
          />
        </Link>

        <button
          onClick={handleAddPost}
          className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 ${
            isActive("/create")
              ? "text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <Plus size={22} weight="bold" />
        </button>

        <Link
          to="/notifications"
          className={`flex items-center ${
            isActive("/notifications")
              ? "text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <Bell
            size={26}
            weight={isActive("/notifications") ? "fill" : "regular"}
          />
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
