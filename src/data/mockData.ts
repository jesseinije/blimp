import type { User, Post, Story, Comment } from "../types";
import { userData, userPosts } from "./userData";

// First, let's extend the Post type to include our new property
// This would normally go in types/index.ts, but we'll add it here for reference
// export interface Post {
//   // ... existing properties
//   isReelOnly?: boolean; // Add this property to the Post interface
// }

export const mockUsers: User[] = [
  {
    id: "1",
    username: "peller",
    displayName: "Peller",
    avatar: "/assets/images/peller1.jpg",
    bio: "Content creator | Comedian",
    followers: 2252000,
    following: 5,
    isVerified: true,
  },
  {
    id: "2",
    username: "janedoe",
    displayName: "Jane Doe",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "Photographer | Adventure seeker",
    followers: 2430,
    following: 567,
    isVerified: false,
  },
  {
    id: "3",
    username: "mrbeast",
    displayName: "Mr Beast",
    avatar: "/assets/images/mrb.jpg", // Updated path
    bio: "DONATE TO TEAMWATER $1 IS 1 YEAR OF CLEAN WATER FOR SOMEONE IN NEED!",
    followers: 33002000,
    following: 235,
    isVerified: true,
  },
  {
    id: "4",
    username: "travelbuddy",
    displayName: "Travel Buddy",
    avatar: "https://i.pravatar.cc/150?img=4",
    bio: "Exploring the world one step at a time",
    followers: 10500,
    following: 320,
    isVerified: false,
  },
  {
    id: "5",
    username: "foodielover",
    displayName: "Foodie Lover",
    avatar: "https://i.pravatar.cc/150?img=6",
    bio: "Food blogger | Cooking enthusiast",
    followers: 7890,
    following: 450,
    isVerified: true,
  },
  {
    id: "6",
    username: "DonaldTrump",
    displayName: "President Donald Trump",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1756808515/trump_hoe9f0.jpg", // Updated path
    bio: "45th President of the United States | Businessman | Author",
    followers: 3500000, // <-- Increased followers
    following: 50,
    isVerified: true,
  },
  {
    id: "7",
    username: "drake",
    displayName: "Drake",
    avatar: "/assets/images/drakeImg.webp", // Updated path
    bio: "Singer | Rapper | Record Producer | Actor",
    followers: 5200000,
    following: 1250,
    isVerified: true,
  },
  ...userData,
  {
    id: "14",
    username: "bad_gyal",
    displayName: "Ruth Kadirc",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1756815232/ruth_dc370q.jpg", // Updated path
    bio: "Singer & Dancer",
    followers: 120000,
    following: 1250,
    isVerified: false,
  },
  {
    id: "15",
    username: "skyFootball",
    displayName: "Sky Sports Football",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1756817095/sky_cudz51.jpg", // Updated path
    bio: "Singer & Dancer",
    followers: 5200000,
    following: 120,
    isVerified: false,
  },
  {
    id: "16",
    username: "indomie_nigeria",
    displayName: "Indomie",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1756820331/indo_vyp5ph.jpg", // Updated path
    bio: "Indomie - The Noodle of Champions",
    followers: 5200000,
    following: 120,
    isVerified: true,
  },
  {
    id: "17",
    username: "davido",
    displayName: "Davido",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1756914001/Davido_ceenoz.jpg",
    bio: "5IVE ALIVETOUR",
    followers: 50000000,
    following: 1,
    isVerified: true,
  },
  {
    id: "18",
    username: "gordon_ramsy",
    displayName: "Gordon Ramsay",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1756916489/Gordon-Ramsay_dlp0b4.jpg",
    bio: "Celebrity Chef | Restaurateur | Author",
    followers: 500000,
    following: 20,
    isVerified: true,
  },
];

export const mockComments: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      userId: "2",
      text: "This is amazing! 🔥",
      createdAt: "2025-08-16T14:22:10Z",
      likes: 24,
      replies: [
        {
          id: "c1r1",
          userId: "1",
          text: "Thanks Jane! It was such a perfect sunset that day!",
          createdAt: "2025-08-16T15:10:22Z",
          likes: 5,
        },
        {
          id: "c1r2",
          userId: "4",
          text: "I need to visit this place too!",
          createdAt: "2025-08-16T16:45:33Z",
          likes: 3,
        },
      ],
    },
    {
      id: "c2",
      userId: "3",
      text: "Great shot!",
      createdAt: "2025-08-16T15:30:45Z",
      likes: 12,
      replies: [
        {
          id: "c2r1",
          userId: "1",
          text: "Appreciate it! Just used my regular phone camera.",
          createdAt: "2025-08-16T15:45:20Z",
          likes: 2,
        },
      ],
    },
  ],
  "2": [
    {
      id: "c3",
      userId: "1",
      text: "Love this view! Where is this?",
      createdAt: "2025-08-16T10:15:30Z",
      likes: 35,
      replies: [
        {
          id: "c3r1",
          userId: "2",
          text: "This is in the Rocky Mountains, near Eagle Trail!",
          createdAt: "2025-08-16T10:30:15Z",
          likes: 8,
        },
        {
          id: "c3r2",
          userId: "4",
          text: "I've been there too! Such a great hiking spot.",
          createdAt: "2025-08-16T11:22:40Z",
          likes: 6,
        },
        {
          id: "c3r3",
          userId: "1",
          text: "Adding this to my travel list for sure!",
          createdAt: "2025-08-16T12:05:10Z",
          likes: 4,
        },
      ],
    },
    {
      id: "c4",
      userId: "5",
      text: "Stunning! 😍",
      createdAt: "2025-08-16T11:05:22Z",
      likes: 18,
      replies: [],
    },
  ],
  "3": [
    {
      id: "c5",
      userId: "4",
      text: "This is so cool!",
      createdAt: "2025-08-15T19:45:10Z",
      likes: 9,
      replies: [
        {
          id: "c5r1",
          userId: "3",
          text: "Thanks! I'm really happy with how it turned out.",
          createdAt: "2025-08-15T20:15:30Z",
          likes: 3,
        },
        {
          id: "c5r2",
          userId: "1",
          text: "What model is this? Looking to upgrade mine soon.",
          createdAt: "2025-08-15T21:05:45Z",
          likes: 1,
        },
        {
          id: "c5r3",
          userId: "3",
          text: "@johndoe It's the latest XZ-5000. Highly recommend it!",
          createdAt: "2025-08-15T21:30:22Z",
          likes: 2,
        },
      ],
    },
  ],
  "6": [
    {
      id: "c10",
      userId: "2",
      text: "This video is amazing! Love the city vibes 🌆",
      createdAt: "2025-08-10T15:30:00Z",
      likes: 45,
      replies: [
        {
          id: "c10r1",
          userId: "1",
          text: "Thanks! It was such a perfect summer day!",
          createdAt: "2025-08-10T15:45:00Z",
          likes: 12,
        },
        {
          id: "c10r2",
          userId: "3",
          text: "Which neighborhood is this? Looks awesome!",
          createdAt: "2025-08-10T16:00:00Z",
          likes: 8,
        },
      ],
    },
    {
      id: "c11",
      userId: "4",
      text: "NYC summer is the best 🗽",
      createdAt: "2025-08-10T16:15:00Z",
      likes: 33,
      replies: [],
    },
  ],
  "7": [
    {
      id: "c12",
      userId: "5",
      text: "The editing is so smooth! What software did you use?",
      createdAt: "2025-08-17T16:00:00Z",
      likes: 67,
      replies: [
        {
          id: "c12r1",
          userId: "3",
          text: "I used Adobe Premiere Pro with some custom transitions!",
          createdAt: "2025-08-17T16:30:00Z",
          likes: 15,
        },
      ],
    },
    {
      id: "c13",
      userId: "1",
      text: "This is next level 🔥",
      createdAt: "2025-08-17T17:00:00Z",
      likes: 42,
      replies: [],
    },
  ],
  "8": [
    {
      id: "c14",
      userId: "2",
      text: "Incredible work Mr. President! 🇺🇸",
      createdAt: "2025-08-18T10:00:00Z",
      likes: 2456,
      replies: [
        {
          id: "c14r1",
          userId: "6",
          text: "Thank you! Nobody does videos like we do, believe me!",
          createdAt: "2025-08-18T10:15:00Z",
          likes: 1893,
        },
      ],
    },
    {
      id: "c15",
      userId: "3",
      text: "The production quality is outstanding",
      createdAt: "2025-08-18T11:00:00Z",
      likes: 1245,
      replies: [],
    },
  ],
  "10": [
    {
      id: "c16",
      userId: "1",
      text: "Can't wait for this to drop! 🔥",
      createdAt: "2025-08-27T20:30:00Z",
      likes: 15678,
      replies: [
        {
          id: "c16r1",
          userId: "7",
          text: "Soon come 🦉",
          createdAt: "2025-08-27T21:00:00Z",
          likes: 25432,
        },
      ],
    },
    {
      id: "c17",
      userId: "3",
      text: "This is gonna be another classic 🏆",
      createdAt: "2025-08-27T20:45:00Z",
      likes: 12543,
      replies: [],
    },
  ],
  "11": [
    {
      id: "c18",
      userId: "2",
      text: "The GOAT back in the studio! 🐐",
      createdAt: "2025-08-25T03:30:00Z",
      likes: 18965,
      replies: [],
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
  const user = mockUsers.find((u) => u.id === userId);

  // Force isFollowing to be true for Donald Trump (userId: "6") to hide the Follow button
  const isFollowing = userId === "6" ? true : Math.random() > 0.5;

  return {
    id: userId,
    username: user?.username || "",
    avatar: user?.avatar || "",
    isFollowing: isFollowing, // Always true for Donald Trump
    isVerified: user?.isVerified,
  };
};

export const mockPosts: Post[] = [
  {
    id: "111",
    userId: "18",
    caption: "Gordon, Gino and Fred: Road Trip",
    media: [
      {
        id: "11-1",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1756916517/ramsy_eolhtx.avif",
        type: "image",
      },
    ],
    likes: 1850000,
    comments: mockComments["11"],
    createdAt: "2025-08-25T03:22:00Z",
    tags: ["music", "studio", "OVO", "behindthescenes"],
    saved: false,
    liked: false,
    user: createUserInfo("18"),
    views: 5200000,
    pinned: true,
  },
  {
    id: "110",
    userId: "17",
    caption:
      "With support from @victony and @odumodublvck it's about to be massive!🔥",
    media: [
      {
        id: "11-1",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1756914612/dav_ewuq7e.jpg",
        type: "image",
      },
    ],
    likes: 1850000,
    comments: mockComments["11"],
    createdAt: "2025-08-25T03:22:00Z",
    tags: ["music", "studio", "OVO", "behindthescenes"],
    saved: false,
    liked: false,
    user: createUserInfo("17"),
    views: 5200000,
    music: {
      title: "Over Dem",
      artist: "Davido",
      url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1756915938/davmp3_yycwgy.mp3",
    },
    pinned: true,
  },
  {
    id: "22",
    userId: "15",
    caption:
      "JUST SARINA WIEGMAN LOSING HER MIND AS BURNA BOY JOINS HER ON STAGE.😀",
    media: [
      {
        id: "1-1",
        url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1756817000/ssstwitter.com_1756816889384_ji3o8x.mp4",
        type: "video",
      },
    ],
    likes: 14000,
    comments: mockComments["1"],
    createdAt: "2025-08-16T18:30:00Z",
    tags: ["sunset", "beachvibes", "summer"],
    saved: false,
    liked: true,
    user: createUserInfo("15"),
    views: 15400,
  },

  {
    id: "101",
    userId: "1",
    caption: "Me and my queen inside JP🥰",
    media: [
      {
        id: "1-1",
        url: "/assets/images/peller.jpg",
        type: "image",
      },
    ],
    likes: 1240,
    comments: mockComments["1"],
    createdAt: "2025-08-16T18:30:00Z",
    location: "MMIA, Ikeja, Nigeria",
    tags: ["sunset", "beachvibes", "summer"],
    saved: false,
    liked: true,
    user: createUserInfo("1"),
    views: 15400,
    pinned: true,
  },
  {
    id: "19",
    userId: "14",
    caption: "Me and my bestie for life🥰 ",
    media: [
      {
        id: "1-1",
        url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1756814493/black_bsogv3.mp4",
        type: "video",
      },
    ],
    likes: 740,
    comments: mockComments["1"],
    createdAt: "2025-08-16T18:30:00Z",
    tags: ["sunset", "beachvibes", "summer"],
    saved: false,
    liked: true,
    user: createUserInfo("14"),
    views: 15400,
    isReelOnly: true,
  },
  {
    id: "102",
    userId: "2",
    caption: "Hiking in the mountains was incredible! #adventure #mountains",
    media: [
      {
        id: "2-1",
        url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        type: "image",
      },
    ],
    likes: 856,
    comments: mockComments["2"],
    createdAt: "2025-08-16T10:15:30Z",
    location: "Rocky Mountains",
    tags: ["adventure", "mountains", "hiking"],
    saved: true,
    liked: false,
    user: createUserInfo("2"),
    views: 8700, // <-- Added
  },
  {
    id: "103",
    userId: "3",
    caption:
      "Beast Games Season 2 wrapped filming!!! We gathered the strongest and the smartest people on earth to compete for $5,000,000! I’M SO EXCITED SEASON 2 IS 10X BETTER THAN SEASON 1 :D",
    media: [
      {
        id: "3-1",
        url: "/assets/images/mrb1.jpg", // Update from /src/assets to /assets
        type: "image",
      },
    ],
    likes: 432000,
    comments: mockComments["3"],
    createdAt: "2025-08-15T19:45:10Z",
    tags: ["tech", "gadgets", "innovation"],
    saved: false,
    liked: false,
    user: createUserInfo("3"),
    views: 5400, // <-- Added
  },
  {
    id: "4",
    userId: "4",
    caption:
      "Exploring the hidden gems of Paris! Skipped the typical tourist spots today and ventured into the lesser-known neighborhoods. Found this charming café where all the locals eat, with the most amazing croissants I've ever tasted.  #travel #paris #hiddengems #localexperience #parisianlife #offthebeatenpath #travelphotography #wanderlust #europetrip #parisfrance",
    media: [
      {
        id: "4-1",
        url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        type: "image",
      },
      {
        id: "4-2",
        url: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        type: "image",
      },
      {
        id: "4-3",
        url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        type: "image",
      },
    ],
    likes: 1568,
    comments: [],
    createdAt: "2025-08-14T12:30:45Z",
    location: "Paris, France",
    tags: ["travel", "paris", "vacation"],
    saved: true,
    liked: true,
    user: createUserInfo("4"),
    views: 12000, // <-- Added
  },
  {
    id: "5",
    userId: "5",
    caption:
      "Made this delicious pasta completely from scratch today! The secret is using fresh, high-quality ingredients and taking your time with each step of the process. I used organic semolina flour, farm-fresh eggs, and a touch of olive oil to create the perfect pasta dough. #food #homemade #pasta #italianfood #fromscratch #foodie #cooking #homechef #foodphotography #sundaycooking",
    media: [
      {
        id: "5-1",
        url: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        type: "image",
      },
      {
        id: "5-2",
        url: "https://images.unsplash.com/photo-1498579485796-98be3abc076e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        type: "image",
      },
    ],
    likes: 987,
    comments: [],
    createdAt: "2025-08-13T17:20:15Z",
    tags: ["food", "homemade", "cooking"],
    saved: false,
    liked: false,
    user: createUserInfo("5"),
    views: 9800, // <-- Added
  },
  {
    id: "6",
    userId: "1",
    caption: "Such a beautiful soul😍",
    media: [
      {
        id: "6-1",
        url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1756770048/test1_axzcbt.mp4", // Updated path
        type: "video",
      },
    ],
    likes: 2450,
    comments: mockComments["6"],
    createdAt: "2025-08-10T14:15:30Z",
    location: "New York City",
    tags: ["summer", "citylife", "newyork"],
    saved: false,
    liked: true,
    user: createUserInfo("1"),
    views: 21000,
    isReelOnly: true, // Added this line
  },
  {
    id: "7",
    userId: "3",
    caption: "Check out this awesome video I made! #video #creation #coding",
    media: [
      {
        id: "7-1",
        url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1756770779/test_mlanl5.mp4", // Update from /src/assets to /assets
        type: "video",
      },
    ],
    likes: 583,
    comments: [],
    createdAt: "2025-08-17T15:45:10Z",
    tags: ["video", "creation", "coding"],
    saved: false,
    liked: false,
    user: createUserInfo("3"),
    views: 3250000,
    isReelOnly: true, // Added this line
  },
  {
    id: "8",
    userId: "6",
    caption: "Make America Great Again! #MAGA",
    media: [
      {
        id: "8-1",
        url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1756770400/test3_r2tbzl.mp4", // Update from /src/assets to /assets
        type: "video",
      },
    ],
    likes: 1893,
    comments: mockComments["7"],
    createdAt: "2025-08-18T09:22:30Z",
    location: "Mar-a-Lago, Florida",
    tags: ["creativity", "design", "videoart", "project"],
    saved: false,
    liked: false,
    isReelOnly: true, // Already had this line
    user: createUserInfo("6"),
    views: 45000,
  },
  {
    id: "9",
    userId: "6",
    caption:
      "Making America great again! Just had a fantastic meeting with supporters. The energy was incredible. #MAGA #America #leadership",
    media: [
      {
        id: "9-1",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1756808822/trump1_g6eimn.jpg", // Update from /src/assets to /assets
        type: "image",
      },
    ],
    likes: 3250000,
    comments: mockComments["8"], // Add this line
    createdAt: "2025-08-19T11:15:00Z", // Today's date
    location: "Trump Tower, New York",
    tags: ["MAGA", "America", "leadership", "politics"],
    saved: false,
    liked: false,
    user: createUserInfo("6"),
    views: 3250000, // <-- Added
  },
  {
    id: "10",
    userId: "7",
    caption: "Drake @Stake",
    media: [
      {
        id: "10-1",
        url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1756770618/drake_daggbl.mp4", // Update from /src/assets to /assets
        type: "video",
      },
    ],
    likes: 2750000,
    comments: mockComments["10"],
    createdAt: "2025-08-27T20:15:00Z",
    location: "Toronto, Canada",
    tags: ["music", "rap", "newmusic", "ForAllTheDogs"],
    saved: false,
    liked: false,
    user: createUserInfo("7"),
    views: 8500000,
    isReelOnly: true,
  },
  {
    id: "11",
    userId: "7",
    caption: "Studio time 📸 #OVO #Studio",
    media: [
      {
        id: "11-1",
        url: "/assets/images/drakepost.jpg", // Update from /src/assets to /assets
        type: "image",
      },
    ],
    likes: 1850000,
    comments: mockComments["11"],
    createdAt: "2025-08-25T03:22:00Z",
    location: "OVO Sound Studio",
    tags: ["music", "studio", "OVO", "behindthescenes"],
    saved: false,
    liked: false,
    user: createUserInfo("7"),
    views: 5200000,
    music: {
      title: "Laugh now cry later",
      artist: "Drake & Lil' Durk",
      url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1756918251/drake_xyilxh.mp3",
    },
    pinned: true,
  },
  {
    id: "20",
    userId: "3",
    caption:
      "Me - I raised $12M to get hundreds of thousands of people clean water and save countless people from dying! 🥰",
    media: [
      {
        id: "3-1",
        url: "/assets/images/mrb2.jpg", // Update from /src/assets to /assets
        type: "image",
      },
    ],
    likes: 33200000,
    comments: mockComments["3"],
    createdAt: "2025-08-15T19:45:10Z",
    tags: ["tech", "gadgets", "innovation"],
    saved: false,
    liked: false,
    user: createUserInfo("3"),
    views: 5400, // <-- Added
  },
  {
    id: "16",
    userId: "16", // Indomie account
    caption:
      "Fuel your day with the taste of champions! 🍜✨ #IndomieNoodles #NoodlesOfChampions",
    media: [
      {
        id: "m16",
        type: "video",
        url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1756819148/get_jvqxwx.mp4",
      },
    ],
    likes: 15420,
    comments: [],
    repostsCount: 234,
    sharesCount: 456,
    location: "Lagos, Nigeria",
    createdAt: "2025-09-01T10:00:00Z",
    liked: false,
    saved: false,
    sponsored: {
      buttonText: "Learn More",
      buttonUrl: "https://www.indomie.com/products",
    },
    user: createUserInfo("16"),
    views: 25000,
    pinned: true,
  },

  ...userPosts, // Add this line to combine the arrays
];

export const mockStories: Story[] = [
  {
    id: "s1",
    userId: "1",
    mediaUrl:
      "https://images.unsplash.com/photo-1563473213013-de2a0133c100?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    createdAt: "2025-08-17T08:30:00Z",
    seen: false,
  },
  {
    id: "s2",
    userId: "2",
    mediaUrl:
      "https://images.unsplash.com/photo-1542052125054-c168600274d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    createdAt: "2025-08-17T09:15:00Z",
    seen: true,
  },
  {
    id: "s3",
    userId: "3",
    mediaUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    createdAt: "2025-08-17T07:45:00Z",
    seen: false,
  },
  {
    id: "s4",
    userId: "4",
    mediaUrl:
      "https://images.unsplash.com/photo-1536323760109-ca8c07450053?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    createdAt: "2025-08-17T10:20:00Z",
    seen: false,
  },
  {
    id: "s5",
    userId: "5",
    mediaUrl:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    createdAt: "2025-08-17T11:05:00Z",
    seen: true,
  },
  {
    id: "s6",
    userId: "7",
    mediaUrl: "/assets/audio/drake.mp3", // Updated path
    createdAt: "2025-08-28T01:30:00Z",
    seen: false,
  },
];

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find((user) => user.id === id);
};

// Helper function to get posts by user ID
export const getPostsByUserId = (userId: string): Post[] => {
  return mockPosts.filter((post) => post.userId === userId);
};

// Helper function to get stories by user ID
export const getStoriesByUserId = (userId: string): Story[] => {
  return mockStories.filter((story) => story.userId === userId);
};

// NEW HELPER FUNCTION: Get posts for the regular feed (filtering out reel-only posts)
export const getPostsForFeed = (): Post[] => {
  return mockPosts.filter((post) => !post.isReelOnly);
};

// NEW HELPER FUNCTION: Get posts for the reels feed (only video posts)
export const getReelsForFeed = (): Post[] => {
  return mockPosts.filter((post) =>
    post.media.some((item) => item.type === "video")
  );
};

// NEW HELPER FUNCTION: Get post by ID
export const getPostById = (postId: string): Post | undefined => {
  return mockPosts.find((post) => post.id === postId);
};

export function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${Math.round(count / 1000)}K`;
  }
  if (count >= 1000) {
    return `${Math.round(count / 1000)}K`;
  }
  return count.toString();
}
