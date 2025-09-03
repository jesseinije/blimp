// Create a new file: src/hooks/useNavBarHeight.ts
import { useState, useEffect } from "react";

export const useNavBarHeight = () => {
  const [navBarHeight, setNavBarHeight] = useState(0);

  useEffect(() => {
    const updateNavBarHeight = () => {
      const navBar = document.querySelector("nav");
      if (navBar) {
        const height = navBar.getBoundingClientRect().height;
        setNavBarHeight(height);
      }
    };

    // Initial measurement
    updateNavBarHeight();

    // Update on resize and orientation change
    window.addEventListener("resize", updateNavBarHeight);
    window.addEventListener("orientationchange", updateNavBarHeight);

    // Create a ResizeObserver to track NavBar height changes
    const resizeObserver = new ResizeObserver(updateNavBarHeight);
    const navBar = document.querySelector("nav");
    if (navBar) {
      resizeObserver.observe(navBar);
    }

    return () => {
      window.removeEventListener("resize", updateNavBarHeight);
      window.removeEventListener("orientationchange", updateNavBarHeight);
      resizeObserver.disconnect();
    };
  }, []);

  return navBarHeight;
};
