export type User = {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  isVerified?: boolean;
  follow?: boolean; // <-- Add this line
  story?: boolean; // <-- Add this line
  link?: string; // <-- Add this line
  isRead?: boolean; // <-- Add this line
};

export type Comment = {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
  likes: number;
  replies?: Comment[]; // Add this field for nested comments/replies
};

export type MediaItem = {
  id: string;
  url: string;
  type: "image" | "video";
  views?: number;
};

export type MusicInfo = {
  url: string;
  title: string;
  artist?: string;
  albumArt?: string;
};

export type Post = {
  id: string;
  userId: string;
  caption: string;
  media: MediaItem[];
  likes: number;
  comments: Comment[];
  repostsCount?: number;
  sharesCount?: number;
  savesCount?: number;
  createdAt: string;
  location?: string;
  tags?: string[];
  saved?: boolean;
  liked?: boolean;
  isLive?: boolean;
  music?: {
    // Add this field
    title: string;
    artist: string;
    url: string;
  };
  views?: number;
  isReelOnly?: boolean;
  user: {
    id: string;
    username: string;
    avatar: string;
    isFollowing: boolean;
    isVerified?: boolean;
  };
  sponsored?: {
    buttonText: string;
    buttonUrl: string;
  };
  pinned?: boolean; // <-- Add this line
};

export type Story = {
  id: string;
  userId: string;
  mediaUrl: string;
  createdAt: string;
  seen: boolean;
};

export type Notification = {
  id: string;
  type: "like" | "comment" | "follow" | "mention";
  fromUserId: string;
  toUserId: string;
  postId?: string;
  commentId?: string;
  read: boolean;
  createdAt: string;
};
