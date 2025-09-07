import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import TopNavTabs from "./TopNavTabs";
import { useAppStore } from "../../store/appStore";
import { useElementHeight } from "../../hooks/useElementHeight";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isDarkMode, activeTab, setActiveTab } = useAppStore();
  const navHeight = useElementHeight(".TopNavTabs");
  const location = useLocation();

  // Check if the current path is a post or video detail page
  const isPostDetailPage = location.pathname.startsWith("/post/");
  const isVideoDetailPage = location.pathname.startsWith("/video/");
  // Check if current path is a user profile page
  const isUserProfilePage = location.pathname.match(/^\/profile\/[^/]+$/);
  // Check if current path is a chat page
  const isChatPage = location.pathname.startsWith("/chat/");

  // Determine if TopNavTabs should be shown based on the current route
  // Hide tabs on explore page, search page, profile pages, create page, caption page, text-post page, detail pages, chat pages, and suggested-accounts page
  const shouldShowTabs =
    location.pathname !== "/explore" &&
    location.pathname !== "/search" &&
    location.pathname !== "/profile" &&
    location.pathname !== "/notifications" && // Added to hide TopNavTabs on notifications page
    location.pathname !== "/suggested-accounts" && // Added to hide TopNavTabs on suggested accounts page
    !isUserProfilePage &&
    location.pathname !== "/create" &&
    location.pathname !== "/caption" &&
    location.pathname !== "/text-post" &&
    !isPostDetailPage &&
    !isVideoDetailPage &&
    !isChatPage; // Added to hide TopNavTabs on chat pages

  // Hide NavBar on create page, caption page, text-post page, user profile pages, detail pages, and chat pages
  const shouldShowNavBar =
    location.pathname !== "/create" &&
    location.pathname !== "/caption" &&
    location.pathname !== "/text-post" &&
    location.pathname !== "/search" && // Added this line to hide NavBar on search page
    !isUserProfilePage &&
    !isPostDetailPage &&
    !isVideoDetailPage &&
    !isChatPage; // Added to hide NavBar on chat pages

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {shouldShowNavBar && <NavBar />}
      <div
        className={`${shouldShowNavBar ? "sm:pt-16" : ""} mx-auto max-w-2xl ${
          activeTab === "videos" ? "relative" : ""
        }`}
      >
        {shouldShowTabs && (
          <TopNavTabs activeTab={activeTab} onTabChange={setActiveTab} />
        )}
        {shouldShowTabs && (
          <div
            style={{
              height: navHeight > 0 ? navHeight + "px" : "48px",
            }}
          ></div>
        )}
        <main className={`${activeTab === "videos" ? "relative" : ""}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
