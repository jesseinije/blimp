import { useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "phosphor-react";
import ExploreGrid from "../components/explore/ExploreGrid";
import { ExploreGridSkeleton } from "../components/ui/skeletons/ExploreGridSkeleton";
import { SkeletonProvider } from "../components/ui/skeletons/SkeletonProvider";
import { useState, useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css"; // Add skeleton CSS import

const ExplorePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Reduced to 500ms to match the working implementation
    return () => clearTimeout(timer);
  }, []);

  // Navigate to search page
  const handleNavigateToSearch = () => {
    navigate("/search");
  };

  if (isLoading) {
    return (
      <div className="bg-white">
        <SkeletonProvider>
          <div className="max-w-2xl mx-auto min-h-screen">
            {/* Search button skeleton */}
            <div className="px-3 py-2">
              <div className="bg-gray-100 w-full h-10 rounded-lg" />
            </div>
            <ExploreGridSkeleton />
          </div>
        </SkeletonProvider>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white min-h-screen">
      {/* Container with padding for the search button */}
      <div className="px-3 py-2 bg-white">
        {/* Search button (not a form) */}
        <div
          onClick={handleNavigateToSearch}
          className="bg-gray-100 border-0 w-full pl-10 pr-10 py-2 rounded-lg flex items-center cursor-pointer relative"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlass
              size={20}
              weight="light"
              className="text-gray-400"
            />
          </div>
          <span className="text-gray-400 text-sm">Search</span>
        </div>
      </div>

      {/* Explore content grid */}
      <ExploreGrid />
    </div>
  );
};

export default ExplorePage;
