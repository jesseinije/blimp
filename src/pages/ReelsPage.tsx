import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReelsFeed from "../components/reels/ReelsFeed";
import { useAppStore } from "../store/appStore";

const ReelsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { reels } = useAppStore();

  useEffect(() => {
    // Simulate loading time or perform any necessary data fetching
    const timer = setTimeout(() => {
      if (reels.length === 0) {
        setError("No reels available");
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [reels]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="fixed bg-black inset-0 flex flex-col">
      {loading ? (
        <div className="flex justify-center items-center h-full w-full bg-black">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-full w-full bg-black text-white">
          <div className="text-lg font-medium mb-4">{error}</div>
          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-gray-800 rounded-lg"
          >
            Go Back
          </button>
        </div>
      ) : (
        <ReelsFeed />
      )}
    </div>
  );
};

export default ReelsPage;
