import { useAppStore } from "../../store/appStore";
import Post from "./Post";
import Stories from "./Stories";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { PostSkeleton } from "../ui/skeletons/PostSkeleton";
import { StoriesSkeleton } from "../ui/skeletons/StoriesSkeleton";
import { SkeletonProvider } from "../ui/skeletons/SkeletonProvider";
import "react-loading-skeleton/dist/skeleton.css"; // Add this import

const Feed = () => {
  const { posts, postsFilter } = useAppStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state like in ProfilePage
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Using 500ms like in ProfilePage
    return () => clearTimeout(timer);
  }, []);

  // Filter posts based on selected filter
  const filteredPosts = posts.filter((post) => {
    if (postsFilter === "following") {
      return post.user?.isFollowing || false;
    } else if (postsFilter === "live") {
      return post.isLive || false;
    }
    return true;
  });

  // Match the exact structure used in ProfilePage for loading state
  if (isLoading) {
    return (
      <div className="bg-white">
        <SkeletonProvider>
          <div className="max-w-md mx-auto pb-16">
            <StoriesSkeleton />
            {[...Array(3)].map((_, index) => (
              <PostSkeleton key={index} />
            ))}
          </div>
        </SkeletonProvider>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-md mx-auto pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Stories row at the top */}
      <Stories />

      {/* Posts feed with smooth scrolling and hidden scrollbar */}
      <div
        ref={scrollRef}
        className="overflow-auto scroll-smooth scrollbar-hide"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <style>
          {`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {filteredPosts.length > 0 ? (
          <div>
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
              >
                <Post post={post} isFirst={index === 0} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-500 dark:text-gray-400">
              {postsFilter === "following"
                ? "Follow some users to see their posts here."
                : postsFilter === "live"
                ? "No live posts available right now."
                : "No posts available."}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Feed;
