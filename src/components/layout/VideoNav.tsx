import { useState } from "react";
import { Menu, Search } from "../../Icons";
import { Check } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import "./VideoNav.css";
import Drawer from "../ui/Drawer";

type FeedType = "for-you" | "following" | "live";

// Simplified props - no longer needs activeTab or onTabChange
interface VideoNavProps {
  // Can add any props needed specifically for VideoPage here
}

// Renamed component to reflect its new purpose
const VideoNav = ({}: VideoNavProps) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState<FeedType>("for-you");

  const handleNavigateToNotifications = () => {
    navigate("/search");
  };

  return (
    <div className="top-nav-tabs top-nav-tabs--videos">
      <div className="flex items-center justify-between w-full max-w-screen-lg mx-auto px-3 h-12">
        {/* Menu Button */}
        <button
          className="flex items-center justify-center"
          aria-label="Menu"
          onClick={() => setDrawerOpen(true)}
        >
          <Menu
            size={26}
            weight="regular"
            className="text-white icon-shadow-realistic"
          />
        </button>

        {/* Center Title - Now with Posts and Videos tabs */}
        <nav className="flex space-x-4">
          <button
            className="relative py-3 text-lg focus:outline-none font-normal text-white/70 text-shadow-realistic"
            onClick={() => navigate("/")}
          >
            <span className="text-sm font-semibold">Posts</span>
          </button>
          <button className="relative py-3 text-lg focus:outline-none font-semibold text-white text-shadow-realistic">
            <span className="text-sm font-semibold">Videos</span>
            <div className="absolute bottom-[0.5rem] left-1/2 transform -translate-x-1/2 w-[25px] h-[3px] bg-white rounded-full indicator-shadow-realistic"></div>
          </button>
        </nav>

        {/* Bell Icon */}
        <button
          className="flex items-center justify-center"
          onClick={handleNavigateToNotifications}
          aria-label="Notifications"
        >
          <Search
            size={26}
            weight="regular"
            className="text-white icon-shadow-realistic"
          />
        </button>
      </div>

      {/* Drawer - Opening from left */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        position="left"
      >
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
              onClick={() => setSelectedFeed("following")}
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

            {/* Live Option */}
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
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default VideoNav;
