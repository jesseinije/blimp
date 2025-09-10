import type { ReactNode } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import TopNavBar from "./TopNavBar";
import VideoNav from "./VideoNav"; // Import VideoNav
import { useAppStore } from "../../store/appStore";
import { useElementHeight } from "../../hooks/useElementHeight";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isDarkMode, activeTab, setActiveTab } = useAppStore();
  const navHeight = useElementHeight(".top-nav-bar");
  const location = useLocation();

  // Update activeTab based on route
  useEffect(() => {
    if (location.pathname === "/reels") {
      setActiveTab("videos");
    } else if (location.pathname === "/" && activeTab === "videos") {
      setActiveTab("posts");
    }
  }, [location.pathname, setActiveTab, activeTab]);

  // Check if the current path is a post or video detail page
  const isPostDetailPage = location.pathname.startsWith("/post/");
  const isVideoDetailPage = location.pathname.startsWith("/video/");
  // Check if current path is a user profile page
  const isUserProfilePage = location.pathname.match(/^\/profile\/[^/]+$/);
  // Check if current path is a chat page
  const isChatPage = location.pathname.startsWith("/chat/");

  // Check if we're on the reels page (but not video detail page)
  const isReelsPage = location.pathname === "/reels";

  // Determine if TopNavBar should be shown based on the current route
  const isUserPostsPage = location.pathname.match(/^\/user\/[^/]+\/posts$/);
  const isUserReelsPage = location.pathname.match(/^\/user\/[^/]+\/reels$/); // <-- Add this line

  const shouldShowTabs =
    location.pathname !== "/explore" &&
    location.pathname !== "/search" &&
    location.pathname !== "/profile" &&
    location.pathname !== "/notifications" &&
    location.pathname !== "/messages" &&
    location.pathname !== "/suggested-accounts" &&
    location.pathname !== "/reels" && // Hide on reels page
    !isUserProfilePage &&
    location.pathname !== "/create" &&
    location.pathname !== "/caption" &&
    location.pathname !== "/text-post" &&
    !isPostDetailPage &&
    !isVideoDetailPage &&
    !isChatPage &&
    !isUserPostsPage &&
    !isUserReelsPage; // <-- Add this condition

  // Hide NavBar on create page, caption page, text-post page, user profile pages, detail pages, chat pages, and user reels page
  const shouldShowNavBar =
    location.pathname !== "/create" &&
    location.pathname !== "/caption" &&
    location.pathname !== "/text-post" &&
    location.pathname !== "/search" &&
    location.pathname !== "/notifications" &&
    !isUserProfilePage &&
    !isPostDetailPage &&
    !isVideoDetailPage &&
    !isChatPage &&
    !isUserReelsPage; // <-- Add this condition

  // Map the app store activeTab to the format expected by TopNavBar
  const mapTabForTopNav = (tab: string): "posts" | "following" => {
    return tab === "videos" ? "following" : "posts";
  };

  // Handle tab change from TopNavBar
  const handleTabChange = (tab: "posts" | "following") => {
    // Map back from TopNavBar's tab format to app store format
    setActiveTab(tab === "following" ? "videos" : "posts");
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {shouldShowNavBar && <NavBar />}
      <div
        className={`${shouldShowNavBar ? "sm:pt-16" : ""} mx-auto max-w-2xl ${
          activeTab === "videos" || location.pathname === "/reels"
            ? "relative"
            : ""
        }`}
      >
        {/* Only show VideoNav on reels page, not on video detail pages */}
        {isReelsPage ? (
          <VideoNav />
        ) : (
          shouldShowTabs && (
            <TopNavBar
              activeTab={mapTabForTopNav(activeTab)}
              onTabChange={handleTabChange}
            />
          )
        )}

        {shouldShowTabs && !isReelsPage && (
          <div
            style={{
              height: navHeight > 0 ? navHeight + "px" : "101px",
            }}
          ></div>
        )}

        <main
          className={`${
            activeTab === "videos" || location.pathname === "/reels"
              ? "relative"
              : ""
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
