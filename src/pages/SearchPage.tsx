import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass, X } from "phosphor-react";
import { CaretLeft } from "../Icons";
import SearchHistory from "../components/search/SearchHistory";
import SuggestedSearch from "../components/search/SuggestedSearch";
import TrendingSearch from "../components/search/TrendingSearch";
import "react-loading-skeleton/dist/skeleton.css";
import type {
  SearchHistoryItem,
  SuggestedSearchItem,
  TrendingTopic,
} from "../types/searchTypes";
import {
  mockSearchHistory,
  mockSuggestedSearches,
  mockTrendingTopics,
} from "../data/searchData";

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

  // Update clear button visibility when search query changes
  useEffect(() => {
    setShowClearButton(searchQuery.length > 0);
  }, [searchQuery]);

  // Handle search history item removal
  const handleClearHistoryItem = (id: string) => {
    setSearchHistory(searchHistory.filter((item) => item.id !== id));
  };

  // Handle selecting a search item (history, suggestion, or trend)
  const handleSelectSearchItem = (query: string) => {
    setSearchQuery(query);
    // Add to search history if not already there
    if (!searchHistory.some((item) => item.query === query)) {
      const newHistoryItem: SearchHistoryItem = {
        id: Date.now().toString(),
        query,
        timestamp: new Date().toISOString(),
      };
      setSearchHistory([newHistoryItem, ...searchHistory]);
    }
    // Navigate to SearchResultPage
    navigate("/search/results", { state: { searchQuery: query } });
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
      // Instead of setting isSearching, navigate to SearchResultPage
      navigate("/search/results", { state: { searchQuery } });
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
          <CaretLeft size={24} className="text-gray-900" />
        </button>
        {/* Search bar - takes full width */}
        <div className="flex-grow">
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlass size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleUpdateQuery}
              className="bg-gray-100 border-0 w-full pl-10 pr-10 py-2 rounded-lg focus:outline-none"
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
        </div>
      </div>

      {/* Default search page content */}
      <div className="px-3">
        <SearchHistory
          history={searchHistory}
          onClearItem={handleClearHistoryItem}
          onSelectItem={handleSelectSearchItem}
        />
        <SuggestedSearch
          suggestions={suggestedSearches}
          onSelectSuggestion={handleSelectSearchItem}
          onRefresh={handleRefreshSuggestions}
        />
        <TrendingSearch
          topics={trendingTopics}
          onSelectTopic={handleSelectSearchItem}
        />
      </div>
    </div>
  );
};

export default SearchPage;
