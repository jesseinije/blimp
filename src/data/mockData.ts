import type { User, Post, Story, Comment } from "../types";
import { userData, userPosts } from "./userData";

// First, let's extend the Post type to include our new property
// This would normally go in types/index.ts, but we'll add it here for reference
// export interface Post {
//   // ... existing properties
//   isReelOnly?: boolean; // Add this property to the Post interface
// }

// Helper to generate random social links for each user
function getRandomSocialLinks(username: string) {
  const platforms = [
    { key: "instagram", url: `https://instagram.com/${username}` },
    { key: "x", url: `https://x.com/${username}` },
    { key: "youtube", url: `https://youtube.com/@${username}` },
    { key: "tiktok", url: `https://tiktok.com/@${username}` },
  ];
  // Shuffle and pick 2-4
  const shuffled = platforms.sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * 3) + 2; // 2-4
  const selected = shuffled.slice(0, count);
  // Build object
  const links: Record<string, string> = {};
  selected.forEach((p) => (links[p.key] = p.url));
  return links;
}

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
    creator: true,
    socialLinks: getRandomSocialLinks("peller"),
  },
  {
    id: "301",
    username: "nancyisimeofficial",
    displayName: "Nancy E. Isime",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1758343977/nancy4_ind8y3.jpg",
    bio: "Actor | TV Host",
    followers: 3200000,
    following: 50,
    isVerified: true,
    creator: true,
    socialLinks: getRandomSocialLinks("nancyisimeofficial"),
  },
  {
    id: "223",
    username: "michaelbjordan",
    displayName: "Michael B. Jordan",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757545978/Embrace_the_pursuit._Chevron_by_DavidYurman_features_bold_angles_andprecision-carved_lines_as_a_lpdtxm.jpg",
    bio: "",
    followers: 2252000,
    following: 5,
    isVerified: true,
    link: "https://www.sinnermovie.com",
    socialLinks: getRandomSocialLinks("michaelbjordan"),
  },
  {
    id: "226",
    username: "kevinhart",
    displayName: "Kevin Hart",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757590514/hart_sk52nr.jpg",
    bio: "Comedian, Actor & Producer",
    followers: 3250000,
    following: 5,
    isVerified: true,
    link: "https://www.kevinhartnation.com",
    socialLinks: getRandomSocialLinks("kevinhart"),
  },
  {
    id: "222",
    username: "kimkardashian",
    displayName: "Kim Kardashian",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757544228/k6kcmmobmzjtyfyntb5y.jpg",
    bio: "Reality TV Star | Entrepreneur | Influencer",
    followers: 4252000,
    following: 0,
    isVerified: true,
    follow: true,
    socialLinks: getRandomSocialLinks("kimkardashian"),
  },
  {
    id: "200",
    username: "maddiecarter",
    displayName: "Maddie Carter",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757514765/happy_bday_lukebryan_mvidzr.jpg",
    bio: "Just a lonely girl trying to find her way",
    followers: 12520,
    following: 200,
    socialLinks: getRandomSocialLinks("maddiecarter"),
  },
  {
    id: "201",
    username: "burnaboy",
    displayName: "Burna Boy",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757523932/Burna-Boy-Photo_luzbcr.jpg",
    bio: "African Giant | Musician | Performer | Global Citizen",
    followers: 62520,
    following: 200,
    isVerified: true,
    socialLinks: getRandomSocialLinks("burnaboy"),
  },
  {
    id: "203",
    username: "luno_nigeria",
    displayName: "Luno Nigeria",
    link: "https://www.luno.com",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757531234/lunoglobal_logo_cpxdnq.jpg",
    bio: "We make crypto simple, safe, and social. Join Luno today! 🚀",
    followers: 12520,
    following: 200,
    isVerified: true,
    socialLinks: getRandomSocialLinks("luno_nigeria"),
  },
  {
    id: "2",
    username: "tiwasavage",
    displayName: "Tiwa Savage",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1756964407/sav_l93gbf.jpg",
    bio: "Singer & Songwriter | Mother | Entrepreneur",
    followers: 2430000,
    following: 7,
    isVerified: true,
    follow: true,
    story: true,
    isRead: true,
    socialLinks: getRandomSocialLinks("tiwasavage"),
  },
  {
    id: "3",
    username: "mrbeast",
    displayName: "Mr Beast",
    avatar: "/assets/images/mrb.jpg",
    bio: "DONATE TO TEAMWATER $1 IS 1 YEAR OF CLEAN WATER FOR SOMEONE IN NEED!",
    followers: 33002000,
    following: 235,
    isVerified: true,
    follow: true,
    story: true,
    socialLinks: getRandomSocialLinks("mrbeast"),
  },
  {
    id: "4",
    username: "mpsilakis",
    displayName: "Michael Silakis",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757264464/mic_fsbzd7.jpg",
    bio: "Environmentalist | Crypto Trader | Travel Enthusiast",
    followers: 3500,
    following: 320,
    isVerified: true,
    socialLinks: getRandomSocialLinks("mpsilakis"),
  },
  {
    id: "5",
    username: "donjazzy",
    displayName: "Don Jazzy",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757232320/Don-Jazzy_jrkgzo.jpg",
    bio: "Producer | Musician | Entrepreneur",
    followers: 5000000,
    following: 20,
    isVerified: true,
    isRead: true,
    socialLinks: getRandomSocialLinks("donjazzy"),
  },
  {
    id: "6",
    username: "lexiHeartVIP",
    displayName: "Lexi Heart",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757528574/lexi_ijqgky.jpg",
    bio: "45th President of the United States | Businessman | Author",
    followers: 100000,
    following: 200,
    isVerified: true,
    follow: true,
    socialLinks: getRandomSocialLinks("lexiHeartVIP"),
  },
  {
    id: "7",
    username: "drake",
    displayName: "Drake",
    avatar: "/assets/images/drakeImg.webp",
    bio: "Singer | Rapper | Record Producer | Actor",
    followers: 5200000,
    following: 1250,
    isVerified: true,
    isRead: true,
    socialLinks: getRandomSocialLinks("drake"),
  },
  ...userData,
  {
    id: "14",
    username: "bad_gyal",
    displayName: "Ruth Kadirc",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1756815232/ruth_dc370q.jpg",
    bio: "Singer & Dancer",
    followers: 120000,
    following: 1250,
    isVerified: false,
    socialLinks: getRandomSocialLinks("bad_gyal"),
  },
  {
    id: "15",
    username: "skyFootball",
    displayName: "Sky Sports Football",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1756817095/sky_cudz51.jpg",
    bio: "Your home of football news, live scores, highlights and analysis",
    followers: 5200000,
    following: 120,
    follow: true,
    isVerified: false,
    link: "https://www.skysports.com",
    socialLinks: getRandomSocialLinks("skyFootball"),
  },
  {
    id: "16",
    username: "indomie_nigeria",
    displayName: "Indomie",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1756820331/indo_vyp5ph.jpg",
    bio: "Indomie - The Noodle of Champions",
    followers: 5200000,
    following: 120,
    isVerified: true,
    link: "https://indomie.ng",
    socialLinks: getRandomSocialLinks("indomie_nigeria"),
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
    story: true,
    socialLinks: getRandomSocialLinks("davido"),
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
    follow: true,
    isVerified: true,
    socialLinks: getRandomSocialLinks("gordon_ramsy"),
  },
  {
    id: "27",
    username: "hardy",
    displayName: "Hardy",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757265596/hardy_ptddku.jpg",
    bio: "Singer | Songwriter | Musician",
    followers: 500000,
    following: 15,
    follow: true,
    isVerified: true,
    socialLinks: getRandomSocialLinks("hardy"),
  },
  {
    id: "30",
    username: "faizan_haroon",
    displayName: "Faizan Haroon",
    avatar:
      "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757274516/last_love._gfqbwb.jpg",
    bio: "Crypto Trader",
    followers: 200000,
    following: 15,
    follow: true,
    isVerified: true,
    socialLinks: getRandomSocialLinks("faizan_haroon"),
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
    id: "300",
    userId: "301",
    caption: "Airport but make it fashion ✈️✨ #Summer2025 @berbiebeauty",
    media: [
      {
        id: "11-1",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1758344087/nancy_vj4vvu.jpg",
        type: "image",
      },
      {
        id: "11-2",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1758344039/nancy1_gi3i1i.jpg",
        type: "image",
      },
      {
        id: "11-3",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1758344117/nancy2_phbr9n.jpg",
        type: "image",
      },
    ],
    likes: 1850000,
    comments: mockComments["11"],
    createdAt: "2025-08-25T03:22:00Z",
    tags: ["music", "studio", "OVO", "behindthescenes"],
    saved: false,
    liked: false,
    user: createUserInfo("301"),
    views: 5200000,
    location: "Paris, France",
    pinned: true,
  },
  {
    id: "209",
    userId: "223",
    caption: "",
    media: [
      {
        id: "11-1",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757545986/Amulets_and_Spiritual_Beads_by_DavidYurman._Symbols_of_self._1_fovees.jpg",
        type: "image",
      },
    ],
    likes: 1850000,
    comments: mockComments["11"],
    createdAt: "2025-08-25T03:22:00Z",
    tags: ["music", "studio", "OVO", "behindthescenes"],
    saved: false,
    liked: false,
    user: createUserInfo("223"),
    views: 5200000,
  },
  {
    id: "226",
    userId: "226",
    caption:
      "#OldSpicePartner had me so hype I almost ran out the tub and straight to the field.🤣",
    media: [
      {
        id: "11-7",
        url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1757590444/AQMIDO3rJmKvz-Ap6nDago_uo9u31YTo6GB5vFqVy5UlNPR48uh1VfDjdG1c-x6kCTxys86YnXX8vbqX_fmFHlyNeLGXj3AiZP-FaQs_n52enq.mp4",
        type: "video",
      },
    ],
    likes: 1850000,
    comments: mockComments["11"],
    createdAt: "2025-08-25T03:22:00Z",
    tags: ["music", "studio", "OVO", "behindthescenes"],
    saved: false,
    liked: false,
    user: createUserInfo("226"),
    views: 4200000,
  },
  {
    id: "229",
    userId: "222",
    caption: "When in Venice  @dilarafindikoglu @lorraineschwartz",
    media: [
      {
        id: "11-1",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757544619/When_in_Venice_dilarafindikoglu_lorraineschwartz_1_j6yyd4.jpg",
        type: "image",
      },
      {
        id: "11-2",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757544628/When_in_Venice_dilarafindikoglu_lorraineschwartz_2_w7hmrg.jpg",
        type: "image",
      },
      {
        id: "11-3",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757544610/When_in_Venice_dilarafindikoglu_lorraineschwartz_w3xnpj.jpg",
        type: "image",
      },
    ],
    likes: 1850000,
    comments: mockComments["11"],
    createdAt: "2025-08-25T03:22:00Z",
    tags: ["music", "studio", "OVO", "behindthescenes"],
    saved: false,
    liked: false,
    user: createUserInfo("222"),
    views: 5200000,
  },
  {
    id: "203",
    userId: "6",
    caption: "#JasonMomoa #ChiefofWar",
    media: [
      {
        id: "11-8",
        url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1757528971/ssstik.io__angbishop10_1757528915133_pohido.mp4",
        type: "video",
      },
    ],
    likes: 1850000,
    comments: mockComments["11"],
    createdAt: "2025-08-25T03:22:00Z",
    tags: ["music", "studio", "OVO", "behindthescenes"],
    saved: false,
    liked: false,
    user: createUserInfo("6"),
    views: 5200000,
    isReelOnly: true,
  },
  {
    id: "200",
    userId: "200",
    caption: "#StudioVibes with @audreytmclaughlin 🎶✨",
    media: [
      {
        id: "11-1",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757513654/wishing_saturdays_with_audreytmclaughlin_could_last_forever_rda9hg.jpg",
        type: "image",
      },
      {
        id: "11-2",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757513640/wishing_saturdays_with_audreytmclaughlin_could_last_forever_2_zpc0fr.jpg",
        type: "image",
      },
      {
        id: "11-3",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757513646/wishing_saturdays_with_audreytmclaughlin_could_last_forever_1_ydcgvw.jpg",
        type: "image",
      },
    ],
    likes: 1850000,
    comments: mockComments["11"],
    createdAt: "2025-08-25T03:22:00Z",
    tags: ["music", "studio", "OVO", "behindthescenes"],
    saved: false,
    liked: false,
    user: createUserInfo("200"),
    views: 5200000,
  },
  {
    id: "201",
    userId: "201",
    caption:
      "Two pieces of good news in one week! We're cheesed up! New toy arrived & Visa stamped for Australia! 🇦🇺✈️🎶 #Blessed #StudioVibes",
    media: [
      {
        id: "11-1",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757515489/Two_pieces_of_good_news_in_one_week_we_re_cheesed_up_New_toy_arrived_Visa_stamped_for_Austr_1_mxbhhr.jpg",
        type: "image",
      },
      {
        id: "11-2",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757515506/Two_pieces_of_good_news_in_one_week_we_re_cheesed_up_New_toy_arrived_Visa_stamped_for_Austr_golcgq.jpg",
        type: "image",
      },
      {
        id: "11-3",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757515473/Two_pieces_of_good_news_in_one_week_we_re_cheesed_up_New_toy_arrived_Visa_stamped_for_Austr_2_f1pgi5.jpg",
        type: "image",
      },
      {
        id: "11-4",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757515454/Two_pieces_of_good_news_in_one_week_we_re_cheesed_up_New_toy_arrived_Visa_stamped_for_Austr_3_fi0vb3.jpg",
        type: "image",
      },
    ],
    likes: 1850000,
    comments: mockComments["11"],
    createdAt: "2025-08-25T03:22:00Z",
    tags: ["music", "studio", "OVO", "behindthescenes"],
    saved: false,
    liked: false,
    user: createUserInfo("201"),
    views: 5200000,
    music: {
      title: "Last Last",
      artist: "Burna Boy",
      url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1757524773/Burna-Boy-Last-Last--_TrendyBeatz_mp3cut.net_zm6ety.mp3",
    },
  },
  {
    id: "118",
    userId: "203", // Indomie account
    caption:
      "Looking for the best platform to buy and sell Bitcoin in Nigeria? Look no further than Luno! With our user-friendly app and secure platform, you can easily trade Bitcoin and other cryptocurrencies anytime, anywhere. Join the millions of users worldwide who trust Luno for their crypto needs. Sign up today and start your crypto journey with Luno! 🚀",
    media: [
      {
        id: "16-1",
        type: "video",
        url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1757530198/snaptik_7478024178952719622_v2_qfuvhp.mp4",
      },
    ],
    likes: 15420,
    comments: [],
    repostsCount: 234,
    sharesCount: 456,
    location: "Nigeria",
    createdAt: "2025-09-01T10:00:00Z",
    liked: false,
    saved: false,
    sponsored: {
      buttonText: "Learn More",
      buttonUrl: "https://www.luno.com/",
    },
    user: createUserInfo("203"),
    views: 25000,
    pinned: true,
  },
  {
    id: "111",
    userId: "18",
    caption: "Cooking up something special! 🍳👨‍🍳 #ChefLife",
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
    id: "115",
    userId: "27",
    caption:
      "I've written a lot of bro country songs, got another one to add to the list. #BroCountry #CountryMusic",
    media: [
      {
        id: "11-1",
        url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1757265549/ssstik.io_1757264293782_online-video-cutter.com_hahq1x.mp4",
        type: "video",
      },
    ],
    likes: 1850000,
    comments: mockComments["11"],
    createdAt: "2025-08-25T03:22:00Z",
    tags: ["music", "studio", "OVO", "behindthescenes"],
    saved: false,
    liked: false,
    user: createUserInfo("27"),
    views: 5200000,
    pinned: true,
  },
  {
    id: "116",
    userId: "30",
    caption:
      "Just closed a major crypto deal! Feeling on top of the world. #CryptoTrader #Blockchain #Success",
    media: [
      {
        id: "11-1",
        url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1757274333/Life_in_Canada_as_Crypto_trader_faizanharoon_bitcoin_crypto_earning_cryptocurrency_inves_emieqr.mp4",
        type: "video",
      },
    ],
    likes: 1850000,
    comments: mockComments["11"],
    createdAt: "2025-08-25T03:22:00Z",
    tags: ["music", "studio", "OVO", "behindthescenes"],
    saved: false,
    liked: false,
    user: createUserInfo("30"),
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
    caption: "",
    media: [
      {
        id: "2-1",
        url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1756964290/twa_rvp5n1.mp4",
        type: "video",
      },
    ],
    likes: 35600,
    comments: mockComments["2"],
    createdAt: "2025-08-16T10:15:30Z",
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
    id: "202",
    userId: "7",
    caption:
      "The 1 MOST streamed artist of all time on Spotify: 115 BILLION streams",
    media: [
      {
        id: "11-1",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757525962/The_1_MOST_streamed_artist_of_all_time_on_Spotify_115_BILLION_streams_drake_dspqmq.jpg",
        type: "image",
      },
    ],
    likes: 1850000,
    comments: mockComments["11"],
    createdAt: "2025-08-25T03:22:00Z",
    tags: ["music", "studio", "OVO", "behindthescenes"],
    saved: false,
    liked: false,
    user: createUserInfo("7"),
    views: 5200000,
    music: {
      title: "Family Matters",
      artist: "Drake",
      url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1757526469/Drake_-_Family_Matters_Offblogmedia_mp3cut.net_f1djna.mp3",
    },
  },
  {
    id: "4",
    userId: "4",
    caption: "Showy day recipe: beef and leek stew. @mpTaverna_NY",
    media: [
      {
        id: "4-2",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757264485/mic2_eaxlkh.jpg",
        type: "image",
      },
      {
        id: "4-3",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757264446/mic3_sbrp4j.jpg",
        type: "image",
      },
    ],
    likes: 1568,
    comments: [],
    createdAt: "2025-08-14T12:30:45Z",
    tags: ["travel", "paris", "vacation"],
    saved: true,
    liked: true,
    user: createUserInfo("4"),
    views: 12000, // <-- Added
  },
  {
    id: "5",
    userId: "5",
    caption: `Oya go and watch the official video of the hottest jam out now!
    #HotBody - @ayrastarr.`,
    media: [
      {
        id: "5-1",
        url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1757232156/savethr.com_1757232135158_ht5lud.mp4",
        type: "video",
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
    caption:
      "Ginness World Record for the most advanced video ever made! #creativity #design #videoart #project",
    media: [
      {
        id: "8-1",
        url: "https://res.cloudinary.com/dopnzcfxj/video/upload/v1757549820/guinnessworldrecords_7547763439867809046_bpo1hn.mp4", // Update from /src/assets to /assets
        type: "video",
      },
    ],
    likes: 1893,
    comments: mockComments["7"],
    createdAt: "2025-08-18T09:22:30Z",
    location: "",
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
    caption: "What's your fav meme? #funny #memes #humor #lol #funnymemes",
    media: [
      {
        id: "9-1",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757586940/31_Funny_Quotes_And_Sayings_About_Funny_Memes_q0nw6n.jpg", // Update from /src/assets to /assets
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
    caption: "The Graham Boyz back in the studio with Drizzy 🦉",
    media: [
      {
        id: "11-1",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757525407/The_Graham_Boyz_drake_vopmko.jpg", // Update from /src/assets to /assets
        type: "image",
      },
      {
        id: "11-2",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757525385/The_Graham_Boyz_drake_1_i8gmq4.jpg", // Update from /src/assets to /assets
        type: "image",
      },
      {
        id: "11-3",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757525328/The_Graham_Boyz_drake_2_zifqfg.jpg", // Update from /src/assets to /assets
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
  {
    id: "120",
    userId: "17",
    caption:
      "I've been working on something special for my fans. Stay tuned! #NewMusicAlert",
    media: [
      {
        id: "11-1",
        url: "https://res.cloudinary.com/dopnzcfxj/image/upload/v1757543244/I_ve_learnt_that_people_will_forget_what_you_said_people_will_forget_what_you_did_but_people_w_qdtiwn.jpg",
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

// NEW HELPER FUNCTION: Get user by username
export function getUserByUsername(username: string) {
  return mockUsers.find((u) => u.username === username);
}

// Function to add mock comments and replies to posts
function addMockCommentsAndRepliesToPosts(
  posts: Post[],
  users: User[],
  postsWithTenComments: string[] = []
) {
  posts.forEach((post) => {
    // Ensure comments array exists
    if (!post.comments) post.comments = [];
    // Set target comments: 10 for selected posts, otherwise 5–10
    const targetComments = postsWithTenComments.includes(post.id)
      ? 10
      : Math.max(5, Math.min(10, post.comments.length || 5));
    for (let i = post.comments.length; i < targetComments; i++) {
      const user = users[i % users.length];
      post.comments.push({
        id: `c${post.id}-${i}`,
        userId: user.id,
        text: `Extra comment ${i + 1} on post ${post.id}`,
        createdAt: `2025-08-16T1${i}:00:00Z`,
        likes: Math.floor(Math.random() * 20),
        replies: [],
      });
    }
    // For each comment, add replies to reach 2–5
    post.comments.forEach((comment, idx) => {
      if (!comment.replies) comment.replies = [];
      const targetReplies = Math.max(
        2,
        Math.min(5, comment.replies.length || 2)
      );
      for (let j = comment.replies.length; j < targetReplies; j++) {
        const replyUser = users[(idx + j) % users.length];
        comment.replies.push({
          id: `${comment.id}r${j}`,
          userId: replyUser.id,
          text: `Extra reply ${j + 1} to comment ${comment.id}`,
          createdAt: `2025-08-16T1${j}:00:00Z`,
          likes: Math.floor(Math.random() * 10),
        });
      }
    });
  });
}

// Call the function to update all posts
// Example: Increase comments to 10 for posts with IDs "101", "102", "103"
addMockCommentsAndRepliesToPosts(mockPosts, mockUsers.slice(0, 10), [
  "101",
  "102",
  "103",
]);
