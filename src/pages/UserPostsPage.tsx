import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Post from "../components/feed/Post";
import { getPostsByUserId, mockUsers } from "../data/mockData";
import type { Post as PostType } from "../types";
import PageHeader from "../components/layout/PageHeader";
import { PostSkeleton } from "../components/ui/skeletons/PostSkeleton";
import { SkeletonProvider } from "../components/ui/skeletons/SkeletonProvider";
import "react-loading-skeleton/dist/skeleton.css";

const UserPostsPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (!userId) {
      setError("User ID is required");
      setLoading(false);
      return;
    }

    try {
      // Get user's posts
      const userPosts = getPostsByUserId(userId);
      setPosts(userPosts);

      // Get user's display name
      const user = mockUsers.find((u) => u.id === userId);
      if (user) {
        setUsername(user.displayName || user.username || "");
      } else {
        setError("User not found");
      }
    } catch (err) {
      setError("Failed to load user posts");
      console.error(err);
    }

    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [userId]);

  // Add an effect to ensure layout measurements are accurate
  useEffect(() => {
    if (!loading && posts.length > 0) {
      // Wait a moment for the DOM to fully render before finalizing layout
      const layoutTimer = setTimeout(() => {
        setIsLayoutReady(true);
      }, 100);

      return () => clearTimeout(layoutTimer);
    }
  }, [loading, posts]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="bg-white">
        <SkeletonProvider>
          <div className="max-w-2xl mx-auto">
            {/* Header Skeleton */}
            <div className="h-14 border-b flex items-center px-4">
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

            {/* Posts Skeletons */}
            {[...Array(3)].map((_, index) => (
              <PostSkeleton key={index} />
            ))}
          </div>
        </SkeletonProvider>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="text-lg font-medium text-gray-700 mb-4">{error}</div>
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-gray-100 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto bg-white min-h-screen">
        <PageHeader
          title={username ? `${username}'s Posts` : "User Posts"}
          showBackButton={true}
          onBackClick={handleGoBack}
          rightIcon="none"
          showBorder={false}
          enableScroll={true}
        />
        <div className="flex flex-col items-center justify-center h-64">
          <div className="text-lg font-medium text-gray-700 mb-4">
            No posts found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`max-w-2xl mx-auto bg-white min-h-screen mb-20 ${
        isLayoutReady ? "transition-all duration-150" : ""
      }`}
      style={{ scrollBehavior: "smooth" }}
    >
      <PageHeader
        title="Posts"
        showBackButton={true}
        onBackClick={handleGoBack}
        rightIcon="none"
        showBorder={false}
        enableScroll={true}
      />

      {/* Add a spacer div with consistent height to prevent content jumping */}
      <div className="h-14" />

      {/* User Posts content */}
      <div className={isLayoutReady ? "opacity-100" : "opacity-99"}>
        {posts.map((post, index) => (
          <Post key={post.id} post={post} isFirst={index === 0} />
        ))}
      </div>
    </div>
  );
};

export default UserPostsPage;
