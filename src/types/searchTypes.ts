// Search history types
export type SearchHistoryItem = {
  id: string;
  query: string;
  timestamp: string;
};

// Suggested search types
export type SuggestedSearchItem = {
  id: string;
  query: string;
  postCount?: number;
  imageUrl?: string;
};

// Trending topics types
export type TrendingTopic = {
  id: string;
  topic: string;
  postCount: number;
  location: string;
  imageUrl?: string;
};
