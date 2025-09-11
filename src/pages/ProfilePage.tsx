import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <-- Add this import

import { CheckCircle, Link } from "phosphor-react";

import { mockUsers, mockPosts, getPostsByUserId } from "../data/mockData";
import PageHeader from "../components/layout/PageHeader";
import EmptyState from "../components/ui/EmptyState";
import ExploreGrid from "../components/explore/ExploreGrid";
import { ProfileSkeleton } from "../components/ui/skeletons/ProfileSkeleton";
import { SkeletonProvider } from "../components/ui/skeletons/SkeletonProvider";
import { Grid, AtSymbol, Film, UserAdd } from "../Icons";
import ImageViewer from "../components/ui/ImageViewer"; // Import the ImageViewer component

// Add showBackButton to the component props
interface ProfilePageProps {
  showBackButton?: boolean;
  username?: string; // Optional username for viewing other profiles
  hideSettings?: boolean; // Add this new prop
}

const ProfilePage = ({
  showBackButton = false,
  username,
  hideSettings = false, // Add default value
}: ProfilePageProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMentions, setHasMentions] = useState(false);
  const [isAvatarPreviewOpen, setIsAvatarPreviewOpen] = useState(false);

  const navigate = useNavigate(); // <-- Add this line

  // Find user by username from mockUsers
  const findUserByUsername = () => {
    if (!username) {
      // Use user id "115" as the default current user
      const defaultUser = mockUsers.find((u) => u.id === "115");
      return defaultUser
        ? { ...defaultUser }
        : {
            id: "115",
            username: "iniya_ekenebe",
            displayName: "Iniya Ekenebe",
            avatar: "",
            bio: "",
            followers: 0,
            following: 0,
            isVerified: false,
          };
    }

    // Find user with matching username
    const foundUser = mockUsers.find(
      (u) => u.username && u.username.toLowerCase() === username.toLowerCase()
    );

    if (foundUser) {
      return foundUser;
    }

    // If user not found, return a default user with the requested username
    const baseUser = mockUsers.find((u) => u.id === "115");
    return {
      ...baseUser,
      displayName: username,
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
  const userPosts = user ? getPostsByUserId(user.id ?? "") : mockPosts;

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

  const handleSettingsClick = () => {
    console.log("Settings clicked");
    // Implement your settings functionality here
  };

  // Function to handle opening the avatar preview
  const handleAvatarClick = () => {
    setIsAvatarPreviewOpen(true);
  };

  // Handler to open UserPostsPage
  const handlePostClick = () => {
    if (user?.id) {
      navigate(`/user/${user.id}/posts`);
    }
  };

  // Handler to open UserReelsPage
  const handleVideoClick = () => {
    if (user?.id) {
      navigate(`/user/${user.id}/reels`);
    }
  };

  if (isLoading) {
    return (
      <SkeletonProvider>
        <ProfileSkeleton />
      </SkeletonProvider>
    );
  }

  // Determine avatar URL or use placeholder
  const avatarUrl =
    user.avatar || "https://via.placeholder.com/150?text=Profile";

  return (
    <div className="pb-16 bg-white text-gray-900">
      <PageHeader
        title=""
        showBackButton={showBackButton}
        rightIcon={hideSettings ? "none" : "settings"}
        onRightIconClick={handleSettingsClick}
      />

      {/* Profile Header - Improved vertical spacing */}
      <div className="flex flex-col items-center pt-8 px-3 space-y-4">
        {/* Profile Image with story ring - Adjusted margin */}
        <div
          className="w-24 h-24 rounded-full overflow-hidden cursor-pointer"
          onClick={handleAvatarClick}
          role="button"
          aria-label="View profile picture"
        >
          <img
            src={avatarUrl}
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

        {/* Avatar preview modal */}
        <ImageViewer
          isOpen={isAvatarPreviewOpen}
          onClose={() => setIsAvatarPreviewOpen(false)}
          imageUrl={avatarUrl}
          altText={`${user.displayName}'s profile picture`}
        />

        {/* Stats section */}
        <div className="grid grid-cols-3 w-full max-w-md px-4">
          <div className="flex flex-col items-center py-4 space-y-1 relative">
            <span className="text-base font-bold text-gray-900 truncate">
              {formatNumber(user.followers)}
            </span>
            <span className="text-gray-400 text-sm">Followers</span>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-gray-200"></div>
          </div>
          <div className="flex flex-col items-center py-4 space-y-1 relative">
            <span className="text-base font-bold text-gray-900 truncate">
              {formatNumber(user.following)}
            </span>
            <span className="text-gray-400 text-sm">Following</span>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-gray-200"></div>
          </div>
          <div className="flex flex-col items-center py-4 space-y-1">
            <span className="text-base font-bold text-gray-900 truncate">
              {formatNumber(imagePosts.length + videoPosts.length)}
            </span>
            <span className="text-gray-400 text-sm">Posts</span>
          </div>
        </div>

        {/* Bio section - Only render if bio or link exists */}
        {(user.bio?.trim() || user.link) && (
          <div className="text-center max-w-md space-y-2">
            {user.bio?.trim() && (
              <p className="text-sm leading-relaxed text-gray-900 mx-auto max-w-xs">
                {user.bio}
              </p>
            )}
            {user.link && (
              <a
                href={user.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-500 text-sm hover:underline"
              >
                <Link size={22} className="text-blue-500" />
                {user.link.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>
        )}

        {/* Action Buttons with improved styling */}
        <div className="flex gap-2 w-full max-w-md mb-8 text-base">
          <button className="flex-1 bg-blue-500 transition-colors text-white py-2.5 rounded-lg font-medium ">
            Follow
          </button>
          <button className="flex-1  bg-gray-100  py-2.5 rounded-lg font-medium">
            Message
          </button>
          <button className="w-14 bg-gray-100 transition-colors py-2.5 rounded-lg flex items-center justify-center">
            <UserAdd size={26} />
          </button>
        </div>
      </div>

      {/* Custom Tabs Navigation with improved interaction */}
      <div>
        <div className="flex mt-4 border-b border-gray-200">
          <button
            onClick={() => setSelectedTab(0)}
            className={`flex-1 py-2 relative flex justify-center transition-colors ${
              selectedTab === 0 ? "text-gray-900" : "text-gray-400"
            }`}
            data-tab="posts"
          >
            <Grid size={26} weight={selectedTab === 0 ? "fill" : "regular"} />
            {selectedTab === 0 && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-blue-500 rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => setSelectedTab(1)}
            className={`flex-1 py-2 relative flex justify-center transition-colors ${
              selectedTab === 1 ? "text-gray-900" : "text-gray-400"
            }`}
            data-tab="videos"
          >
            <Film size={26} weight={selectedTab === 1 ? "fill" : "regular"} />
            {selectedTab === 1 && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-blue-500 rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => setSelectedTab(2)}
            className={`flex-1 py-2 relative flex justify-center transition-colors ${
              selectedTab === 2 ? "text-gray-900" : "text-gray-400"
            }`}
            data-tab="mentions"
          >
            <AtSymbol
              size={26}
              weight={selectedTab === 2 ? "bold" : "regular"}
            />
            {selectedTab === 2 && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-blue-500 rounded-full"></span>
            )}
          </button>
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
                  onPostClick={handlePostClick}
                  showViewCountOverlay={true} // <-- Add this line
                />
              ) : (
                <EmptyState
                  title="No Posts Yet"
                  description={
                    username
                      ? `${user.displayName} hasn't posted any photos yet.`
                      : "You haven't posted any photos yet."
                  }
                  action={
                    !username && (
                      <button className="text-white bg-blue-500 transition-colors py-2 px-4 rounded-lg text-sm font-medium">
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
                  onPostClick={handleVideoClick}
                  showViewCountOverlay={true} // <-- Add this line
                />
              ) : (
                <EmptyState
                  title="No Videos Yet"
                  description={
                    username
                      ? `${user.displayName} hasn't posted any videos yet.`
                      : "You haven't posted any videos yet."
                  }
                  action={
                    !username && (
                      <button className="text-white bg-blue-500 transition-colors py-2 px-4 rounded-lg text-sm font-medium">
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
                <EmptyState
                  title="Mentions are private"
                  description={`Only ${user.displayName} can see the posts they've been mentioned in.`}
                  className="h-96"
                />
              ) : (
                <>
                  {!hasMentions ? (
                    <EmptyState
                      title="No Mentions Yet"
                      description="When people mention you in their posts or comments, they'll appear here."
                      action={
                        <button
                          className="text-blue-500 text-sm font-medium"
                          onClick={() => setHasMentions(true)}
                        >
                          Learn More
                        </button>
                      }
                      className="h-96"
                    />
                  ) : (
                    <div className="grid grid-cols-3 gap-0.5">
                      {/* Mentions grid content */}
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
