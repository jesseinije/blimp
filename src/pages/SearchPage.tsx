import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass, X } from "phosphor-react";
import { CaretLeft } from "../Icons";
import SearchHistory from "../components/search/SearchHistory";
import SuggestedSearch from "../components/search/SuggestedSearch";
import TrendingSearch from "../components/search/TrendingSearch";
import ExploreGrid from "../components/explore/ExploreGrid";
import EmptyState from "../components/ui/EmptyState";
import { ExploreGridSkeleton } from "../components/ui/skeletons/ExploreGridSkeleton";
import { SkeletonProvider } from "../components/ui/skeletons/SkeletonProvider";
import "react-loading-skeleton/dist/skeleton.css";
import type {
  SearchHistoryItem,
  SuggestedSearchItem,
  TrendingTopic,
} from "../types/searchTypes";
import type { SuggestedAccount } from "../types/notificationTypes";
import {
  mockSearchHistory,
  mockSuggestedSearches,
  mockTrendingTopics,
} from "../data/searchData";
import { mockPosts } from "../data/mockData";

import SuggestedAccounts from "../components/notifications/SuggestedAccounts";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] =
    useState<SearchHistoryItem[]>(mockSearchHistory);
  const [suggestedSearches, setSuggestedSearches] = useState<
    SuggestedSearchItem[]
  >(mockSuggestedSearches);
  const [trendingTopics] = useState<TrendingTopic[]>(mockTrendingTopics);
  const [showClearButton, setShowClearButton] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState("trending");
  const [isGridLoading, setIsGridLoading] = useState(true); // Add this state
  const tabs = ["Trending", "Users", "Videos", "Posts", "Live"];

  // Filter posts for videos and images
  const videoPosts = mockPosts.filter((post) => post.media[0].type === "video");

  const imagePosts = mockPosts.filter((post) => post.media[0].type === "image");

  // Mock data for suggested accounts
  const suggestedAccounts: SuggestedAccount[] = [
    {
      id: "1",
      username: "tiffanyleechambers",
      name: "Tiffany Lee Chambers",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      followers: 15200,
      isVerified: true,
    },
    {
      id: "2",
      username: "natestackondeckjenninhs",
      name: "Nate Jennings",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      followers: 8900,
    },
    {
      id: "3",
      username: "ruelettienne",
      name: "Ruel Ettienne",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      followers: 25600,
      isVerified: true,
    },
    {
      id: "4",
      username: "dte1973",
      name: "Darcy Thompson-Edwards",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      followers: 3400,
    },
    {
      id: "5",
      username: "tdogforreal",
      name: "Terrence Marshall",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      followers: 12800,
    },
  ];

  // Update clear button visibility when search query changes
  useEffect(() => {
    setShowClearButton(searchQuery.length > 0);
  }, [searchQuery]);

  // Add loading effect when tab changes
  useEffect(() => {
    if (isSearching) {
      setIsGridLoading(true);
      const timer = setTimeout(() => {
        setIsGridLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [activeTab, isSearching]);

  // Handle search history item removal
  const handleClearHistoryItem = (id: string) => {
    setSearchHistory(searchHistory.filter((item) => item.id !== id));
  };

  // Handle selecting a search item (history, suggestion, or trend)
  const handleSelectSearchItem = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);

    // Add to search history if not already there
    if (!searchHistory.some((item) => item.query === query)) {
      const newHistoryItem: SearchHistoryItem = {
        id: Date.now().toString(),
        query,
        timestamp: new Date().toISOString(),
      };
      setSearchHistory([newHistoryItem, ...searchHistory]);
    }
  };

  // Handle refreshing suggested searches
  const handleRefreshSuggestions = () => {
    // In a real app, you would fetch new suggestions from an API
    // For now, we'll just shuffle the existing suggestions to simulate a refresh
    setSuggestedSearches(
      [...suggestedSearches].sort(() => Math.random() - 0.5)
    );
  };

  // Clear search input
  const handleClearSearch = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setSearchQuery("");
    setIsSearching(false);
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      // In a real app, you would perform the search here
      handleSelectSearchItem(searchQuery);
    }
  };

  // Handle back button click
  const handleGoBack = () => {
    if (isSearching) {
      // If we're viewing search results, go back to search input
      setIsSearching(false);
    } else {
      // Otherwise go back to previous page
      navigate(-1);
    }
  };

  // Update search query
  const handleUpdateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Go to create live stream
  const handleStartLive = () => {
    // Navigate to a hypothetical page for starting a live stream
    navigate("/create/live");
  };

  // Update renderTabContent to only show loading for grid-based tabs
  const renderTabContent = () => {
    // Only show loading for tabs that use ExploreGrid
    if (
      isGridLoading &&
      isSearching &&
      ["trending", "videos", "posts"].includes(activeTab)
    ) {
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
      {/* Search header with back button and search form/button */}
      <div className="flex items-center space-x-3 p-3">
        {/* Back button */}
        <button
          onClick={handleGoBack}
          className="flex-shrink-0"
          aria-label="Go back"
        >
          <CaretLeft size={24} className="text-gray-900 " />
        </button>

        {!isSearching ? (
          /* Search form when in search input mode */
          <form onSubmit={handleSearch} className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlass size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleUpdateQuery}
              className="bg-gray-100  border-0 w-full pl-10 pr-10 py-2 rounded-lg focus:outline-none"
              autoFocus
            />
            {showClearButton && (
              <button
                type="button"
                onClick={(e) => handleClearSearch(e)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X size={20} className="text-gray-400" />
              </button>
            )}
          </form>
        ) : (
          /* Search button when in results mode */
          <div
            onClick={() => setIsSearching(false)}
            className="bg-gray-100  border-0 w-full pl-10 pr-10 py-2 rounded-lg flex items-center cursor-pointer relative"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlass size={20} className="text-gray-400" />
            </div>
            <span className="text-gray-900  truncate">{searchQuery}</span>

            {searchQuery.length > 0 && (
              <button
                type="button"
                onClick={(e) => handleClearSearch(e)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X size={20} className="text-gray-400" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Conditional rendering based on search state */}
      {!isSearching ? (
        <div className="px-3">
          {/* Recent searches */}
          <SearchHistory
            history={searchHistory}
            onClearItem={handleClearHistoryItem}
            onSelectItem={handleSelectSearchItem}
          />

          {/* Suggested searches */}
          <SuggestedSearch
            suggestions={suggestedSearches}
            onSelectSuggestion={handleSelectSearchItem}
            onRefresh={handleRefreshSuggestions}
          />

          {/* Trending topics */}
          <TrendingSearch
            topics={trendingTopics}
            onSelectTopic={handleSelectSearchItem}
          />
        </div>
      ) : (
        <div className="flex flex-col">
          {/* Filter Tabs - with padding */}
          <div className="px-3 border-b border-gray-200 mb-0.5">
            <div className="w-full ">
              <div className="flex overflow-x-auto space-x-4 mb-0">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.toLowerCase();
                  return (
                    <button
                      key={tab.toLowerCase()}
                      onClick={() => setActiveTab(tab.toLowerCase())}
                      className={`relative px-2 py-1.5 text-sm whitespace-nowrap flex flex-col items-center ${
                        isActive
                          ? "text-gray-900 font-semibold"
                          : "text-gray-400 font-medium"
                      }`}
                    >
                      <span>{tab}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-blue-500 rounded-full"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Search results based on active tab */}
          {renderTabContent()}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
