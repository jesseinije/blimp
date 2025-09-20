import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MagnifyingGlass, CaretDown } from "phosphor-react";
import { CaretLeft } from "../Icons";
import ExploreGrid from "../components/explore/ExploreGrid";
import EmptyState from "../components/ui/EmptyState";
import { ExploreGridSkeleton } from "../components/ui/skeletons/ExploreGridSkeleton";
import { SkeletonProvider } from "../components/ui/skeletons/SkeletonProvider";
import SuggestedAccounts from "../components/notifications/SuggestedAccounts";
import type { SuggestedAccount } from "../types/notificationTypes";
import { mockPosts } from "../data/mockData";

const tabs = ["Trending", "Users", "Videos", "Posts", "Live"];

const suggestedAccounts: SuggestedAccount[] = [
  // ...same mock data as before...
];

const videoPosts = mockPosts.filter((post) => post.media[0].type === "video");
const imagePosts = mockPosts.filter((post) => post.media[0].type === "image");

const SearchResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = location.state?.searchQuery || "";
  const [activeTab, setActiveTab] = useState("trending");
  const [isGridLoading, setIsGridLoading] = useState(true);

  useEffect(() => {
    setIsGridLoading(true);
    const timer = setTimeout(() => {
      setIsGridLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeTab, searchQuery]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleStartLive = () => {
    navigate("/create/live");
  };

  const renderTabContent = () => {
    if (isGridLoading && ["trending", "videos", "posts"].includes(activeTab)) {
      return (
        <div className="bg-white">
          <SkeletonProvider>
            <ExploreGridSkeleton />
          </SkeletonProvider>
        </div>
      );
    }

    switch (activeTab) {
      case "users":
        return (
          <SuggestedAccounts
            accounts={suggestedAccounts}
            showDismiss={false}
            showHeader={false}
          />
        );
      case "videos":
        return <ExploreGrid posts={videoPosts} />;
      case "posts":
        return <ExploreGrid posts={imagePosts} />;
      case "live":
        return (
          <EmptyState
            title="No Live Streams Available"
            description="There are no live streams happening right now. Start your own live stream to connect with your followers in real-time!"
            action={
              <button
                onClick={handleStartLive}
                className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Go Live
              </button>
            }
            className="py-24"
          />
        );
      case "trending":
      default:
        return <ExploreGrid />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white min-h-screen mb-10">
      <div
        className="flex items-center p-3 justify-between w-full max-w-[400px] mx-auto"
        style={{ maxWidth: "100%" }}
      >
        {/* Back button */}
        <button
          onClick={handleGoBack}
          className="flex-shrink-0 mr-2"
          aria-label="Go back"
        >
          <CaretLeft size={24} className="text-gray-900" />
        </button>
        {/* Search bar and filter button container */}
        <div className="flex items-center flex-grow min-w-0">
          <div className="flex-grow relative min-w-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlass size={20} className="text-gray-400" />
            </div>
            <div className="bg-gray-100 border-0 w-full pl-10 pr-10 py-2 rounded-lg flex items-center cursor-pointer relative min-w-0">
              <span
                className="text-gray-900 truncate block w-full"
                style={{ minWidth: 0 }}
                title={searchQuery}
              >
                {searchQuery}
              </span>
            </div>
          </div>
          <button
            className="ml-2 flex-shrink-0 px-3 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors flex items-center gap-1"
            aria-label="Filter"
            onClick={() => {
              /* handle filter action */
            }}
          >
            Filter
            <CaretDown size={18} className="text-gray-500" />
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="px-3 border-b border-gray-200 mb-[0.05rem]">
          <div className="w-full ">
            <div className="flex overflow-x-auto space-x-4 mb-0">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.toLowerCase();
                return (
                  <button
                    key={tab.toLowerCase()}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`relative px-2 py-1.5 text-sm whitespace-nowrap flex flex-col items-center ${
                      isActive ? "text-gray-900" : "text-gray-400"
                    } font-semibold`}
                  >
                    <span className="font-semibold">{tab}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-blue-500 rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SearchResultPage;
