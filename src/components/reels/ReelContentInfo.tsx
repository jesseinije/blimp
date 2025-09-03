import { CheckCircle, MusicNote } from "phosphor-react";
import Caption from "../ui/Caption";
import React from "react";
import { getRelativeTime } from "../../utils/dateUtils";
import { Link } from "react-router-dom"; // Add this import

interface ReelContentInfoProps {
  username: string;
  caption: string;
  timestamp: string;
  music: string;
  avatar: string;
  isFollowing: boolean;
  isVerified?: boolean;
  location?: string;
  sponsored?: string;
  onFollow: () => void;
}

const ReelContentInfo: React.FC<ReelContentInfoProps> = ({
  username,
  caption,
  timestamp,
  music,
  avatar,
  isVerified,
  location,
  sponsored,
}) => {
  // Always format the timestamp using getRelativeTime
  const formattedTime = getRelativeTime(timestamp);

  return (
    <div className="absolute left-3 bottom-7 right-20 flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        <div className="relative">
          <Link to={`/profile/${username}`} className="block">
            <img
              src={avatar}
              alt={username}
              className="w-10 h-10 rounded-full"
            />
          </Link>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Link
              to={`/profile/${username}`}
              className="text-white font-semibold text-sm flex items-center"
            >
              {username}
              {isVerified && (
                <span className="ml-1">
                  <CheckCircle
                    size={18}
                    weight="fill"
                    className="text-blue-500"
                  />
                </span>
              )}
            </Link>
            <span className="text-white/70 text-sm">{formattedTime}</span>
          </div>
          {(location || sponsored) && (
            <div className="text-xs text-white/70 flex items-center h-5">
              <span className="flex items-center">
                {location}
                {sponsored && (
                  <span className="ml-1 font-medium">• Sponsored</span>
                )}
              </span>
            </div>
          )}
        </div>
      </div>

      <Caption
        text={caption}
        className="mb-3 [&_span:not(.text-blue-400)]:text-white [&_button]:text-white/70"
        maxLength={37}
        highlightClassName="text-blue-500 !important"
      />

      <div className="flex items-center gap-1">
        <MusicNote size={16} weight="fill" className="text-white" />
        <span className="text-white text-xs truncate max-w-[180px]">
          {music}
        </span>
      </div>
    </div>
  );
};

export default ReelContentInfo;
