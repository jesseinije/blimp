import { useEffect, useState } from "react";
import Feed from "../components/feed/Feed";
import ReelsFeed from "../components/reels/ReelsFeed";
import { useAppStore } from "../store/appStore";
import { useElementHeight } from "../hooks/useElementHeight";

const HomePage = () => {
  const { activeTab } = useAppStore();
  const navbarHeight = useElementHeight("nav"); // Select the navbar
  const tabsHeight = useElementHeight("nav + div > div"); // Select the tabs container, using a more reliable selector
  const [totalOffset, setTotalOffset] = useState(0);
  const [prevTab, setPrevTab] = useState<"posts" | "videos">(activeTab);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Calculate combined height of navbar and tabs
  useEffect(() => {
    setTotalOffset(navbarHeight + (activeTab === "videos" ? 0 : tabsHeight));
  }, [navbarHeight, tabsHeight, activeTab]);

  // Handle measurements after initial render
  useEffect(() => {
    // Give time for the DOM to be fully rendered and measured
    const initTimer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(initTimer);
  }, []);

  // Handle tab transitions
  useEffect(() => {
    if (prevTab !== activeTab) {
      setIsTransitioning(true);
      setPrevTab(activeTab);

      // Reset transition state after animation completes
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 400); // Match this with the CSS animation duration

      return () => clearTimeout(timer);
    }
  }, [activeTab, prevTab]);

  // Render both components but control visibility with CSS
  const renderPosts = activeTab === "posts" || prevTab === "posts";
  const renderVideos = activeTab === "videos" || prevTab === "videos";

  return (
    <div className="relative bg-white">
      {/* Posts Feed */}
      {renderPosts && (
        <div
          className={`${
            activeTab === "posts"
              ? "tab-transition-enter"
              : "tab-transition-exit"
          } ${isTransitioning ? "absolute inset-0" : ""}`}
          style={{
            zIndex: activeTab === "posts" ? 2 : 1,
            opacity: activeTab === "posts" ? 1 : 0,
          }}
        >
          <Feed />
        </div>
      )}

      {/* Videos Feed */}
      {renderVideos && (
        <div
          className={`bg-black relative ${
            activeTab === "videos"
              ? "tab-transition-enter"
              : "tab-transition-exit"
          } ${isTransitioning ? "absolute inset-0" : ""}`}
          style={{
            height: isInitialized
              ? `calc(100vh - ${totalOffset}px)`
              : `calc(100vh - ${navbarHeight}px)`,
            marginTop: activeTab === "videos" ? `-${tabsHeight}px` : "0",
            zIndex: activeTab === "videos" ? 2 : 1,
            opacity: activeTab === "videos" ? 1 : 0,
          }}
        >
          <ReelsFeed />
        </div>
      )}
    </div>
  );
};

export default HomePage;
