import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CaretLeft, CaretDown } from "phosphor-react";
import Post from "../components/feed/Post";
import Comment from "../components/feed/Comment";
import { useAppStore } from "../store/appStore";
import type { Post as PostType, Comment as CommentType } from "../types";
import { PostSkeleton } from "../components/ui/skeletons/PostSkeleton";
import { SkeletonProvider } from "../components/ui/skeletons/SkeletonProvider";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CommentPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { posts, currentUser } = useAppStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const [commentText, setCommentText] = useState("");
  const [replyTo, setReplyTo] = useState<{
    id: string;
    username: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  // Track expanded comments to show/hide replies
  const [expandedComments, setExpandedComments] = useState<Set<string>>(
    new Set()
  );

  // Find the selected post when the component mounts or postId changes
  useEffect(() => {
    if (postId) {
      // Simulate network request delay
      const timer = setTimeout(() => {
        const post = posts.find((post) => post.id === postId);
        if (post) {
          setSelectedPost(post);
        } else {
          // If post not found, navigate back
          navigate(-1);
        }
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [postId, posts, navigate]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleSubmitComment = () => {
    if (commentText.trim() === "") return;

    // In a real app, you'd add the comment to the post
    console.log("Adding comment:", {
      postId,
      text: commentText,
      replyTo: replyTo?.id,
    });

    // Clear the input and reset reply state
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

  const handleBack = () => {
    navigate(-1);
  };

  // Comment Skeleton Component (inline for simplicity)
  const CommentSkeleton = () => {
    return (
      <div className="flex mb-4">
        {/* Comment avatar */}
        <Skeleton circle width={32} height={32} className="mr-3" />

        <div className="flex-1">
          <div className="flex items-start">
            <div className="flex-1">
              {/* Username and timestamp */}
              <div className="flex items-center">
                <Skeleton width={80} height={16} className="mr-2" />
                <Skeleton width={40} height={12} />
              </div>

              {/* Comment text */}
              <div className="mt-1">
                <Skeleton width="95%" height={16} />
                <Skeleton width="60%" height={16} />
              </div>

              {/* Actions row */}
              <div className="mt-2 flex items-center space-x-4">
                <Skeleton width={40} height={14} />
                <Skeleton width={40} height={14} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white flex flex-col h-screen">
        <SkeletonProvider>
          {/* Header Skeleton */}
          <div className="sticky top-0 z-10 bg-white">
            <div className="flex items-center h-12 px-3">
              <div className="flex items-center">
                <div className="mr-6">
                  {/* Back button skeleton */}
                  <Skeleton circle width={24} height={24} />
                </div>
                {/* Title skeleton */}
                <Skeleton width={80} height={20} />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto pb-24">
            {/* Post Skeleton */}
            <div className="border-b border-gray-200">
              <PostSkeleton />
            </div>

            {/* Filter option row skeleton */}
            <div className="border-b border-gray-200 p-3">
              <div className="flex justify-start">
                <Skeleton width={40} height={16} />
              </div>
            </div>

            {/* Comments skeletons */}
            <div className="p-3">
              {[...Array(5)].map((_, index) => (
                <CommentSkeleton key={index} />
              ))}
            </div>
          </div>

          {/* Comment input area skeleton */}
          <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
            <div className="p-3">
              <div className="flex items-center">
                <Skeleton circle width={32} height={32} className="mr-3" />
                <Skeleton width="100%" height={24} />
              </div>
            </div>
          </div>
        </SkeletonProvider>
      </div>
    );
  }

  if (!selectedPost) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Custom render function for comments with replies
  const renderComments = (comments: CommentType[]) => {
    return comments.map((comment) => (
      <div key={comment.id} className="mb-4">
        <Comment
          comment={comment}
          onReply={handleReply}
          onViewReplies={() => toggleReplies(comment.id)}
          showRepliesButton={(comment.replies?.length || 0) > 0}
          isExpanded={expandedComments.has(comment.id)}
        />

        {/* Show replies if expanded */}
        {expandedComments.has(comment.id) &&
          comment.replies &&
          comment.replies.length > 0 && (
            <div className="ml-11">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="mt-2">
                  <Comment comment={reply} onReply={handleReply} />
                </div>
              ))}
            </div>
          )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col h-screen bg-white relative">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex items-center h-12 px-3">
          <button
            onClick={handleBack}
            className="mr-6 text-gray-900"
            aria-label="Back"
          >
            <CaretLeft size={24} weight="bold" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Comments</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 overflow-auto pb-24">
        <div className="border-b border-gray-200">
          <Post post={selectedPost} />
        </div>

        {/* Filter option row */}
        <div className="border-b border-gray-200 p-3">
          <button
            className="flex items-center text-sm font-medium text-gray-900"
            aria-label="Filter comments"
          >
            Top
            <CaretDown size={16} weight="bold" className="ml-1 text-gray-400" />
          </button>
        </div>

        {/* Comments section */}
        <div className="flex-1 p-3">
          {selectedPost.comments.length > 0 ? (
            renderComments(selectedPost.comments)
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
              <p className="text-lg font-medium">No comments yet</p>
              <p className="text-sm">Be the first to comment on this post!</p>
            </div>
          )}
        </div>

        {/* Comment input area - fixed at the bottom */}
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
                <button onClick={cancelReply} className="text-gray-400 text-sm">
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
      </div>
    </div>
  );
};

export default CommentPage;
