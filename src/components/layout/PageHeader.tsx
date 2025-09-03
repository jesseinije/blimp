import React, { useRef, useEffect } from "react";
import { CaretLeft, Settings, DotsVertical } from "../../Icons";
import { motion, useMotionValue, animate } from "framer-motion";
import "./PageHeader.css";

export type IconType = "more" | "settings" | "none";

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  rightIcon?: IconType;
  onBackClick?: () => void;
  onRightIconClick?: () => void;
  className?: string;
  titleAlign?: "left" | "center";
  showBorder?: boolean;
  enableScroll?: boolean; // Add this prop
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showBackButton = true,
  rightIcon = "more",
  onBackClick,
  onRightIconClick,
  className = "",
  showBorder = false,
  enableScroll = false, // Default to false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const lastScrollY = useRef(0);
  const containerHeight = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enableScroll) return; // Only add scroll handling if enableScroll is true

    if (containerRef.current) {
      containerHeight.current = containerRef.current.offsetHeight;
    }

    lastScrollY.current = window.scrollY;
    let ticking = false;
    let lastDirection = 0;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDiff = currentScrollY - lastScrollY.current;
          const currentDirection = Math.sign(scrollDiff);

          // Clear existing timeout
          if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
          }

          // Ignore very small scroll movements
          if (Math.abs(scrollDiff) < 3) {
            ticking = false;
            return;
          }

          // If direction changed, immediately snap based on the new direction
          if (currentDirection !== lastDirection) {
            if (currentDirection > 0) {
              // Scrolling down - hide navbar
              animate(y, -containerHeight.current, {
                type: "tween",
                duration: 0.2,
                ease: "easeOut",
              });
            } else {
              // Scrolling up - show navbar
              animate(y, 0, {
                type: "tween",
                duration: 0.2,
                ease: "easeOut",
              });
            }
            lastDirection = currentDirection;
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [enableScroll]); // Add enableScroll to dependencies

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      window.history.back();
    }
  };

  const renderRightIcon = () => {
    switch (rightIcon) {
      case "more":
        return <DotsVertical size={24} />;
      case "settings":
        return <Settings size={24} />;
      case "none":
        return null;
      default:
        return <DotsVertical size={24} />;
    }
  };

  const Component = enableScroll ? motion.div : "div";
  const componentProps = enableScroll
    ? {
        ref: containerRef,
        style: { y },
        className: `fixed top-0 left-0 right-0 w-full z-50 bg-white`,
      }
    : {
        className: `bg-white`,
      };

  return (
    <Component {...componentProps}>
      <div
        className={`page-header p-3 ${className} ${
          showBorder ? "border-b border-gray-200" : ""
        }`}
      >
        {showBackButton ? (
          <div className="flex items-center gap-3">
            <button onClick={handleBackClick} aria-label="Go back">
              <CaretLeft size={24} className="text-gray-900" />
            </button>
            <h2 className="font-bold text-gray-900 text-base">{title}</h2>
          </div>
        ) : (
          <h2 className="font-semibold text-gray-900 text-base">{title}</h2>
        )}

        {rightIcon !== "none" ? (
          <button
            onClick={onRightIconClick}
            aria-label={rightIcon === "settings" ? "Settings" : "More options"}
          >
            <div className="text-gray-900">{renderRightIcon()}</div>
          </button>
        ) : (
          <div className="w-6"></div>
        )}
      </div>
    </Component>
  );
};

export default PageHeader;
