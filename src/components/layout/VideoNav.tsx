import { useNavigate } from "react-router-dom";
import { Search } from "../../Icons";
import "./VideoNav.css";

interface VideoNavProps {
  // Can add any props needed specifically for VideoPage here
}

const VideoNav = ({}: VideoNavProps) => {
  const navigate = useNavigate();

  const handleNavigateToNotifications = () => {
    navigate("/search");
  };

  return (
    <div className="top-nav-tabs top-nav-tabs--videos">
      <div className="flex items-center justify-between w-full max-w-screen-lg mx-auto px-3 h-12">
        {/* Empty div on the left for balancing layout */}
        <div className="w-[26px]"></div>

        {/* Center Title - Now with Posts, Videos, Live, For You, and Following tabs */}
        <nav className="flex space-x-4 mx-auto">
          <button className="relative py-3 text-lg focus:outline-none font-semibold text-white text-shadow-realistic">
            <span className="text-sm font-semibold">For you</span>
            <div className="absolute bottom-[0.5rem] left-1/2 transform -translate-x-1/2 w-[25px] h-[3px] bg-white rounded-full indicator-shadow-realistic"></div>
          </button>
          <button className="relative py-3 text-lg focus:outline-none font-normal text-white/70 text-shadow-realistic">
            <span className="text-sm font-semibold">Following</span>
          </button>
          <button className="relative py-3 text-lg focus:outline-none font-normal text-white/70 text-shadow-realistic">
            <span className="text-sm font-semibold">Live</span>
          </button>
          <button
            className="relative py-3 text-lg focus:outline-none font-normal text-white/70 text-shadow-realistic"
            onClick={() => navigate("/")}
          >
            <span className="text-sm font-semibold">Posts</span>
          </button>
        </nav>

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
    </div>
  );
};

export default VideoNav;
