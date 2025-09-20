import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CaretLeft } from "phosphor-react"; // Add this import for the back button icon
import Post from "../components/feed/Post";
import { getPostById, mockPosts } from "../data/mockData";
import type { Post as PostType } from "../types";
import { PostSkeleton } from "../components/ui/skeletons/PostSkeleton";
import { SkeletonProvider } from "../components/ui/skeletons/SkeletonProvider";
import "react-loading-skeleton/dist/skeleton.css";

const PostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostType | null>(null);
  const [suggestedPosts, setSuggestedPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    if (!postId) {
      setError("Post ID is required");
      setLoading(false);
      return;
    }

    try {
      const foundPost = getPostById(postId);
      if (foundPost) {
        setPost(foundPost);

        // Get random suggested posts (excluding current post)
        const otherPosts = mockPosts.filter((p) => p.id !== postId);
        const randomPosts = [...otherPosts]
          .sort(() => 0.5 - Math.random()) // Simple shuffle
          .slice(0, 3); // Take 3 random posts

        setSuggestedPosts(randomPosts);
      } else {
        setError("Post not found");
      }
    } catch (err) {
      setError("Failed to load post");
      console.error(err);
    }

    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [postId]);

  // Add an effect to ensure layout measurements are accurate
  useEffect(() => {
    if (!loading && post) {
      // Wait a moment for the DOM to fully render before finalizing layout
      const layoutTimer = setTimeout(() => {
        setIsLayoutReady(true);
      }, 100);

      return () => clearTimeout(layoutTimer);
    }
  }, [loading, post]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="bg-white">
        <SkeletonProvider>
          <div className="max-w-2xl mx-auto">
            {/* Header Skeleton */}
            <div className="h-14 flex items-center px-3">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <div className="w-8 mr-4">
                    {/* Back button skeleton */}
                    <div className="w-6 h-6 rounded-full bg-gray-100" />
                  </div>
                  {/* Title skeleton */}
                  <div className="w-16 h-5 bg-gray-100 rounded" />
                </div>
              </div>
            </div>

            {/* Main Post Skeleton */}
            <PostSkeleton />

            {/* Suggested Posts Skeletons */}
            {[...Array(2)].map((_, index) => (
              <PostSkeleton key={index} />
            ))}
          </div>
        </SkeletonProvider>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="text-lg font-medium text-gray-700 mb-4">{error}</div>
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-100 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white relative">
      {/* Header - Copied from Comment page */}
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex items-center h-12 px-3">
          <button
            onClick={handleBack}
            className="mr-6 text-gray-900"
            aria-label="Back"
          >
            <CaretLeft size={24} weight="bold" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Post</h1>
        </div>
      </div>

      {/* Content */}
      <div
        className={`flex-1 overflow-auto ${
          isLayoutReady ? "opacity-100" : "opacity-99"
        }`}
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Main Post content */}
        <div className="max-w-2xl mx-auto">
          <Post post={post} isFirst={true} />

          {/* Suggested Posts Section */}
          {suggestedPosts.length > 0 && (
            <div>
              {suggestedPosts.map((suggestedPost, index) => (
                <Post
                  key={suggestedPost.id}
                  post={suggestedPost}
                  isFirst={index === 0}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
