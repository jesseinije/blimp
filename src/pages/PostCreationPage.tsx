import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/post/TopBar";
import BottomCameraControls from "../components/camera/BottomCameraControls";
import RightCameraControls from "../components/camera/RightCameraControls";
import FiltersBottomSheet from "../components/camera/FiltersBottomSheet";
import TextOverlayBottomSheet from "../components/camera/TextOverlayBottomSheet";
import DraggableTextOverlay from "../components/camera/DraggableTextOverlay";
import type {
  TextStyle,
  TextOverlay,
} from "../components/camera/textOverlayTypes";

// Import Filter interface from FiltersBottomSheet
import type { Filter } from "../components/camera/FiltersBottomSheet";

type TabType = "reel" | "post";

const PostCreationPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("reel");
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasInitiatedRecording, setHasInitiatedRecording] = useState(false);

  // Filter state management
  const [isFiltersSheetOpen, setIsFiltersSheetOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<Filter | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>(["Filters"]);

  // Text overlay state management
  const [isTextSheetOpen, setIsTextSheetOpen] = useState(false);
  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
  const [selectedTextOverlayId, setSelectedTextOverlayId] = useState<
    string | null
  >(null);
  const [currentTextStyle, setCurrentTextStyle] = useState<TextStyle>({
    color: "#FFFFFF",
    fontSize: 24,
    fontFamily: "sans-serif",
  });
  const [editingTextOverlay, setEditingTextOverlay] =
    useState<TextOverlay | null>(null);

  useEffect(() => {
    // Start the camera when component mounts
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startCamera();

    // Cleanup function to stop all tracks when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);

    // Navigate to TextPostPage when Post tab is clicked
    if (tab === "post") {
      navigate("/caption", { state: { mode: "post" } });
    }
  };

  const handleCapture = () => {
    // This would handle the recording completion
    console.log("Capture completed");
    setIsRecording(false);
    setIsPaused(true);
    // In a real implementation, you'd save the video recording here
  };

  const handleUpload = () => {
    // This would open a file picker to upload existing media
    console.log("Upload clicked");
    // You'd implement a file picker here
  };

  // Update the recording start handler to handle timer state
  const handleRecordingStart = () => {
    setIsRecording(true);
    setIsPaused(false);
    setHasInitiatedRecording(true);
  };

  // Handle toggling pause state
  const handleTogglePause = (isPausedState: boolean) => {
    setIsPaused(isPausedState);
  };

  // Show controls when not recording or when recording is paused AND no bottom sheet is open
  const showControls =
    (!isRecording || isPaused) && !isFiltersSheetOpen && !isTextSheetOpen;

  // Add this new variable to control the bottom camera controls visibility separately
  const showCameraControls = !isFiltersSheetOpen && !isTextSheetOpen;

  // Handlers for RightCameraControls
  const handleFiltersClick = () => {
    console.log("Filters clicked");
    setIsFiltersSheetOpen(true);

    // Toggle the filter button's active state
    if (!activeFilters.includes("Filters")) {
      setActiveFilters([...activeFilters, "Filters"]);
    }
  };

  const handleFilterSelect = (filter: Filter) => {
    console.log(`Selected filter: ${filter.name}`);
    setSelectedFilter(filter);

    // If Normal filter is selected, remove from active filters
    if (filter.id === "normal") {
      setActiveFilters(activeFilters.filter((f) => f !== "Filters"));
    } else if (!activeFilters.includes("Filters")) {
      setActiveFilters([...activeFilters, "Filters"]);
    }
  };

  // Text overlay handlers
  const handleTextClick = () => {
    console.log("Text clicked");

    // If there's a selected overlay, prepare to edit it
    if (selectedTextOverlayId) {
      const overlayToEdit = textOverlays.find(
        (overlay) => overlay.id === selectedTextOverlayId
      );
      if (overlayToEdit) {
        setEditingTextOverlay(overlayToEdit);
        setIsTextSheetOpen(true);
        return;
      }
    }

    // Otherwise, open sheet to add new text
    setEditingTextOverlay(null); // Reset any previous editing state
    setIsTextSheetOpen(true);

    // Toggle the text button's active state
    if (!activeFilters.includes("Text")) {
      setActiveFilters([...activeFilters, "Text"]);
    }
  };

  const handleAddText = (text: string, style: TextStyle) => {
    const newOverlay: TextOverlay = {
      id: `text-${Date.now()}`,
      text,
      style,
      position: {
        x: videoContainerRef.current
          ? videoContainerRef.current.clientWidth / 2 - 50
          : 100,
        y: videoContainerRef.current
          ? videoContainerRef.current.clientHeight / 2 - 20
          : 100,
      },
      isSelected: true,
    };

    // Deselect all other overlays
    const updatedOverlays = textOverlays.map((overlay) => ({
      ...overlay,
      isSelected: false,
    }));

    setTextOverlays([...updatedOverlays, newOverlay]);
    setSelectedTextOverlayId(newOverlay.id);
  };

  const handleUpdateText = (id: string, newText: string, style: TextStyle) => {
    setTextOverlays(
      textOverlays.map((overlay) =>
        overlay.id === id
          ? { ...overlay, text: newText, style: style }
          : overlay
      )
    );
    setEditingTextOverlay(null);
  };

  const handleTextStyleUpdate = (style: TextStyle) => {
    setCurrentTextStyle(style);

    // If there's a selected text overlay, update its style
    if (selectedTextOverlayId) {
      setTextOverlays(
        textOverlays.map((overlay) =>
          overlay.id === selectedTextOverlayId ? { ...overlay, style } : overlay
        )
      );
    }
  };

  const handleTextOverlaySelect = (id: string) => {
    setTextOverlays(
      textOverlays.map((overlay) => ({
        ...overlay,
        isSelected: overlay.id === id,
      }))
    );
    setSelectedTextOverlayId(id);

    // Update current text style to match the selected overlay
    const selectedOverlay = textOverlays.find((overlay) => overlay.id === id);
    if (selectedOverlay) {
      setCurrentTextStyle(selectedOverlay.style);
    }
  };

  const handleTextOverlayMove = (
    id: string,
    position: { x: number; y: number }
  ) => {
    setTextOverlays(
      textOverlays.map((overlay) =>
        overlay.id === id ? { ...overlay, position } : overlay
      )
    );
  };

  const handleTextOverlayDelete = (id: string) => {
    setTextOverlays(textOverlays.filter((overlay) => overlay.id !== id));
    setSelectedTextOverlayId(null);

    // If this was the last text overlay, remove Text from active filters
    if (textOverlays.length <= 1) {
      setActiveFilters(activeFilters.filter((f) => f !== "Text"));
    }
  };

  // Add a double-click handler to edit text when double-clicked
  const handleTextDoubleClick = (id: string) => {
    const overlayToEdit = textOverlays.find((overlay) => overlay.id === id);
    if (overlayToEdit) {
      setSelectedTextOverlayId(id);
      setEditingTextOverlay(overlayToEdit);
      setIsTextSheetOpen(true);
    }
  };

  const handleVoiceoverClick = () => {
    console.log("Voiceover clicked");
    // Open voiceover recording UI
  };

  const handleFiltersSheetClose = () => {
    setIsFiltersSheetOpen(false);
  };

  const handleTextSheetClose = () => {
    setIsTextSheetOpen(false);
    setEditingTextOverlay(null);
  };

  // Handle background tap to deselect text overlays
  const handleBackgroundTap = () => {
    if (selectedTextOverlayId) {
      setTextOverlays(
        textOverlays.map((overlay) => ({
          ...overlay,
          isSelected: false,
        }))
      );
      setSelectedTextOverlayId(null);
    }
  };

  // Add this function to handle navigation to the caption page
  const handleNavigateToCaption = () => {
    navigate("/caption", { state: { mode: "video" } });
  };

  return (
    <div className="fixed inset-0 bg-black" onClick={handleBackgroundTap}>
      <div ref={videoContainerRef} className="relative w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          style={{ filter: selectedFilter?.cssFilter || "none" }}
          autoPlay
          playsInline
          muted
        />

        {/* Text overlays */}
        <DraggableTextOverlay
          overlays={textOverlays}
          onSelect={handleTextOverlaySelect}
          onMove={handleTextOverlayMove}
          onDelete={handleTextOverlayDelete}
          showDeleteZone={!!selectedTextOverlayId}
          onEdit={handleTextDoubleClick}
        />

        {/* UI elements that should hide when filter sheet is open */}
        <div
          className={`transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Top Bar */}
          {showControls && <TopBar />}

          {/* Right side vertical controls */}
          <RightCameraControls
            onFiltersClick={handleFiltersClick}
            onTextClick={handleTextClick}
            onVoiceoverClick={handleVoiceoverClick}
            activeButtons={activeFilters}
            onCapturePress={handleRecordingStart} // <-- ensure this starts recording
            isRecording={isRecording}
          />

          {/* Tab buttons at the bottom */}
          {!hasInitiatedRecording && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center transition-opacity duration-300">
              <div className="bg-gray-800/50 rounded-full p-0.5 flex">
                <button
                  onClick={() => handleTabChange("reel")}
                  className={`px-6 py-1.5 rounded-full font-medium text-sm ${
                    activeTab === "reel" ? "bg-white text-black" : "text-white"
                  }`}
                >
                  Reel
                </button>
                <button
                  onClick={() => handleTabChange("post")}
                  className={`px-6 py-1.5 rounded-full font-medium text-sm ${
                    activeTab === "post" ? "bg-white text-black" : "text-white"
                  }`}
                >
                  Post
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom camera controls - moved outside the showControls div */}
        <div
          className={`transition-opacity duration-300 ${
            showCameraControls ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`absolute ${
              hasInitiatedRecording ? "bottom-0" : "bottom-10"
            } left-0 right-0 transition-all duration-300`}
          >
            <BottomCameraControls
              onCapture={handleCapture}
              onUpload={handleUpload}
              onNext={handleNavigateToCaption}
              maxRecordingDuration={30}
              onRecordingStart={handleRecordingStart}
              onTogglePause={handleTogglePause}
              onRecordingStateChange={setIsRecording}
            />
          </div>
        </div>

        {/* Filters Bottom Sheet - always renders, but only visible when isFiltersSheetOpen is true */}
        <FiltersBottomSheet
          isOpen={isFiltersSheetOpen}
          onClose={handleFiltersSheetClose}
          onFilterSelect={handleFilterSelect}
          selectedFilter={selectedFilter}
          showBackdrop={false} // Set to false to remove the dim background overlay
        />

        {/* Text Overlay Bottom Sheet */}
        <TextOverlayBottomSheet
          isOpen={isTextSheetOpen}
          onClose={handleTextSheetClose}
          onAddText={handleAddText}
          onUpdateText={handleUpdateText}
          onUpdateTextStyle={handleTextStyleUpdate}
          currentStyle={currentTextStyle}
          showBackdrop={false}
          editingText={editingTextOverlay}
        />
      </div>
    </div>
  );
};

export default PostCreationPage;
