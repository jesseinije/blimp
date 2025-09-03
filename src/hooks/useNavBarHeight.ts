// Create a new file: src/hooks/useNavBarHeight.ts
import { useState, useEffect } from "react";

export const useNavBarHeight = () => {
  const [navBarHeight, setNavBarHeight] = useState(0);

  useEffect(() => {
    const updateNavBarHeight = () => {
      const navBar = document.querySelector(".nav-bar");
      if (navBar) {
        const height = navBar.getBoundingClientRect().height;
        setNavBarHeight(height);
      }
    };

    // Initial calculation
    updateNavBarHeight();

    // Update on resize
    window.addEventListener("resize", updateNavBarHeight);

    // Cleanup
    return () => window.removeEventListener("resize", updateNavBarHeight);
  }, []);

  return navBarHeight;
};
