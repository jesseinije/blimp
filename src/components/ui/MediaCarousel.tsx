import { useState, useRef, useEffect } from "react";
import { CaretLeft, CaretRight, SpeakerHigh, SpeakerX } from "phosphor-react";
import type { MediaItem } from "../../types";

interface MediaCarouselProps {
  media: MediaItem[];
  musicControl?: {
    isPlaying: boolean;
    onTogglePlay: (e: React.MouseEvent) => void;
  };
  sponsored?: {
    buttonText: string;
    buttonUrl: string;
  };
}

const MediaCarousel = ({
  media,
  musicControl,
  sponsored,
}: MediaCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const startX = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Set up Intersection Observer to detect when carousel is visible
  useEffect(() => {
    if (!carouselRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5, // When at least 50% of the carousel is visible
        rootMargin: "0px",
      }
    );

    observer.observe(carouselRef.current);

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);

  // Handle video playback based on visibility and current index
  useEffect(() => {
    // Get all videos in the carousel
    const videos = Array.from(videoRefs.current.values());

    videos.forEach((video, i) => {
      // Set muted state for all videos
      video.muted = videoMuted;

      // Only play the current video when carousel is visible
      if (i === currentIndex && isVisible) {
        video.play().catch((err) => {
          console.log("Error playing video:", err);
        });
      } else {
        video.pause();
      }
    });
  }, [currentIndex, isVisible, videoMuted]);

  const goToNext = () => {
    if (currentIndex < media.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;

    const currentX = e.touches[0].clientX;
    const diff = startX.current - currentX;

    // Threshold for swipe
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left
        goToNext();
      } else {
        // Swipe right
        goToPrev();
      }
      isDragging.current = false;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent click events
    setVideoMuted(!videoMuted);
  };

  // Check if current media item is a video
  const isCurrentItemVideo = media[currentIndex]?.type === "video";

  return (
    <div className="relative overflow-hidden w-full">
      <div
        ref={carouselRef}
        className="flex transition-transform duration-300 ease-out w-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {media.map((item) => (
          <div
            key={item.id}
            className="flex-none w-full relative bg-black flex justify-center"
          >
            {item.type === "image" ? (
              <img src={item.url} alt="" className="w-full h-auto" />
            ) : (
              <video
                ref={(el) => {
                  if (el) videoRefs.current.set(item.id, el);
                }}
                src={item.url}
                className="w-full h-auto"
                muted={videoMuted}
                playsInline
                loop
              />
            )}

            {/* Video Sound Control - only show if current item is video */}
            {isCurrentItemVideo && (
              <button
                onClick={toggleMute}
                className="absolute bottom-3 right-3 bg-gray-900/40 rounded-full p-2 text-white shadow-lg hover:bg-opacity-80 transition-all z-10 backdrop-blur-sm"
                aria-label={videoMuted ? "Unmute video" : "Mute video"}
              >
                {videoMuted ? (
                  <SpeakerX size={20} />
                ) : (
                  <SpeakerHigh size={20} />
                )}
              </button>
            )}

            {/* Music control in bottom right corner - only for images with music */}
            {musicControl && item.type === "image" && (
              <button
                onClick={musicControl.onTogglePlay}
                className="absolute bottom-3 right-3 bg-gray-900/40 rounded-full p-2 text-white shadow-lg transition-all z-10 backdrop-blur-sm"
                aria-label={
                  musicControl.isPlaying ? "Pause music" : "Play music"
                }
              >
                {musicControl.isPlaying ? (
                  <SpeakerHigh size={20} />
                ) : (
                  <SpeakerX size={20} />
                )}
              </button>
            )}

            {/* Add sponsored button */}
            {sponsored && (
              <a
                href={sponsored.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 left-3 bg-white  text-gray-900 text-sm font-semibold px-4 py-2 rounded-md transition-colors"
              >
                {sponsored.buttonText}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Carousel Controls - Only visible on larger screens */}
      {!isMobile && media.length > 1 && (
        <>
          {currentIndex > 0 && (
            <button
              onClick={goToPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-900/40 rounded-full p-1 text-white shadow-md backdrop-blur-sm"
              aria-label="Previous"
            >
              <CaretLeft size={24} />
            </button>
          )}

          {currentIndex < media.length - 1 && (
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900/40 rounded-full p-1 text-white shadow-md backdrop-blur-sm"
              aria-label="Next"
            >
              <CaretRight size={24} />
            </button>
          )}
        </>
      )}

      {/* Photo counter - visible on all screens */}
      {media.length > 1 && (
        <div className="absolute top-4 right-4 bg-gray-900/40 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          {currentIndex + 1}/{media.length}
        </div>
      )}

      {/* Dots indicator */}
      {media.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
          {media.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-1.5 h-1.5 rounded-full ${
                index === currentIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaCarousel;
