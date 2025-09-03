import type { User, Post, Comment } from "../types";

export const userData: User[] = [
  {
    id: "8",
    username: "taylor_swift",
    displayName: "Taylor Swift",
    avatar: "https://i.pravatar.cc/150?img=10",
    bio: "Singer-songwriter | Artist of the Decade",
    followers: 4800000,
    following: 89,
    isVerified: true,
  },
  {
    id: "9",
    username: "elon_musk",
    displayName: "Elon Musk",
    avatar: "https://i.pravatar.cc/150?img=11",
    bio: "CEO of X, Tesla, and SpaceX",
    followers: 5600000,
    following: 103,
    isVerified: true,
  },
  {
    id: "10",
    username: "nba",
    displayName: "NBA",
    avatar: "/assets/images/nba.jpg",
    bio: "Official account of the National Basketball Association",
    followers: 3200000,
    following: 245,
    isVerified: true,
  },
  {
    id: "11",
    username: "kim_winnifred",
    displayName: "Kim Winnifred",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1756772400/kim_ndqevm.jpg",
    bio: "Digital Media Specialist",
    followers: 1200000,
    following: 245,
    isVerified: true,
  },
  {
    id: "12",
    username: "realbbymula",
    displayName: "MULA🍒",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1756774159/user2_j2fe7v.jpg",
    bio: "Digital Media Specialist",
    followers: 1200000,
    following: 245,
    isVerified: true,
  },
  {
    id: "13",
    username: "casie",
    displayName: "Casie",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1756814016/casie_wgoset.jpg",
    bio: "Dancer",
    followers: 4200000,
    following: 205,
    isVerified: true,
  },
];

// Comments for the new posts
export const userComments: Record<string, Comment[]> = {
  "12": [
    {
      id: "c20",
      userId: "2",
      text: "Can't wait for the concert! 💕",
      createdAt: "2025-08-29T15:30:00Z",
      likes: 25678,
      replies: [
        {
          id: "c20r1",
          userId: "8",
          text: "See you there! 🎸✨",
          createdAt: "2025-08-29T16:00:00Z",
          likes: 12345,
        },
      ],
    },
  ],
  "13": [
    {
      id: "c21",
      userId: "3",
      text: "The future is electric! 🚗⚡",
      createdAt: "2025-08-29T14:00:00Z",
      likes: 15432,
      replies: [],
    },
  ],
  "14": [
    {
      id: "c22",
      userId: "1",
      text: "What a game! 🏀🔥",
      createdAt: "2025-08-29T10:00:00Z",
      likes: 8765,
      replies: [
        {
          id: "c22r1",
          userId: "10",
          text: "Historic moment for basketball!",
          createdAt: "2025-08-29T10:30:00Z",
          likes: 5432,
        },
      ],
    },
  ],
};

// Helper function to create user info object for posts
const createUserInfo = (
  userId: string
): {
  id: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
  isVerified?: boolean;
} => {
  const user = userData.find((u) => u.id === userId);
  return {
    id: userId,
    username: user?.username || "",
    avatar: user?.avatar || "",
    isFollowing: Math.random() > 0.5,
    isVerified: user?.isVerified,
  };
};

export const userPosts: Post[] = [
  {
    id: "21",
    userId: "13",
    caption: "Killing every single move🥰",
    media: [
      {
        id: "12-2",
        url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1756816214/casie_dldsoh.mp4",
        type: "video",
      },
    ],
    likes: 2900000,
    comments: userComments["12"],
    createdAt: "2025-08-29T15:00:00Z",
    location: "New York City",
    tags: ["ErasTour", "TaylorSwift", "Swifties"],
    saved: false,
    liked: false,
    user: createUserInfo("13"),
    views: 5000000,
  },
  {
    id: "12",
    userId: "8",
    caption:
      "Just announced! New dates added to the Eras Tour! Can't wait to see you all around the world. This tour has been an absolute dream, and I'm so grateful for all the memories we've made together. Get ready for more magical nights! 💫🎸 #ErasTour2025 #TaylorSwift #Swifties",
    media: [
      {
        id: "12-1",
        url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
        type: "image",
      },
      {
        id: "12-2",
        url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
        type: "image",
      },
    ],
    likes: 2900000,
    comments: userComments["12"],
    createdAt: "2025-08-29T15:00:00Z",
    location: "New York City",
    tags: ["ErasTour", "TaylorSwift", "Swifties"],
    saved: false,
    liked: false,
    user: createUserInfo("8"),
    views: 5000000,
  },
  {
    id: "13",
    userId: "9",
    caption:
      "Exciting news! Tesla's new AI-powered charging stations are now live across the US. These stations can charge your Tesla in just 10 minutes. The future of sustainable transport is here. 🚗⚡ #Tesla #Innovation #CleanEnergy",
    media: [
      {
        id: "13-1",
        url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89",
        type: "image",
      },
    ],
    likes: 1800000,
    comments: userComments["13"],
    createdAt: "2025-08-29T13:45:00Z",
    location: "Tesla HQ, Austin",
    tags: ["Tesla", "Innovation", "CleanEnergy"],
    saved: false,
    liked: false,
    user: createUserInfo("9"),
    views: 3200000,
  },
  {
    id: "14",
    userId: "10",
    caption:
      "WHAT. A. GAME. 😱 The Warriors make history with this incredible buzzer-beater in Game 7! Congratulations to both teams on an unforgettable series. #NBAPlayoffs #Warriors #GameWinner",
    media: [
      {
        id: "14-1",
        url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1756770608/nba_ko7mjt.mp4",
        type: "video",
      },
    ],
    likes: 1200000,
    comments: userComments["14"],
    createdAt: "2025-08-29T09:30:00Z",
    location: "Chase Center, San Francisco",
    tags: ["NBAPlayoffs", "Warriors", "GameWinner"],
    saved: false,
    liked: false,
    user: createUserInfo("10"),
    views: 4500000,
    isReelOnly: true,
  },
  {
    id: "15",
    userId: "11",
    caption: "Who kills it?😇",
    media: [
      {
        id: "13-1",
        url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1756771959/user1_rcbnks.mp4",
        type: "video",
      },
    ],
    likes: 1800000,
    comments: userComments["13"],
    createdAt: "2025-08-29T13:45:00Z",
    location: "",
    tags: ["Moment she called chanllage"],
    saved: false,
    liked: false,
    user: createUserInfo("11"),
    views: 3200000,
    isReelOnly: true,
  },
  {
    id: "17",
    userId: "12",
    caption:
      "We decided to jump on this challenge!🤣🤣🤣 @Stephany @Isibaby - The momment she calls",
    media: [
      {
        id: "13-1",
        url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1756773574/user2_hvl0jn.mp4",
        type: "video",
      },
    ],
    likes: 1800000,
    comments: userComments["13"],
    createdAt: "2025-08-29T13:45:00Z",
    location: "",
    tags: ["Tesla", "Innovation", "CleanEnergy"],
    saved: false,
    liked: false,
    user: createUserInfo("12"),
    views: 3200000,
    isReelOnly: true,
  },
  {
    id: "18",
    userId: "13",
    caption: "Jumping on the trend! 😂 #Urbandancecrew",
    media: [
      {
        id: "13-1",
        url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1756813547/userp_xjlvpi.mp4",
        type: "video",
      },
    ],
    likes: 1800000,
    comments: userComments["13"],
    createdAt: "2025-08-29T13:45:00Z",
    location: "",
    tags: ["Tesla", "Innovation", "CleanEnergy"],
    saved: false,
    liked: false,
    user: createUserInfo("13"),
    views: 4200000,
    isReelOnly: true,
  },
];
