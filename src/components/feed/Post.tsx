import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  ArrowsClockwise,
  DotsThreeVertical,
  CaretLeft,
  BookmarkSimple,
  ChatCircle,
  PaperPlaneTilt,
  CheckCircle,
} from "@phosphor-icons/react";
// Remove FontAwesome imports as they're no longer needed
import { useAppStore } from "../../store/appStore";
import { getUserById } from "../../data/mockData";
import type { Post as PostType, Comment as CommentType } from "../../types";
import Caption from "../ui/Caption";
import MediaCarousel from "../ui/MediaCarousel";
import BottomSheet from "../ui/BottomSheet";
import CommentsList from "./CommentsList";
import ReplyList from "./ReplyList";
import MusicOverlay from "./MusicOverlay";

interface PostProps {
  post: PostType;
  isFirst?: boolean;
}

function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return count.toString();
}

// First, add this helper function near the top of the file (after the imports)
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

const Post = ({ post, isFirst = false }: PostProps) => {
  const { likePost, savePost } = useAppStore();
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [bottomSheetTitle, setBottomSheetTitle] = useState("Comments");
  const [currentView, setCurrentView] = useState<"comments" | "replies">(
    "comments"
  );
  const [selectedComment, setSelectedComment] = useState<CommentType | null>(
    null
  );
  const [isInView, setIsInView] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false); // Add this with your other state declarations
  const postRef = useRef<HTMLDivElement>(null);
  const musicOverlayRef = useRef<{
    handleMusicClick: (e: React.MouseEvent) => void;
    isPlaying: boolean;
  }>(null);

  const user = getUserById(post.userId);

  if (!user) return null;

  // Setup Intersection Observer to detect when post is in view
  useEffect(() => {
    if (!postRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);

        // Autoplay music when post comes into view
        if (entry.isIntersecting && post.music && musicOverlayRef.current) {
          musicOverlayRef.current.handleMusicClick(new MouseEvent("click"));
        }
      },
      {
        threshold: 0.5, // Consider in view when 50% visible
      }
    );

    observer.observe(postRef.current);

    return () => {
      if (postRef.current) {
        observer.unobserve(postRef.current);
      }
    };
  }, [post.music]); // Add post.music as dependency

  // Sync with the musicOverlayRef's playing state
  useEffect(() => {
    const interval = setInterval(() => {
      if (musicOverlayRef.current) {
        setIsMusicPlaying(musicOverlayRef.current.isPlaying);
      }
    }, 100); // Check frequently enough to keep UI in sync

    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    likePost(post.id);
  };

  const handleSave = () => {
    savePost(post.id);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const openComments = () => {
    setBottomSheetTitle("Comments");
    setCurrentView("comments");
    setCommentsOpen(true);
  };

  const closeComments = () => {
    setCommentsOpen(false);
    // Reset the view state when closing
    setTimeout(() => {
      setCurrentView("comments");
      setBottomSheetTitle("Comments");
      setSelectedComment(null);
    }, 300); // Wait for the close animation to finish
  };

  const handleViewReplies = (comment: CommentType, title: string) => {
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
        className="inline-flex justify-center rounded-full p-1.5 text-gray-900 dark:hover:bg-gray-700 focus:outline-none"
        aria-label="Back"
      >
        <CaretLeft size={24} />
        <span className="sr-only">Back</span>
      </button>
    ) : undefined;

  return (
    <div
      ref={postRef}
      className="bg-white dark:bg-gray-800 mb-0 overflow-hidden dark:border-gray-700"
    >
      {/* Post header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-2">
          <Link to={`/profile/${user.username}`} className="flex-shrink-0">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-10 h-10 rounded-full object-cover"
            />
          </Link>
          <div>
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm flex items-center text-gray-900 dark:text-white">
                <Link to={`/profile/${user.username}`}>{user.username}</Link>
                {user.isVerified && (
                  <span className="ml-1">
                    <CheckCircle
                      size={16}
                      weight="fill"
                      className="text-blue-500"
                    />
                  </span>
                )}
              </p>
            </div>
            {/* Location and Music overlay section */}
            {post.location && (
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center h-5">
                <span className="inline-flex items-center h-full">
                  {post.music ? (
                    <MusicOverlay
                      ref={musicOverlayRef}
                      musicUrl={post.music.url}
                      musicTitle={`${post.music.title} - ${post.music.artist}`}
                      location={post.location}
                      isVisible={true}
                      inView={isInView}
                      maxWidth="170px"
                    />
                  ) : (
                    // Just show location if no music
                    <span>{post.location}</span>
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {/* Add the Follow button - only show for some posts */}
          {user.id !== "1" && !isFollowing && (
            <button
              onClick={handleFollow}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded-md"
            >
              Follow
            </button>
          )}
          {/* More button with vertical dots */}
          <button className="text-gray-500 dark:text-gray-400">
            <DotsThreeVertical size={24} />
          </button>
        </div>
      </div>

      {/* Post media */}
      <div>
        <MediaCarousel
          media={post.media}
          musicControl={
            post.music
              ? {
                  isPlaying: isMusicPlaying,
                  onTogglePlay: (e) => {
                    if (musicOverlayRef.current) {
                      musicOverlayRef.current.handleMusicClick(e);
                      setIsMusicPlaying(!isMusicPlaying);
                    }
                  },
                }
              : undefined
          }
        />
      </div>

      {/* Post actions */}
      <div className="p-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex space-x-4">
            <div className="flex items-center">
              <button
                onClick={handleLike}
                className="mr-1 text-gray-900 dark:text-white"
              >
                {post.liked ? (
                  <Heart size={24} weight="fill" className="text-red-500" />
                ) : (
                  <Heart size={24} />
                )}
              </button>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {formatCount(post.likes)}
              </span>
            </div>

            <div className="flex items-center">
              <button
                onClick={openComments}
                className="mr-1 text-gray-900 dark:text-white"
              >
                <ChatCircle size={24} />
              </button>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {formatCount(post.comments?.length || 0)}
              </span>
            </div>

            <div className="flex items-center">
              <button className="mr-1 text-gray-900 dark:text-white">
                <ArrowsClockwise size={24} />
              </button>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {formatCount(post.repostsCount || 0)}
              </span>
            </div>

            <div className="flex items-center">
              <button className="mr-1 text-gray-900 dark:text-white">
                <PaperPlaneTilt size={24} />
              </button>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {formatCount(post.sharesCount || 0)}
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={handleSave}
              className="text-gray-900 dark:text-white"
            >
              {post.saved ? (
                <BookmarkSimple size={24} weight="fill" />
              ) : (
                <BookmarkSimple size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Caption */}
        {post.caption && <Caption text={post.caption} className="mt-2" />}
        {/* Timestamp below caption */}
        <span className="text-xs text-gray-500 dark:text-gray-400 block mt-1">
          {getRelativeTime(post.createdAt)}
        </span>
      </div>

      {/* Comments Bottom Sheet with dynamic content */}
      <BottomSheet
        isOpen={commentsOpen}
        onClose={closeComments}
        title={bottomSheetTitle}
        height="full"
        showHandle={true}
        customCloseButton={customCloseButton}
      >
        {currentView === "comments" ? (
          <CommentsList
            postId={post.id}
            comments={post.comments || []}
            onViewReplies={handleViewReplies}
          />
        ) : selectedComment ? (
          <ReplyList
            comment={selectedComment}
            onReply={(commentId, username) => {
              // Handle reply to a reply
              console.log(`Replying to ${username}'s comment: ${commentId}`);
            }}
          />
        ) : null}
      </BottomSheet>
    </div>
  );
};

export default Post;
