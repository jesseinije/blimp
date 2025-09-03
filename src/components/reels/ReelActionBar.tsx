import { useState } from "react";
import {
  Heart,
  ArrowsClockwise,
  BookmarkSimple,
  DotsThreeVertical,
  ChatCircle,
  PaperPlaneTilt,
  Info,
  Flag,
  Prohibit,
  SpeakerSimpleSlash,
  CaretLeft,
} from "phosphor-react";
import BottomSheet from "../ui/BottomSheet";
import CommentsList from "../feed/CommentsList";
import ReplyList from "../feed/ReplyList";
import type { Comment as CommentType } from "../../types";
import "./ReelActionBar.css"; // Add this import at the top

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
  comments?: CommentType[];
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
  videoElement: HTMLVideoElement | null; // Add this line
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
}: ReelActionBarProps) => {
  const [isMoreSheetOpen, setIsMoreSheetOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [bottomSheetTitle, setBottomSheetTitle] = useState("Comments");
  const [currentView, setCurrentView] = useState<"comments" | "replies">(
    "comments"
  );
  const [selectedComment, setSelectedComment] = useState<CommentType | null>(
    null
  ); // Changed from Comment to CommentType

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

  const handleViewReplies = (comment: CommentType, title: string) => {
    // Changed from Comment to CommentType
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
        className="p-2 text-gray-900 "
        aria-label="Back to comments"
      >
        <CaretLeft size={32} weight="bold" />
      </button>
    ) : undefined;

  // Add a handler for stopping event propagation
  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  return (
    <>
      <div
        className="absolute right-3 bottom-4 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()} // Stop clicks on the entire action bar
      >
        <div className="flex flex-col items-center">
          {/* Like button */}
          <button
            onClick={(e) => handleActionClick(e, onLike)}
            className="reel-action-button flex items-center justify-center"
            onTouchStart={(e) => e.stopPropagation()} // Add touch event handling
          >
            <Heart
              size={32}
              weight="fill"
              className={`reel-action-icon ${
                isLiked ? "liked text-red-500" : "text-white/90"
              }`}
            />
          </button>
          <span
            className="reel-action-text text-white/90 text-sm font-medium translate-y-0"
            onTouchStart={(e) => e.stopPropagation()} // Add touch event handling
          >
            {formatCount(likeCount)}
          </span>
        </div>

        <div className="flex flex-col items-center">
          {/* Comment button */}
          <button
            onClick={(e) => handleActionClick(e, openComments)}
            className="reel-action-button flex items-center justify-center"
            onTouchStart={(e) => e.stopPropagation()} // Add touch event handling
          >
            <ChatCircle
              size={32}
              weight="fill"
              className="reel-action-icon text-white/90"
            />
          </button>
          <span
            className="reel-action-text text-white/90 text-sm font-medium translate-y-0"
            onTouchStart={(e) => e.stopPropagation()} // Add touch event handling
          >
            {formatCount(commentCount)}
          </span>
        </div>

        <div className="flex flex-col items-center">
          {/* Share button */}
          <button
            onClick={(e) => handleActionClick(e, onShare)}
            className="reel-action-button flex items-center justify-center"
            onTouchStart={(e) => e.stopPropagation()} // Add touch event handling
          >
            <PaperPlaneTilt
              size={32}
              weight="fill"
              className="reel-action-icon text-white/90"
            />
          </button>
          <span
            className="reel-action-text text-white/90 text-sm font-medium translate-y-0"
            onTouchStart={(e) => e.stopPropagation()} // Add touch event handling
          >
            {formatCount(shareCount)}
          </span>
        </div>

        <div className="flex flex-col items-center">
          {/* Save/Repost button */}
          <button
            onClick={(e) => handleActionClick(e, onSave)}
            className="reel-action-button flex items-center justify-center"
            onTouchStart={(e) => e.stopPropagation()} // Add touch event handling
          >
            <ArrowsClockwise
              size={32}
              weight="fill"
              className="reel-action-icon text-white/90"
            />
          </button>
          <span
            className="reel-action-text text-white/90 text-sm font-medium translate-y-0"
            onTouchStart={(e) => e.stopPropagation()} // Add touch event handling
          >
            {formatCount(saveCount)}
          </span>
        </div>

        <div className="flex flex-col items-center">
          {/* More options button */}
          <button
            onClick={(e) => handleActionClick(e, handleMoreClick)}
            className="reel-action-button flex items-center justify-center"
            onTouchStart={(e) => e.stopPropagation()} // Add touch event handling
          >
            <DotsThreeVertical
              size={32}
              weight="bold"
              className="reel-action-icon text-white/90"
            />
          </button>
        </div>

        <div
          className="flex flex-col items-center"
          onTouchStart={(e) => e.stopPropagation()} // Add touch event handling
        >
          <div className="flex items-center justify-center">
            <div className="reel-album-cover w-8 h-8 rounded-full overflow-hidden border border-white/15 animate-pulse-subtle">
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
        <div className="flex flex-col divide-y divide-gray-200 ">
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
