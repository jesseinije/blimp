import type { User } from "../types";

export const createUserInfo = (
  users: User[],
  userId: string
): {
  id: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
  isVerified?: boolean;
} => {
  const user = users.find((u) => u.id === userId);

  // Force isFollowing to be true for Donald Trump (userId: "6") to hide the Follow button
  const isFollowing = userId === "6" ? true : Math.random() > 0.5;

  return {
    id: userId,
    username: user?.username || "",
    avatar: user?.avatar || "",
    isFollowing: isFollowing,
    isVerified: user?.isVerified,
  };
};
