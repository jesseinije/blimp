// Notification types
export type NotificationType =
  | "follow"
  | "like"
  | "comment"
  | "mention"
  | "system";

// Message type for private messages
export interface PrivateMessage {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  lastMessage: string;
  timestamp: string;
  isUnread: boolean;
  isOnline?: boolean;
}

// Chat message interface for private chats
export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  media?: {
    type: "image" | "video";
    url: string;
  }[];
}

// Notification interface
export interface Notification {
  id: string;
  type: NotificationType;
  content: string;
  timestamp: string;
  read: boolean;
  actor?: {
    id: string;
    name: string;
    avatar: string;
  };
  targetPost?: {
    id: string;
    preview?: string;
  };
  otherActors?: number; // Number of other people who did the same action
}

// Suggested account interface
export interface SuggestedAccount {
  id: string;
  username: string;
  avatar: string;
  followers: number;
  isVerified?: boolean; // Make this optional with ?
  name?: string; // Make this optional with ?
}
