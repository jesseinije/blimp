import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppStore } from "./store/appStore";
import Layout from "./components/layout/Layout";
import "./App.css";
import { useViewportHeight } from "./hooks/useViewportHeight";

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const ExplorePage = lazy(() => import("./pages/ExplorePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const PostCreationPage = lazy(() => import("./pages/PostCreationPage"));
const PostCaptionPage = lazy(() => import("./pages/PostCaptionPage"));
const PostPage = lazy(() => import("./pages/PostPage"));
const VideoPage = lazy(() => import("./pages/VideoPage"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const PrivateChatPage = lazy(() => import("./pages/PrivateChatPage"));
const SuggestedAccountPage = lazy(() => import("./pages/SuggestedAccountPage"));
const ReelsPage = lazy(() => import("./pages/ReelsPage"));
const DirectMessages = lazy(() => import("./pages/DirectMessages"));
const UserPostsPage = lazy(() => import("./pages/UserPostsPage"));
const UserReelsPage = lazy(() => import("./pages/UserReelsPage")); // <-- Add this line

// A more accessible loading fallback
const LoadingFallback = () => (
  <div
    className="h-screen w-full bg-white flex items-center justify-center"
    aria-live="polite"
    aria-busy="true"
  >
    {/* Screen reader only text */}
    <span className="sr-only">Loading content...</span>

    {/* You could add a subtle loading indicator here if desired */}
    {/* <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div> */}
  </div>
);

function App() {
  const { isDarkMode } = useAppStore();
  useViewportHeight();

  return (
    <Router>
      <div className={isDarkMode ? "dark" : ""}>
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/messages" element={<DirectMessages />} />
              <Route
                path="/suggested-accounts"
                element={<SuggestedAccountPage />}
              />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/:username" element={<UserProfile />} />
              <Route path="/create" element={<PostCreationPage />} />
              <Route path="/caption" element={<PostCaptionPage />} />
              <Route path="/post/:postId" element={<PostPage />} />
              <Route path="/video/:videoId" element={<VideoPage />} />
              <Route path="/chat/:userId" element={<PrivateChatPage />} />
              <Route path="/reels" element={<ReelsPage />} />
              <Route path="/user/:userId/posts" element={<UserPostsPage />} />
              <Route
                path="/user/:userId/reels"
                element={<UserReelsPage />}
              />{" "}
              {/* <-- Add this line */}
            </Routes>
          </Suspense>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
