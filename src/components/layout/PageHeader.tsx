import React from "react";
import { CaretLeft, DotsThreeVertical, Gear } from "phosphor-react";
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
  showBorder?: boolean; // Add this line
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showBackButton = true,
  rightIcon = "more",
  onBackClick,
  onRightIconClick,
  className = "",
  showBorder = false, // Add this line with a default value
}) => {
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      // Default behavior: go back in browser history
      window.history.back();
    }
  };

  const renderRightIcon = () => {
    switch (rightIcon) {
      case "more":
        return <DotsThreeVertical size={24} />;
      case "settings":
        return <Gear size={24} />;
      case "none":
        return null;
      default:
        return <DotsThreeVertical size={24} />;
    }
  };

  return (
    <div
      className={`page-header p-3 ${className} ${
        showBorder ? "border-b border-gray-200" : ""
      }`}
    >
      {showBackButton ? (
        <div className="flex items-center gap-3">
          <button onClick={handleBackClick} aria-label="Go back">
            <CaretLeft size={24} className="text-gray-900 dark:text-gray-100" />
          </button>
          <h2 className="font-bold text-gray-900 dark:text-white text-base">
            {title}
          </h2>
        </div>
      ) : (
        <h2 className="font-semibold text-gray-900 dark:text-white text-base">
          {title}
        </h2>
      )}

      {rightIcon !== "none" ? (
        <button
          onClick={onRightIconClick}
          aria-label={rightIcon === "settings" ? "Settings" : "More options"}
        >
          <div className="text-gray-900 dark:text-gray-100">
            {renderRightIcon()}
          </div>
        </button>
      ) : (
        <div className="w-6"></div>
      )}
    </div>
  );
};

export default PageHeader;
