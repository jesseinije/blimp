import { useState, useEffect, useCallback } from "react";

export function useViewportHeight(fallback = window.innerHeight): number {
  const [viewportHeight, setViewportHeight] = useState(fallback);
  const [initialized, setInitialized] = useState(false);

  // Create a memoized update function
  const updateViewportHeight = useCallback(() => {
    // Get the most accurate height possible
    const height = window.innerHeight;
    document.documentElement.style.setProperty("--vh", `${height * 0.01}px`);
    setViewportHeight(height);

    // Mark as initialized once we've set a height
    if (!initialized) {
      setInitialized(true);
    }
  }, [initialized]);

  useEffect(() => {
    // Initial measurement using RAF to ensure DOM is ready
    requestAnimationFrame(updateViewportHeight);

    // Also try with a small timeout to catch any delayed rendering
    const initialTimeout = setTimeout(updateViewportHeight, 100);

    // Create a debounced version for scroll events
    let scrollTimer: number | null = null;
    const handleScroll = () => {
      if (scrollTimer === null) {
        scrollTimer = window.setTimeout(() => {
          updateViewportHeight();
          scrollTimer = null;
        }, 200);
      }
    };

    // Standard event listeners
    window.addEventListener("resize", updateViewportHeight);
    window.addEventListener("orientationchange", updateViewportHeight);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Additional event listeners for mobile
    window.addEventListener("touchmove", handleScroll, { passive: true });
    window.addEventListener("touchend", updateViewportHeight);

    // Some mobile browsers hide/show their UI based on scroll direction
    // Let's check periodically for the first few seconds after load
    const persistentInterval = setInterval(updateViewportHeight, 500);
    const clearPersistentInterval = setTimeout(() => {
      clearInterval(persistentInterval);
    }, 5000); // Check for 5 seconds after load

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(scrollTimer || undefined);
      clearInterval(persistentInterval);
      clearTimeout(clearPersistentInterval);
      window.removeEventListener("resize", updateViewportHeight);
      window.removeEventListener("orientationchange", updateViewportHeight);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      window.removeEventListener("touchend", updateViewportHeight);
    };
  }, [updateViewportHeight]);

  return viewportHeight;
}
