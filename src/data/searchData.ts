import type {
  SearchHistoryItem,
  SuggestedSearchItem,
  TrendingTopic,
} from "../types/searchTypes";

// Mock search history
export const mockSearchHistory: SearchHistoryItem[] = [
  { id: "1", query: "mexico living in USA", timestamp: "2025-08-17T15:30:00Z" },
  { id: "2", query: "£500 Loan UK", timestamp: "2025-08-17T12:15:00Z" },
  {
    id: "3",
    query: "HRH Christiaan van der Merwe",
    timestamp: "2025-08-16T18:45:00Z",
  },
];

// Mock suggested searches
export const mockSuggestedSearches: SuggestedSearchItem[] = [
  {
    id: "1",
    query: "Dating a widow",
    imageUrl: "https://i.pravatar.cc/150?img=1",
    postCount: 2500,
  },
  { id: "2", query: "invest $500 monthly", postCount: 1840 },
  { id: "3", query: "get up to £500 to £50000 loan", postCount: 950 },
  {
    id: "4",
    query: "Mexico in USA",
    imageUrl: "https://i.pravatar.cc/150?img=2",
    postCount: 3620,
  },
  { id: "5", query: "canada poultry farmers", postCount: 120 },
  {
    id: "6",
    query: "Living In Canada",
    imageUrl: "https://i.pravatar.cc/150?img=3",
    postCount: 8450,
  },
  {
    id: "7",
    query: "Australia In Europe",
    imageUrl: "https://i.pravatar.cc/150?img=4",
    postCount: 1250,
  },
  {
    id: "8",
    query: "UK London",
    imageUrl: "https://i.pravatar.cc/150?img=5",
    postCount: 5780,
  },
  {
    id: "9",
    query: "Good Morning USA",
    imageUrl: "https://i.pravatar.cc/150?img=6",
    postCount: 4320,
  },
  {
    id: "10",
    query: "Pay My Bills",
    imageUrl: "https://i.pravatar.cc/150?img=7",
    postCount: 980,
  },
];

// Mock trending topics
export const mockTrendingTopics: TrendingTopic[] = [
  { id: "1", topic: "GehGeh", postCount: 7790, location: "Nigeria" },
  {
    id: "2",
    topic: "Research Methodology",
    postCount: 1062,
    location: "Nigeria",
  },
  { id: "3", topic: "Inspect", postCount: 40400, location: "Nigeria" },
  { id: "4", topic: "#BBNaijaS10", postCount: 67900, location: "Nigeria" },
  { id: "5", topic: "Funke Akindele", postCount: 15600, location: "Nigeria" },
];
