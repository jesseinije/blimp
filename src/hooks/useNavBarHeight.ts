// Create a new file: src/hooks/useNavBarHeight.ts
import { useState, useEffect, useCallback } from "react";

export const useNavBarHeight = (defaultHeight = 100) => {
  const [navBarHeight, setNavBarHeight] = useState(defaultHeight);
  const [initialized, setInitialized] = useState(false);

  const measureNavBar = useCallback(() => {
    const navBar = document.querySelector(".nav-bar");

    if (navBar) {
      const height = navBar.getBoundingClientRect().height;
      if (height > 0) {
        setNavBarHeight(height);
        if (!initialized) {
          setInitialized(true);
        }
      }
    }
  }, [initialized]);

  useEffect(() => {
    // Try to measure immediately
    measureNavBar();

    // Then try again in a requestAnimationFrame to ensure layout is complete
    requestAnimationFrame(measureNavBar);

    // And one more time after a short delay for good measure
    const initialTimer = setTimeout(measureNavBar, 100);

    // Observe size changes
    const resizeObserver = new ResizeObserver(measureNavBar);
    const navBar = document.querySelector(".nav-bar");
    if (navBar) {
      resizeObserver.observe(navBar);
    }

    // Also measure on standard events
    window.addEventListener("resize", measureNavBar);
    window.addEventListener("orientationchange", measureNavBar);

    // Observe DOM changes that might affect the navbar
    const mutationObserver = new MutationObserver(measureNavBar);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    // Periodically check for the first few seconds
    const persistentInterval = setInterval(measureNavBar, 200);
    const clearPersistentCheck = setTimeout(() => {
      clearInterval(persistentInterval);
    }, 2000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(persistentInterval);
      clearTimeout(clearPersistentCheck);
      window.removeEventListener("resize", measureNavBar);
      window.removeEventListener("orientationchange", measureNavBar);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [measureNavBar]);

  return navBarHeight;
};
