import { create } from "zustand";
import type { Post, User, Story } from "../types";
import {
  getUserById,
  mockUsers,
  mockStories,
  getPostsForFeed, // Import the new helper function
  getReelsForFeed, // Import the new helper function
} from "../data/mockData";

// Preprocess posts to ensure each one has user data
const processPosts = (rawPosts: Post[]): Post[] => {
  return rawPosts.map((post) => {
    const user = getUserById(post.userId);
    // If the post already has a user property, keep it, otherwise create one
    if (post.user) {
      return post;
    }

    return {
      ...post,
      user: {
        id: user?.id || post.userId,
        username: user?.username || "unknown",
        avatar: user?.avatar || "https://i.pravatar.cc/150?img=0",
        isFollowing: Math.random() > 0.5, // Random following state for demo
        isVerified: user?.isVerified || false,
      },
    };
  });
};

// Get the posts for the feed and reels using our new helper functions
const mockPosts: Post[] = processPosts(getPostsForFeed());
const mockReels: Post[] = processPosts(getReelsForFeed());

// Feed filter types
export type FeedFilterType = "for-you" | "following" | "live";

interface AppState {
  // User state
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;

  // Posts state
  posts: Post[];
  reels: Post[]; // Add a separate reels array
  setPosts: (posts: Post[]) => void;
  setReels: (reels: Post[]) => void; // Add setter for reels
  addPost: (post: Post) => void;
  likePost: (postId: string) => void;
  savePost: (postId: string) => void;

  // Stories state
  stories: Story[];
  setStories: (stories: Story[]) => void;
  markStoryAsSeen: (storyId: string) => void;

  // UI state
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isAddPostModalOpen: boolean;
  setAddPostModalOpen: (isOpen: boolean) => void;

  // Content filter state
  activeTab: "posts" | "videos";
  setActiveTab: (tab: "posts" | "videos") => void;

  // Feed filters state
  postsFilter: FeedFilterType;
  setPostsFilter: (filter: FeedFilterType) => void;
  videosFilter: FeedFilterType;
  setVideosFilter: (filter: FeedFilterType) => void;

  // Add these new properties
  isVideoPage: boolean;
  setIsVideoPage: (isVideoPage: boolean) => void;
  restoreReels: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initialize with mock data
  currentUser: mockUsers[0],
  posts: mockPosts,
  reels: mockReels, // Initialize reels array
  stories: mockStories,

  // User actions
  setCurrentUser: (user) => set({ currentUser: user }),

  // Post actions
  setPosts: (posts) => set({ posts }),
  setReels: (reels) => set({ reels }), // Add setter for reels
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  likePost: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      ),
      reels: state.reels.map((reel) =>
        reel.id === postId
          ? {
              ...reel,
              liked: !reel.liked,
              likes: reel.liked ? reel.likes - 1 : reel.likes + 1,
            }
          : reel
      ),
    })),
  savePost: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, saved: !post.saved } : post
      ),
      reels: state.reels.map((reel) =>
        reel.id === postId ? { ...reel, saved: !reel.saved } : reel
      ),
    })),

  // Stories actions
  setStories: (stories) => set({ stories }),
  markStoryAsSeen: (storyId) =>
    set((state) => ({
      stories: state.stories.map((story) =>
        story.id === storyId ? { ...story, seen: true } : story
      ),
    })),

  // UI state actions
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  isAddPostModalOpen: false,
  setAddPostModalOpen: (isOpen) => set({ isAddPostModalOpen: isOpen }),

  // Content filter state
  activeTab: "posts",
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Feed filters actions
  postsFilter: "for-you",
  setPostsFilter: (filter) => set({ postsFilter: filter }),
  videosFilter: "for-you",
  setVideosFilter: (filter) => set({ videosFilter: filter }),

  // Add these new implementations
  isVideoPage: false,
  setIsVideoPage: (isVideoPage: boolean) => set({ isVideoPage }),

  // Store the original reels separately for restoration
  restoreReels: () =>
    set(() => ({
      reels: processPosts(getReelsForFeed()),
    })),
}));
