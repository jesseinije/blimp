import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  At,
  CaretLeft, // Add this for back button
  CheckCircle,
  Globe,
  Hash,
  Lock,
  MapPin,
  Spinner,
  User,
  Users,
  X,
} from "phosphor-react";
import BottomSheet from "../components/ui/BottomSheet";

interface PostCaptionPageProps {
  videoSrc?: string; // Source of the recorded video
  thumbnailSrc?: string; // Optional thumbnail preview
}

type AudienceType = "public" | "followers" | "private";
type MentionedUser = {
  id: string;
  username: string;
  avatar: string;
};

const PLACEHOLDER_VIDEO = "/src/assets/videos/test.mp4";
const PLACEHOLDER_THUMBNAIL = "/src/assets/images/testPhoto1.webp";

const MAX_FILES = 10; // Maximum number of files allowed

const PostCaptionPage = ({
  videoSrc = PLACEHOLDER_VIDEO,
  thumbnailSrc = PLACEHOLDER_THUMBNAIL,
}: PostCaptionPageProps) => {
  const navigate = useNavigate();
  const captionRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  // States
  const [caption, setCaption] = useState<string>("");
  const [locationState, setLocationState] = useState<string>("");
  const [audience, setAudience] = useState<AudienceType>("public");
  const [mentionedUsers, setMentionedUsers] = useState<MentionedUser[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isLocationSheetOpen, setIsLocationSheetOpen] =
    useState<boolean>(false);
  const [isAudienceSheetOpen, setIsAudienceSheetOpen] =
    useState<boolean>(false);
  const [isMentionSheetOpen, setIsMentionSheetOpen] = useState<boolean>(false);
  const [locationSearchTerm, setLocationSearchTerm] = useState<string>("");
  const [mentionSearchTerm, setMentionSearchTerm] = useState<string>("");
  const [isPostingInProgress, setIsPostingInProgress] =
    useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const mode = location.state?.mode || "video"; // default to "video" if not specified
  const headerTitle = mode === "post" ? "Create post" : "Add caption";

  // Mock data for location suggestions
  const locationSuggestions = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "San Francisco, CA",
    "Miami, FL",
    "Seattle, WA",
  ].filter((loc) =>
    loc.toLowerCase().includes(locationSearchTerm.toLowerCase())
  );

  // Mock data for user suggestions
  const userSuggestions = [
    {
      id: "1",
      username: "john_doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "2",
      username: "jane_smith",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: "3",
      username: "mike_wilson",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: "4",
      username: "sarah_jones",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: "5",
      username: "alex_brown",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ].filter((user) =>
    user.username.toLowerCase().includes(mentionSearchTerm.toLowerCase())
  );

  // Focus caption input on component mount
  useEffect(() => {
    if (captionRef.current) {
      captionRef.current.focus();
    }
  }, []);

  // Extract hashtags from caption
  useEffect(() => {
    const extractedHashtags = caption.match(/#[\w]+/g) || [];
    setHashtags(extractedHashtags);
  }, [caption]);

  // Use handleBack function from Comment page
  const handleBack = () => {
    navigate(-1);
  };

  const handleSaveAsDraft = () => {
    console.log("Saving as draft:", {
      caption,
      location: locationState,
      audience,
      mentionedUsers,
      hashtags,
    });
    // In a real app, save to local storage or backend
    navigate("/"); // Navigate to home
  };

  const handlePost = () => {
    setIsPostingInProgress(true);
    console.log("Posting:", {
      caption,
      location: locationState,
      audience,
      mentionedUsers,
      hashtags,
    });

    // Simulate API call delay
    setTimeout(() => {
      setIsPostingInProgress(false);
      navigate("/"); // Navigate to home after successful post
    }, 1500);
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setLocationState(selectedLocation);
    setIsLocationSheetOpen(false);
  };

  const handleAudienceSelect = (selectedAudience: AudienceType) => {
    setAudience(selectedAudience);
    setIsAudienceSheetOpen(false);
  };

  const handleUserMention = (user: MentionedUser) => {
    if (!mentionedUsers.some((u) => u.id === user.id)) {
      setMentionedUsers([...mentionedUsers, user]);
    }
    setIsMentionSheetOpen(false);

    // Insert @username into caption at cursor position if textarea is focused
    if (captionRef.current && document.activeElement === captionRef.current) {
      const cursorPos = captionRef.current.selectionStart;
      const textBefore = caption.substring(0, cursorPos);
      const textAfter = caption.substring(cursorPos);
      const newCaption = `${textBefore}@${user.username} ${textAfter}`;
      setCaption(newCaption);

      // Set cursor position after inserted mention
      setTimeout(() => {
        const newCursorPos = cursorPos + user.username.length + 2; // +2 for @ and space
        captionRef.current!.selectionStart = newCursorPos;
        captionRef.current!.selectionEnd = newCursorPos;
      }, 0);
    }
  };

  const removeMentionedUser = (userId: string) => {
    setMentionedUsers(mentionedUsers.filter((user) => user.id !== userId));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const validFiles = Array.from(files).filter((file) => {
      // Check file type
      if (!file.type.match(/^(image|video)\//)) {
        alert("Please upload only images or videos.");
        return false;
      }

      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert("Files must be less than 10MB.");
        return false;
      }

      return true;
    });

    const remainingSlots = MAX_FILES - selectedFiles.length;
    const newFiles = validFiles.slice(0, remainingSlots);

    if (newFiles.length + selectedFiles.length > MAX_FILES) {
      alert(`You can only upload up to ${MAX_FILES} files.`);
    }

    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  // UI elements for audience types
  const audienceIcons = {
    public: <Globe className="w-5 h-5" />,
    followers: <Users className="w-5 h-5" />,
    private: <Lock className="w-5 h-5" />,
  };

  const audienceLabels = {
    public: "Everyone",
    followers: "Followers only",
    private: "Only me",
  };

  const renderStyledCaption = () => {
    // Replace mentions and hashtags with colored spans
    const coloredText = caption.replace(
      /(@\w+|#\w+)/g,
      '<span class="text-blue-500">$1</span>'
    );
    return { __html: coloredText };
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header - copied from Comment page */}
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex items-center h-12 px-3">
          <button
            onClick={handleBack}
            className="mr-6 text-gray-900"
            aria-label="Back"
          >
            <CaretLeft size={24} weight="bold" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">{headerTitle}</h1>
        </div>
      </div>

      {/* Main Content - Keep the existing content */}
      <div className="p-3 pb-20 flex-1 overflow-auto">
        {/* Media Upload and Preview Section */}
        <div className="  pb-4">
          {/* Media Grid */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {mode === "post" ? (
              // Only show Add media button in post mode
              <button
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:border-gray-400 transition-colors"
              >
                <svg
                  className="w-8 h-8 text-gray-400 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span className="text-xs text-gray-400">Add media</span>
              </button>
            ) : (
              // ...existing media grid code for video mode...
              <>
                {selectedFiles.length === 0 && (
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                    {mode === "video" ? (
                      <video
                        src={videoSrc}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={thumbnailSrc}
                        alt="Media preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                )}
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 "
                  >
                    {file.type.startsWith("video/") ? (
                      <div className="h-full">
                        <video
                          src={URL.createObjectURL(file)}
                          className="w-full h-full object-cover"
                        />
                        {/* Video indicator */}
                        <div className="absolute top-2 right-2 bg-gray-900/50 rounded-full p-1">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {/* Remove button */}
                    <button
                      onClick={() => {
                        setSelectedFiles((files) =>
                          files.filter((_, i) => i !== index)
                        );
                      }}
                      className="absolute top-2 left-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <X size={16} className="text-white" />
                    </button>
                  </div>
                ))}
                {selectedFiles.length < MAX_FILES && (
                  // ...existing Add more button code...
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-lg border-2 border-dashed border-gray-300  flex flex-col items-center justify-center hover:border-gray-400  transition-colors"
                  >
                    <svg
                      className="w-8 h-8 text-gray-400  mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span className="text-xs text-gray-400">
                      {selectedFiles.length === 0 ? "Add media" : "Add more"}
                    </span>
                  </button>
                )}
              </>
            )}
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*,video/*"
            className="hidden"
            multiple
          />

          {/* Caption Input */}
          <div className="relative">
            <textarea
              ref={captionRef}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a caption..."
              className="w-full h-20 text-transparent bg-transparent placeholder-gray-400  resize-none focus:outline-none text-base absolute inset-0 caret-gray-900 "
              maxLength={2200}
            />
            <div
              dangerouslySetInnerHTML={renderStyledCaption()}
              className="w-full h-20 text-gray-900  text-base pointer-events-none whitespace-pre-wrap break-words"
            />
            <div className="flex justify-end">
              <span className="text-xs text-gray-400">
                {caption.length}/2200
              </span>
            </div>
          </div>
        </div>

        {/* Quick access buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <button
            className="flex items-center space-x-1.5 bg-gray-100  px-3.5 py-2 rounded-full"
            onClick={() => {
              if (captionRef.current) {
                const cursorPos = captionRef.current.selectionStart;
                const textBefore = caption.substring(0, cursorPos);
                const textAfter = caption.substring(cursorPos);
                const newCaption = `${textBefore}@ ${textAfter}`;
                setCaption(newCaption);
                captionRef.current.focus();

                // Set cursor position after @ but before space
                setTimeout(() => {
                  const newCursorPos = cursorPos + 1;
                  captionRef.current!.selectionStart = newCursorPos;
                  captionRef.current!.selectionEnd = newCursorPos;
                }, 0);
              }
            }}
          >
            <At className="w-4 h-4 text-gray-900 " />
            <span className="text-sm text-gray-900">Mention</span>
          </button>
          <button
            className="flex items-center space-x-1.5 bg-gray-100 px-3.5 py-2 rounded-full"
            onClick={() => {
              if (captionRef.current) {
                const cursorPos = captionRef.current.selectionStart;
                const textBefore = caption.substring(0, cursorPos);
                const textAfter = caption.substring(cursorPos);
                const newCaption = `${textBefore}# ${textAfter}`;
                setCaption(newCaption);
                captionRef.current.focus();

                // Set cursor position after # but before space
                setTimeout(() => {
                  const newCursorPos = cursorPos + 1;
                  captionRef.current!.selectionStart = newCursorPos;
                  captionRef.current!.selectionEnd = newCursorPos;
                }, 0);
              }
            }}
          >
            <Hash className="w-4 h-4 text-gray-900" />
            <span className="text-sm text-gray-900">Hashtag</span>
          </button>
        </div>

        {/* Hashtags preview */}
        {hashtags.length > 0 && (
          <div className="mb-6 border-b border-gray-200  pb-4">
            <h3 className="text-sm font-medium text-gray-900  mb-2.5 flex items-center">
              <Hash className="w-4 h-4 mr-1.5 text-gray-900 " />
              Hashtags
            </h3>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, index) => (
                <span
                  key={`tag-${index}`}
                  className="border border-gray-200  text-gray-900  text-xs px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Mentioned users preview */}
        {mentionedUsers.length > 0 && (
          <div className="mb-6 border-b border-gray-200 pb-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2.5 flex items-center">
              <At className="w-4 h-4 mr-1.5 text-gray-900" />
              Mentioned Users
            </h3>
            <div className="flex flex-wrap gap-2">
              {mentionedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center border border-gray-200 pl-2 pr-1 py-1 rounded-full"
                >
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-5 h-5 rounded-full mr-1.5"
                  />
                  <span className="text-sm text-gray-900  mr-1">
                    @{user.username}
                  </span>
                  <button
                    onClick={() => removeMentionedUser(user.id)}
                    className="w-5 h-5 flex items-center justify-center text-gray-900 "
                  >
                    <X size={14} className="text-current" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Section */}
        <div className="space-y-4 mt-6 mb-20">
          <h3 className="text-sm font-medium text-gray-900 ">Post Settings</h3>

          <div className="border border-gray-200  rounded-xl overflow-hidden">
            {/* Location */}
            <button
              onClick={() => setIsLocationSheetOpen(true)}
              className="flex items-center justify-between w-full px-4 py-3.5 border-b border-gray-200 "
            >
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-900 mr-3" />
                <span className="text-gray-900 ">Add location</span>
              </div>
              <span className="text-gray-400 text-sm">
                {locationState || "None"}
              </span>
            </button>

            {/* Audience */}
            <button
              onClick={() => setIsAudienceSheetOpen(true)}
              className="flex items-center justify-between w-full px-4 py-3.5 border-b border-gray-200 "
            >
              <div className="flex items-center">
                {audienceIcons[audience]}
                <span className="text-gray-900  ml-3">Audience</span>
              </div>
              <span className="text-gray-400 text-sm">
                {audienceLabels[audience]}
              </span>
            </button>

            {/* Mentions */}
            <button
              onClick={() => setIsMentionSheetOpen(true)}
              className="flex items-center justify-between w-full px-4 py-3.5"
            >
              <div className="flex items-center">
                <At className="w-5 h-5 text-gray-900  mr-3" />
                <span className="text-gray-900 ">Mention people</span>
              </div>
              <span className="text-gray-400 text-sm">
                {mentionedUsers.length > 0
                  ? `${mentionedUsers.length} people`
                  : "None"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons - Fixed at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-3 z-10">
        <div className="flex gap-2 w-full max-w-md mx-auto">
          <button
            onClick={handleSaveAsDraft}
            disabled={isPostingInProgress}
            className="flex-1 border border-gray-300 py-2.5 rounded-lg font-medium disabled:opacity-50"
          >
            Save as draft
          </button>
          <button
            onClick={handlePost}
            disabled={isPostingInProgress || caption.length === 0}
            className="flex-1 bg-blue-500 hover:bg-blue-600 transition-colors text-white py-2.5 rounded-lg font-medium shadow-sm disabled:opacity-50 flex items-center justify-center"
          >
            {isPostingInProgress ? (
              <>
                <Spinner className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Posting...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-1.5" />
                Post
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Sheets */}
      {/* Update the bottom sheets similarly by removing background colors and standardizing icon colors */}
      {/* ... Keep the same structure but update the styling classes similar to above */}

      {/* Location Bottom Sheet */}
      <BottomSheet
        isOpen={isLocationSheetOpen}
        onClose={() => setIsLocationSheetOpen(false)}
        title="Add Location"
        height="half"
      >
        <div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search for a location..."
              value={locationSearchTerm}
              onChange={(e) => setLocationSearchTerm(e.target.value)}
              className="w-full px-4 py-3.5 border border-gray-200  rounded-xl focus:outline-none "
            />
          </div>

          {locationSuggestions.length > 0 ? (
            <div className="space-y-2">
              {locationSuggestions.map((loc, index) => (
                <button
                  key={`loc-${index}`}
                  onClick={() => handleLocationSelect(loc)}
                  className="flex items-center w-full px-4 py-3.5 border border-gray-200 rounded-xl"
                >
                  <MapPin className="w-5 h-5 text-gray-900  mr-3" />
                  <span className="text-gray-900">{loc}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MapPin className="w-6 h-6 text-gray-400  mb-3" />
              <p className="text-gray-400">No locations found</p>
              <p className="text-xs text-gray-400  mt-1">
                Try a different search term
              </p>
            </div>
          )}
        </div>
      </BottomSheet>

      {/* Audience Bottom Sheet */}
      <BottomSheet
        isOpen={isAudienceSheetOpen}
        onClose={() => setIsAudienceSheetOpen(false)}
        title="Choose Audience"
      >
        <div className="p-4 space-y-2">
          <button
            onClick={() => handleAudienceSelect("public")}
            className="flex items-center justify-between w-full px-4 py-3.5 border border-gray-200  rounded-xl"
          >
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-gray-900  mr-3" />
              <div>
                <h4 className="text-gray-900  font-medium">Everyone</h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Anyone can see this post
                </p>
              </div>
            </div>
            {audience === "public" && (
              <CheckCircle weight="fill" className="w-5 h-5 text-blue-600 " />
            )}
          </button>

          <button
            onClick={() => handleAudienceSelect("followers")}
            className="flex items-center justify-between w-full px-4 py-3.5 border border-gray-200  rounded-xl"
          >
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-900  mr-3" />
              <div>
                <h4 className="text-gray-900  font-medium">Followers only</h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Only your followers can see this post
                </p>
              </div>
            </div>
            {audience === "followers" && (
              <CheckCircle weight="fill" className="w-5 h-5 text-blue-500 " />
            )}
          </button>

          <button
            onClick={() => handleAudienceSelect("private")}
            className="flex items-center justify-between w-full px-4 py-3.5 border border-gray-200  rounded-xl"
          >
            <div className="flex items-center">
              <Lock className="w-5 h-5 text-gray-900  mr-3" />
              <div>
                <h4 className="text-gray-900  font-medium">Only me</h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Only you can see this post
                </p>
              </div>
            </div>
            {audience === "private" && (
              <CheckCircle weight="fill" className="w-5 h-5 text-blue-500" />
            )}
          </button>
        </div>
      </BottomSheet>

      {/* Mentions Bottom Sheet */}
      <BottomSheet
        isOpen={isMentionSheetOpen}
        onClose={() => setIsMentionSheetOpen(false)}
        title="Mention People"
        height="half"
      >
        <div className="p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search for a person..."
              value={mentionSearchTerm}
              onChange={(e) => setMentionSearchTerm(e.target.value)}
              className="w-full px-4 py-3.5 border border-gray-200  rounded-xl focus:outline-none "
            />
          </div>

          {userSuggestions.length > 0 ? (
            <div className="space-y-2">
              {userSuggestions.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleUserMention(user)}
                  className="flex items-center justify-between w-full px-4 py-3 border border-gray-200 rounded-xl"
                >
                  <div className="flex items-center">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-10 h-10 rounded-full mr-3 border border-gray-200 "
                    />
                    <div>
                      <h4 className="text-gray-900  font-medium flex items-center">
                        @{user.username}
                      </h4>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {mentionedUsers.some((u) => u.id === user.id)
                          ? "Already mentioned"
                          : "Tap to mention"}
                      </p>
                    </div>
                  </div>
                  {mentionedUsers.some((u) => u.id === user.id) && (
                    <CheckCircle
                      weight="fill"
                      className="w-5 h-5 text-blue-500"
                    />
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <User className="w-6 h-6 text-gray-400  mb-3" />
              <p className="text-gray-400">No users found</p>
              <p className="text-xs text-gray-400  mt-1">
                Try a different search term
              </p>
            </div>
          )}
        </div>
      </BottomSheet>
    </div>
  );
};

export default PostCaptionPage;
