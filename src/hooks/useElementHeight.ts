import { useState, useEffect } from "react";

export function useElementHeight(elementSelector: string): number {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      const element = document.querySelector(elementSelector);
      if (element) {
        const computedHeight = element.getBoundingClientRect().height;
        setHeight(computedHeight);
      }
    };

    // Initial measurement
    updateHeight();

    // Re-measure on window resize
    window.addEventListener("resize", updateHeight);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [elementSelector]);

  return height;
}
