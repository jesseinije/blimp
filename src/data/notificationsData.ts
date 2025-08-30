import type { PrivateMessage, Notification } from "../types/notificationTypes";

// Sample private messages data
export const mockPrivateMessages: PrivateMessage[] = [
  {
    id: "1",
    sender: {
      id: "101",
      name: "Alex Johnson",
      avatar: "/src/assets/images/testPhoto1.webp",
    },
    lastMessage: "Hey, how are you doing?",
    timestamp: "2h ago",
    isUnread: true,
    isOnline: true,
  },
  {
    id: "2",
    sender: {
      id: "102",
      name: "Sam Williams",
      avatar: "/src/assets/images/testPhoto1.webp",
    },
    lastMessage: "Did you see my latest post?",
    timestamp: "5h ago",
    isUnread: false,
  },
  {
    id: "3",
    sender: {
      id: "103",
      name: "Jamie Lee",
      avatar: "/src/assets/images/testPhoto1.webp",
    },
    lastMessage: "I'll send you the details later",
    timestamp: "1d ago",
    isUnread: false,
  },
  {
    id: "4",
    sender: {
      id: "104",
      name: "Taylor Smith",
      avatar: "/src/assets/images/testPhoto1.webp",
    },
    lastMessage: "Let's meet up this weekend!",
    timestamp: "2d ago",
    isUnread: true,
  },
];

// Sample notifications data with improved structure
export const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "follow",
    content: "started following you",
    timestamp: "2h ago",
    read: false,
    actor: {
      id: "201",
      name: "Emma Wilson",
      avatar: "/src/assets/images/testPhoto1.webp",
    },
  },
  {
    id: "2",
    type: "like",
    content: "liked your post",
    timestamp: "5h ago",
    read: true,
    actor: {
      id: "202",
      name: "John Davis",
      avatar: "/src/assets/images/testPhoto1.webp",
    },
    targetPost: {
      id: "301",
      preview: "My weekend adventure...",
    },
    otherActors: 5,
  },
  {
    id: "3",
    type: "comment",
    content: "commented on your post",
    timestamp: "1d ago",
    read: false,
    actor: {
      id: "203",
      name: "Sarah Parker",
      avatar: "/src/assets/images/testPhoto1.webp",
    },
    targetPost: {
      id: "302",
      preview: "That looks amazing!",
    },
  },
  {
    id: "4",
    type: "mention",
    content: "mentioned you in a comment",
    timestamp: "2d ago",
    read: true,
    actor: {
      id: "204",
      name: "Mike Chang",
      avatar: "/src/assets/images/testPhoto1.webp",
    },
    targetPost: {
      id: "303",
      preview: "@username check this out!",
    },
  },
  {
    id: "5",
    type: "system",
    content: "Your post is trending in your area!",
    timestamp: "3d ago",
    read: false,
  },
  {
    id: "6",
    type: "system",
    content: "Weekly summary: Your profile had 215 views",
    timestamp: "1w ago",
    read: true,
  },
];
