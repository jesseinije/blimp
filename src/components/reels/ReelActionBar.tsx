import { useState } from "react";
import {
  Heart,
  ArrowsClockwise,
  BookmarkSimple,
  DotsThreeOutlineVertical,
  ChatCircle,
  PaperPlaneTilt,
  Info,
  Flag,
  Prohibit,
  SpeakerSimpleSlash,
  CaretLeft,
} from "@phosphor-icons/react";
import BottomSheet from "../ui/BottomSheet";
import CommentsList from "../feed/CommentsList";
import ReplyList from "../feed/ReplyList";
import type { Comment as CommentType } from "../../types";

// Add the formatCount function
function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return count.toString();
}

interface ReelActionBarProps {
  reelId: string;
  comments?: Comment[]; // Now using the imported Comment type
  likeCount: number;
  commentCount: number;
  shareCount: number;
  saveCount: number;
  albumCover: string;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onSave: () => void;
  isLiked: boolean;
  username: string;
}

const ReelActionBar = ({
  reelId,
  comments = [],
  likeCount,
  commentCount,
  shareCount,
  saveCount = 0,
  albumCover,
  onLike,
  onComment,
  onShare,
  onSave,
  isLiked,
  username = "User",
}: ReelActionBarProps) => {
  const [isMoreSheetOpen, setIsMoreSheetOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [bottomSheetTitle, setBottomSheetTitle] = useState("Comments");
  const [currentView, setCurrentView] = useState<"comments" | "replies">(
    "comments"
  );
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null); // Updated type here too

  const handleMoreClick = () => {
    setIsMoreSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsMoreSheetOpen(false);
  };

  const openComments = () => {
    setBottomSheetTitle("Comments");
    setCurrentView("comments");
    setCommentsOpen(true);
    onComment();
  };

  const closeComments = () => {
    setCommentsOpen(false);
    // Reset the view state when closing
    setTimeout(() => {
      setCurrentView("comments");
      setBottomSheetTitle("Comments");
      setSelectedComment(null);
    }, 300);
  };

  const handleViewReplies = (comment: Comment, title: string) => {
    setSelectedComment(comment);
    setBottomSheetTitle(title);
    setCurrentView("replies");
  };

  const handleBackToComments = () => {
    setBottomSheetTitle("Comments");
    setCurrentView("comments");
    setSelectedComment(null);
  };

  // Custom close button with back functionality when in replies view
  const customCloseButton =
    currentView === "replies" ? (
      <button
        onClick={handleBackToComments}
        className="p-2 text-gray-900 dark:text-gray-100"
        aria-label="Back to comments"
      >
        <CaretLeft size={24} weight="bold" />
      </button>
    ) : undefined;

  return (
    <>
      <div className="absolute right-3 bottom-4 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center">
          {/* Like button */}
          <button
            onClick={onLike}
            className="flex items-center justify-center transition-all"
          >
            <Heart
              size={32}
              weight="fill"
              className={`${
                isLiked
                  ? "text-red-500 filter drop-shadow-[0_1.5px_0.5px_rgba(0,0,0,0.2)]"
                  : "text-white/80 filter drop-shadow-[0_1.5px_0.5px_rgba(0,0,0,0.2)]"
              }`}
            />
          </button>
          <span className="text-white/80 text-sm font-medium translate-y-1 filter drop-shadow-[0_1px_0.5px_rgba(0,0,0,0.15)]">
            {formatCount(likeCount)}
          </span>
        </div>

        <div className="flex flex-col items-center">
          {/* Comment button */}
          <button
            onClick={openComments}
            className="flex items-center justify-center transition-all"
          >
            <ChatCircle
              size={32}
              weight="fill"
              className="text-white/80 filter drop-shadow-[0_1.5px_0.5px_rgba(0,0,0,0.2)]"
            />
          </button>
          <span className="text-white/80 text-sm font-medium translate-y-1 filter drop-shadow-[0_1px_0.5px_rgba(0,0,0,0.15)]">
            {formatCount(commentCount)}
          </span>
        </div>

        <div className="flex flex-col items-center">
          {/* Share button */}
          <button
            onClick={onShare}
            className="flex items-center justify-center transition-all"
          >
            <PaperPlaneTilt
              size={32}
              weight="fill"
              className="text-white/80 filter drop-shadow-[0_1.5px_0.5px_rgba(0,0,0,0.2)]"
            />
          </button>
          <span className="text-white/80 text-sm font-medium translate-y-1 filter drop-shadow-[0_1px_0.5px_rgba(0,0,0,0.15)]">
            {formatCount(shareCount)}
          </span>
        </div>

        <div className="flex flex-col items-center">
          {/* Save/Repost button */}
          <button
            onClick={onSave}
            className="flex items-center justify-center transition-all"
          >
            <ArrowsClockwise
              size={32}
              weight="fill"
              className="text-white/80 filter drop-shadow-[0_1.5px_0.5px_rgba(0,0,0,0.2)]"
            />
          </button>
          <span className="text-white/80 text-sm font-medium translate-y-1 filter drop-shadow-[0_1px_0.5px_rgba(0,0,0,0.15)]">
            {formatCount(saveCount)}
          </span>
        </div>

        <div className="flex flex-col items-center">
          {/* More options button */}
          <button
            onClick={handleMoreClick}
            className="flex items-center justify-center transition-all"
          >
            <DotsThreeOutlineVertical
              size={24}
              weight="fill"
              className="text-white/80 filter drop-shadow-[0_1.5px_0.5px_rgba(0,0,0,0.2)]"
            />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/15 shadow-[0_2px_4px_rgba(0,0,0,0.1)] animate-pulse-subtle">
              <img
                src={albumCover}
                alt="Album Cover"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Comments Bottom Sheet with dynamic content */}
      {commentsOpen && (
        <div className="fixed inset-0 z-50">
          <BottomSheet
            isOpen={commentsOpen}
            onClose={closeComments}
            title={bottomSheetTitle}
            height="70vh"
            showHandle={true}
            showBackdrop={false}
            customCloseButton={customCloseButton}
          >
            {currentView === "comments" ? (
              <CommentsList
                postId={reelId}
                comments={comments || []}
                onViewReplies={handleViewReplies}
              />
            ) : selectedComment ? (
              <ReplyList
                comment={selectedComment}
                onReply={(commentId, username) => {
                  // Handle reply to a reply
                  console.log(
                    `Replying to ${username}'s comment: ${commentId}`
                  );
                }}
              />
            ) : null}
          </BottomSheet>
        </div>
      )}

      {/* More Options Bottom Sheet */}
      <BottomSheet
        isOpen={isMoreSheetOpen}
        onClose={handleCloseSheet}
        height="70vh"
      >
        <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
          {/* Follow Button */}
          <div className="py-4 px-4 flex justify-center">
            <button className="w-32 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
              Follow
            </button>
          </div>

          {/* Bottom sheet icons */}
          <button className="flex items-center space-x-3 py-4 px-2">
            <BookmarkSimple size={24} weight="fill" />
            <span className="text-base font-medium">Save</span>
          </button>

          <button className="flex items-center space-x-3 py-4 px-2">
            <Info size={24} weight="fill" />
            <span className="text-base font-medium">
              Why you're seeing this post
            </span>
          </button>

          <button className="flex items-center space-x-3 py-4 px-2">
            <Prohibit size={24} weight="fill" />
            <span className="text-base font-medium">Not interested</span>
          </button>

          <button className="flex items-center space-x-3 py-4 px-2">
            <Info size={24} weight="fill" />
            <span className="text-base font-medium">About this account</span>
          </button>

          <button className="flex items-center space-x-3 py-4 px-2">
            <SpeakerSimpleSlash size={24} weight="fill" />
            <span className="text-base font-medium">Mute</span>
          </button>

          <button className="flex items-center space-x-3 py-4 px-2 text-red-600">
            <Flag size={24} weight="fill" />
            <span className="text-base font-medium">Report</span>
          </button>
        </div>
      </BottomSheet>
    </>
  );
};

export default ReelActionBar;
