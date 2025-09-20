import { useState, useRef } from "react";
import {
  Heart,
  BookmarkSimple,
  DotsThreeVertical,
  ChatCircle,
  Info,
  Flag,
  Prohibit,
  SpeakerSimpleSlash,
} from "phosphor-react";
import BottomSheet from "../ui/BottomSheet";
import { Repost, ShareFat } from "../../Icons";
import Comment from "../feed/Comment"; // Import the Comment component
import type { Comment as CommentType } from "../../types";
import "./ReelActionBar.css"; // Add this import at the top
import { useAppStore } from "../../store/appStore"; // Import if not already

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
  const { currentUser } = useAppStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [commentText, setCommentText] = useState("");
  const [replyTo, setReplyTo] = useState<{
    id: string;
    username: string;
  } | null>(null);
  const [isMoreSheetOpen, setIsMoreSheetOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [bottomSheetTitle, setBottomSheetTitle] = useState("Comments");
  const [, setCurrentView] = useState<"comments" | "replies">("comments");
  const [, setSelectedComment] = useState<CommentType | null>(null); // Changed from Comment to CommentType
  const [expandedComments, setExpandedComments] = useState<Set<string>>(
    new Set()
  );

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

  const toggleReplies = (commentId: string) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  // Add a handler for stopping event propagation
  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      e.nativeEvent &&
      typeof e.nativeEvent.stopImmediatePropagation === "function"
    ) {
      e.nativeEvent.stopImmediatePropagation();
    }
    // Add this line to mark the event as handled for Reel component
    Object.defineProperty(e.nativeEvent, "_reelActionHandled", { value: true });
    action();
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleSubmitComment = () => {
    if (commentText.trim() === "") return;
    // Add your comment logic here
    console.log("Adding comment:", {
      reelId,
      text: commentText,
      replyTo: replyTo?.id,
    });
    setCommentText("");
    setReplyTo(null);
  };

  const handleReply = (commentId: string, username: string) => {
    setReplyTo({ id: commentId, username });
    if (inputRef.current) {
      inputRef.current.focus();
      setCommentText(`@${username} `);
    }
  };

  const cancelReply = () => {
    setReplyTo(null);
    setCommentText("");
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
            <ShareFat
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
            <Repost
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
          >
            <div style={{ marginBottom: "80px" }}>
              {comments.map((comment) => (
                <div key={comment.id} className="mb-4">
                  <Comment
                    comment={comment}
                    onReply={handleReply}
                    onViewReplies={() => toggleReplies(comment.id)}
                    showRepliesButton={(comment.replies?.length || 0) > 0}
                    isExpanded={expandedComments.has(comment.id)}
                  />
                  {expandedComments.has(comment.id) &&
                    comment.replies &&
                    comment.replies.length > 0 && (
                      <div className="ml-11">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="mt-2">
                            <Comment comment={reply} onReply={() => {}} />
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>

            {/* Comment input area */}
            <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
              <div className="p-3">
                {replyTo && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">
                      Replying to{" "}
                      <span className="font-medium text-gray-900">
                        @{replyTo.username}
                      </span>
                    </span>
                    <button
                      onClick={cancelReply}
                      className="text-gray-400 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                )}
                <div className="flex items-center">
                  {currentUser && (
                    <img
                      src="https://res.cloudinary.com/dopnzcfxj/image/upload/v1757510419/default_dalfcc.jpg"
                      alt={currentUser.username}
                      className="w-8 h-8 rounded-full mr-3 object-cover"
                    />
                  )}
                  <div className="flex-1 flex items-center">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 text-sm py-1 px-0 border-none bg-transparent placeholder-gray-400 focus:outline-none"
                      value={commentText}
                      onChange={handleCommentChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSubmitComment();
                        }
                      }}
                    />
                    <button
                      onClick={handleSubmitComment}
                      disabled={commentText.trim() === ""}
                      className={`ml-2 ${
                        commentText.trim() === ""
                          ? "text-blue-200 "
                          : "text-blue-500"
                      }`}
                    >
                      <span className="font-semibold text-sm">Post</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
