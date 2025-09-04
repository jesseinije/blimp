import { useEffect } from "react";

export function useViewportHeight() {
  useEffect(() => {
    const setViewportHeight = () => {
      requestAnimationFrame(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      });
    };

    // Initial setting
    setViewportHeight();

    // Update on resize and orientation change
    window.addEventListener("resize", setViewportHeight);
    window.addEventListener("orientationchange", setViewportHeight);

    // Clean up
    return () => {
      window.removeEventListener("resize", setViewportHeight);
      window.removeEventListener("orientationchange", setViewportHeight);
    };
  }, []);
}
