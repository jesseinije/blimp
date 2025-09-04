import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppStore } from "./store/appStore";
import Layout from "./components/layout/Layout";
import "./App.css";
import { useViewportHeight } from "./hooks/useViewportHeight"; // <-- Add this line

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const ExplorePage = lazy(() => import("./pages/ExplorePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const PostCreationPage = lazy(() => import("./pages/PostCreationPage"));
const PostCaptionPage = lazy(() => import("./pages/PostCaptionPage"));
// const TextPostPage = lazy(() => import("./pages/TextPostPage"));
const PostPage = lazy(() => import("./pages/PostPage"));
const VideoPage = lazy(() => import("./pages/VideoPage"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const PrivateChatPage = lazy(() => import("./pages/PrivateChatPage")); // Add this line

function App() {
  const { isDarkMode } = useAppStore();
  useViewportHeight(); // <-- Add this line
  return (
    <Router>
      <div className={isDarkMode ? "dark" : ""}>
        <Layout>
          <Suspense
            fallback={<div className="flex justify-center p-8">Loading...</div>}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/:username" element={<UserProfile />} />
              <Route path="/create" element={<PostCreationPage />} />
              <Route path="/caption" element={<PostCaptionPage />} />
              {/* <Route path="/text-post" element={<TextPostPage />} /> */}
              <Route path="/post/:postId" element={<PostPage />} />
              <Route path="/video/:videoId" element={<VideoPage />} />
              <Route path="/chat/:userId" element={<PrivateChatPage />} />{" "}
              {/* Add this route */}
              {/* Add more routes as needed */}
            </Routes>
          </Suspense>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
