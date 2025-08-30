import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { MusicNote } from "phosphor-react";

interface MusicOverlayProps {
  musicUrl: string;
  musicTitle?: string;
  location: string;
  isVisible: boolean;
  inView: boolean;
  maxWidth?: string;
}

// Define the ref type
export interface MusicOverlayRef {
  handleMusicClick: (e: React.MouseEvent) => void;
  isPlaying: boolean;
}

const MusicOverlay = forwardRef<MusicOverlayRef, MusicOverlayProps>(
  (
    {
      musicUrl,
      musicTitle = "Music",
      location,
      isVisible,
      inView,
      maxWidth, // Destructure the new prop
    }: MusicOverlayProps,
    ref
  ) => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showMusicInfo, setShowMusicInfo] = useState(true); // Start with music info showing
    const [isPlaying, setIsPlaying] = useState(false);
    const [shouldMarquee, setShouldMarquee] = useState(false);
    const textRef = useRef<HTMLSpanElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Check if text needs marquee effect
    useEffect(() => {
      if (textRef.current) {
        const isOverflowing =
          textRef.current.scrollWidth > textRef.current.clientWidth;
        setShouldMarquee(isOverflowing);
      }
    }, [musicTitle, showMusicInfo]);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      handleMusicClick,
      isPlaying,
    }));

    // Initialize audio element
    useEffect(() => {
      // Clean up previous audio instance
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }

      // Create new audio instance with current URL
      audioRef.current = new Audio(musicUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
      audioRef.current.preload = "auto";

      // Add event listeners for state tracking
      const onPlay = () => {
        console.log("Audio is playing:", musicUrl);
        setIsPlaying(true);
      };

      const onPause = () => {
        console.log("Audio is paused:", musicUrl);
        setIsPlaying(false);
      };

      const onError = () => {
        console.error("Audio error:", audioRef.current?.error);
      };

      audioRef.current.addEventListener("play", onPlay);
      audioRef.current.addEventListener("pause", onPause);
      audioRef.current.addEventListener("error", onError);

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener("play", onPlay);
          audioRef.current.removeEventListener("pause", onPause);
          audioRef.current.removeEventListener("error", onError);
          audioRef.current.src = "";
        }
      };
    }, [musicUrl]); // Recreate audio element when URL changes

    // Handle audio playback based on visibility
    // Only consider in-view status, not whether showing music info
    useEffect(() => {
      if (!audioRef.current || !inView) {
        // Only pause if not in view
        audioRef.current?.pause();
        return;
      }

      // If in view and previously playing, continue playing
      if (inView && isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Audio playback was prevented:", error);
        });
      }
    }, [inView, isPlaying]);

    // Toggle between location and music display WITHOUT affecting audio playback
    useEffect(() => {
      if (!isVisible) return;

      const toggleWithAnimation = () => {
        setIsTransitioning(true);

        setTimeout(() => {
          setShowMusicInfo((prev) => !prev);
          // Don't affect audio playback when toggling display

          setTimeout(() => {
            setIsTransitioning(false);
          }, 50);
        }, 300);
      };

      const intervalId = setInterval(toggleWithAnimation, 5000);
      return () => clearInterval(intervalId);
    }, [isVisible]);

    // Handle music click to toggle play/pause
    const handleMusicClick = (e?: React.MouseEvent) => {
      e?.stopPropagation(); // Only call stopPropagation if event exists
      e?.preventDefault(); // Only call preventDefault if event exists

      if (!audioRef.current) return;

      if (audioRef.current.paused) {
        console.log("Attempting to play audio:", musicUrl);
        audioRef.current.play().catch((error) => {
          console.error("Audio playback was prevented:", error);
          alert(
            "Please enable autoplay in your browser settings to hear music"
          );
        });
      } else {
        audioRef.current.pause();
      }
    };

    return (
      <span
        className={`inline-flex items-center min-w-0 overflow-hidden whitespace-nowrap transition-opacity duration-300 ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleMusicClick}
        style={maxWidth ? { maxWidth } : {}}
      >
        {showMusicInfo ? (
          <>
            <span
              ref={textRef}
              className={`flex items-center ${
                shouldMarquee ? "marquee-container" : "truncate"
              }`}
            >
              <span className={shouldMarquee ? "marquee-text" : ""}>
                <MusicNote size={12} className="mr-1 inline-block" />
                {musicTitle}
              </span>
            </span>
          </>
        ) : (
          <>
            <span className="truncate">{location}</span>
            {isPlaying && (
              <span className="ml-1 flex-shrink-0 text-blue-500">
                {/* Empty span for playing status */}
              </span>
            )}
          </>
        )}
      </span>
    );
  }
);

// Add a display name for React DevTools
MusicOverlay.displayName = "MusicOverlay";

export default MusicOverlay;
