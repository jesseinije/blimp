import { useState, useEffect } from "react";

import {
  CheckCircle,
  UserPlus,
  Link,
  ChatDots,
  Image,
  FileVideo,
  Lock,
} from "phosphor-react";
import { mockUsers, mockPosts, getPostsByUserId } from "../data/mockData";
import PageHeader from "../components/layout/PageHeader";
import EmptyState from "../components/ui/EmptyState";
import ExploreGrid from "../components/explore/ExploreGrid";
import { ProfileSkeleton } from "../components/ui/skeletons/ProfileSkeleton";
import { SkeletonProvider } from "../components/ui/skeletons/SkeletonProvider";

// Add showBackButton to the component props
interface ProfilePageProps {
  showBackButton?: boolean;
  username?: string; // Optional username for viewing other profiles
}

const ProfilePage = ({
  showBackButton = false,
  username,
}: ProfilePageProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMentions, setHasMentions] = useState(false);

  // Find user by username from mockUsers
  const findUserByUsername = () => {
    if (!username) {
      // If no username provided, use the default user (current user)
      return {
        ...mockUsers[4], // Use Foodie Lover as base
        displayName: "Your Profile", // Default display name
        username: "your_profile",
        isVerified: true,
        bio: "This is your profile.",
        followers: 250000,
        following: 180,
      };
    }

    // Find user with matching username
    const foundUser = mockUsers.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );

    if (foundUser) {
      return foundUser;
    }

    // If user not found, return a default user with the requested username
    return {
      ...mockUsers[4], // Use Foodie Lover as base
      displayName: username, // Use the username as display name
      username: username,
      isVerified: false,
      bio: "User profile",
      followers: 0,
      following: 0,
    };
  };

  // Get the user data
  const user = findUserByUsername();

  // Get posts for this user
  const userPosts = user ? getPostsByUserId(user.id) : mockPosts;

  // Filter posts by media type
  const imagePosts = userPosts.filter((post) =>
    post.media.some((item) => item.type === "image")
  );

  const videoPosts = userPosts.filter((post) =>
    post.media.some((item) => item.type === "video")
  );

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`;
    }
    return num.toString();
  };

  // Custom tabs implementation
  const tabs = ["Posts", "Videos", "Mentions"];

  const handleSettingsClick = () => {
    console.log("Settings clicked");
    // Implement your settings functionality here
  };

  if (isLoading) {
    return (
      <SkeletonProvider>
        <ProfileSkeleton />
      </SkeletonProvider>
    );
  }

  return (
    <div className="pb-16 bg-white text-gray-900">
      <PageHeader
        title={username ? user.displayName : "Profile"}
        showBackButton={showBackButton}
        rightIcon="settings"
        onRightIconClick={handleSettingsClick}
      />

      {/* Profile Header - Improved vertical spacing */}
      <div className="flex flex-col items-center pt-8 px-3 space-y-4">
        {/* Profile Image with story ring - Adjusted margin */}
        <div className="w-24 h-24 rounded-full overflow-hidden ">
          <img
            src={user.avatar || "https://via.placeholder.com/150?text=Profile"}
            alt={`${user.displayName}'s profile`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/150?text=Profile";
            }}
          />
        </div>

        {/* User info container - Better spacing */}
        <div className="flex flex-col items-center space-y-1">
          <div className="flex items-center gap-1">
            <h1 className="text-xl font-bold text-gray-900">
              {user.displayName}
            </h1>
            {user.isVerified && (
              <CheckCircle size={24} weight="fill" className="text-blue-500" />
            )}
          </div>

          <p className="text-gray-400">@{user.username}</p>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-3 w-full max-w-md px-4">
          <div className="flex flex-col items-center py-4 space-y-1 relative">
            <span className="text-base font-bold text-gray-900 truncate">
              {formatNumber(user.followers)}
            </span>
            <span className="text-gray-900 text-sm">Followers</span>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-gray-200"></div>
          </div>
          <div className="flex flex-col items-center py-4 space-y-1 relative">
            <span className="text-base font-bold text-gray-900 truncate">
              {formatNumber(user.following)}
            </span>
            <span className="text-gray-900 text-sm">Following</span>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-gray-200"></div>
          </div>
          <div className="flex flex-col items-center py-4 space-y-1">
            <span className="text-base font-bold text-gray-900 truncate">
              {formatNumber(imagePosts.length + videoPosts.length)}
            </span>
            <span className="text-gray-900 text-sm">Posts</span>
          </div>
        </div>

        {/* Bio section - Adjusted spacing */}
        <div className="text-center max-w-md space-y-2">
          <p className="text-sm leading-relaxed text-gray-900">{user.bio}</p>
          {user.id && (
            <a
              href={`https://www.${user.username}.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-500 text-sm font-medium hover:underline"
            >
              <Link size={24} className="text-blue-500" />
              {user.username}.com
            </a>
          )}
        </div>

        {/* Action Buttons with improved styling */}
        <div className="flex gap-2 w-full max-w-md mb-8 text-base">
          <button className="flex-1 bg-blue-500 hover:bg-blue-600 transition-colors text-white py-2.5 rounded-lg font-medium ">
            Message
          </button>
          <button className="flex-1  bg-gray-100  py-2.5 rounded-lg font-medium">
            Following
          </button>
          <button className="w-14 bg-gray-100 transition-colors py-2.5 rounded-lg flex items-center justify-center">
            <UserPlus size={24} />
          </button>
        </div>
      </div>

      {/* Custom Tabs Navigation with improved interaction */}
      <div>
        <div className="flex border-b border-gray-200">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(index)}
              className={`flex-1 py-3.5 text-center font-medium transition-colors ${
                selectedTab === index
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Panels with improved grid and animation */}
        <div className="mt-0.5">
          {selectedTab === 0 && (
            <>
              {imagePosts.length > 0 ? (
                <ExploreGrid
                  posts={imagePosts}
                  showUserInfo={false}
                  showPinnedIcon={true}
                />
              ) : (
                <EmptyState
                  icon={<Image size={32} className="text-gray-300" />}
                  title="No Posts Yet"
                  description={
                    username
                      ? `${user.displayName} hasn't posted any photos yet.`
                      : "You haven't posted any photos yet."
                  }
                  action={
                    !username && (
                      <button className="text-white bg-blue-500 hover:bg-blue-600 transition-colors py-2 px-4 rounded-lg text-sm font-medium">
                        Create New Post
                      </button>
                    )
                  }
                  className="h-96"
                />
              )}
            </>
          )}

          {selectedTab === 1 && (
            <>
              {videoPosts.length > 0 ? (
                <ExploreGrid
                  posts={videoPosts}
                  showUserInfo={false}
                  showPinnedIcon={true}
                />
              ) : (
                <EmptyState
                  icon={<FileVideo size={32} className="text-gray-300" />}
                  title="No Videos Yet"
                  description={
                    username
                      ? `${user.displayName} hasn't posted any videos yet.`
                      : "You haven't posted any videos yet."
                  }
                  action={
                    !username && (
                      <button className="text-white bg-blue-500 hover:bg-blue-600 transition-colors py-2 px-4 rounded-lg text-sm font-medium">
                        Create New Video
                      </button>
                    )
                  }
                  className="h-96"
                />
              )}
            </>
          )}

          {selectedTab === 2 && (
            <>
              {username ? (
                // When viewing someone else's profile, show privacy message
                <EmptyState
                  icon={<Lock size={32} className="text-gray-300" />}
                  title="Mentions are private"
                  description={`Only ${user.displayName} can see the posts they've been mentioned in.`}
                  className="h-96"
                />
              ) : (
                // When viewing own profile, show the existing mentions logic
                <>
                  {!hasMentions ? (
                    <EmptyState
                      icon={<ChatDots size={32} className="text-gray-300" />}
                      title="No Mentions Yet"
                      description="When people mention you in their posts or comments, they'll appear here."
                      action={
                        <button
                          className="text-blue-500 text-sm font-medium"
                          onClick={() => setHasMentions(true)} // For demo purposes - toggle to show mentions
                        >
                          Learn More
                        </button>
                      }
                      className="h-96" // Taller height to fill the space
                    />
                  ) : (
                    <div className="grid grid-cols-3 gap-0.5">
                      {/* Mentions grid content - Using aspect-[3/4] like ExploreGrid */}
                      {imagePosts.slice(0, 3).map((post, index) => (
                        <div
                          key={`mention-${index}`}
                          className="aspect-[3/4] bg-gray-100 overflow-hidden relative group"
                        >
                          <img
                            src={post.media[0].url}
                            alt="Mention thumbnail"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                            <div className="flex items-center">
                              <img
                                src={post.user.avatar}
                                alt={post.user.username}
                                className="w-5 h-5 rounded-full mr-1.5 border border-white"
                              />
                              <span className="text-white text-xs font-medium truncate">
                                {post.user.username}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
