import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import { CheckCircle } from "phosphor-react";
import Caption from "../ui/Caption";

interface ReelContentInfoProps {
  username: string;
  caption: string;
  timestamp: string;
  music: string;
  avatar: string;
  isVerified?: boolean;
  location?: string;
  isFollowing: boolean; // Add this line
  onFollow: () => void; // Add this line
}

// Helper function to format relative time
const getRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const secondsDiff = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutesDiff = Math.floor(secondsDiff / 60);
  const hoursDiff = Math.floor(minutesDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);
  const weeksDiff = Math.floor(daysDiff / 7);
  const monthsDiff = Math.floor(daysDiff / 30);
  const yearsDiff = Math.floor(daysDiff / 365);

  if (secondsDiff < 60) return "now";
  if (minutesDiff < 60) return `${minutesDiff}m`;
  if (hoursDiff < 24) return `${hoursDiff}h`;
  if (daysDiff < 7) return `${daysDiff}d`;
  if (weeksDiff < 4) return `${weeksDiff}w`;
  if (monthsDiff < 12) return `${monthsDiff}mo`;
  return `${yearsDiff}y`;
};

const ReelContentInfo = ({
  username,
  caption,
  timestamp,
  music,
  avatar,
  isVerified = false,
  location,
}: ReelContentInfoProps) => {
  return (
    <div className="absolute left-3 bottom-7 right-20 flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        <div className="relative">
          <img src={avatar} alt={username} className="w-10 h-10 rounded-full" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold text-sm flex items-center">
              {username}
              {isVerified && (
                <span className="ml-1">
                  <CheckCircle
                    size={16}
                    weight="fill"
                    className="text-blue-500"
                  />
                </span>
              )}
            </span>
            <span className="text-white/70 text-xs">
              {getRelativeTime(timestamp)}
            </span>
          </div>
          {/* Location display */}
          {location && <p className="text-xs text-white/70">{location}</p>}
        </div>
      </div>

      <Caption
        text={caption}
        className="mb-3 [&_span]:text-white [&_button]:text-white/70 [&_button]:hover:text-white"
        maxLength={37}
      />

      <div className="flex items-center gap-1">
        <MusicalNoteIcon className="w-4 h-4 text-white" />
        <span className="text-white text-xs truncate max-w-[180px]">
          {music}
        </span>
      </div>
    </div>
  );
};

export default ReelContentInfo;
