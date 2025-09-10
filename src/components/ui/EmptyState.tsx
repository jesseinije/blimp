import React from "react";

interface EmptyStateProps {
  /** Main title text */
  title: string;
  /** Optional subtitle or description text */
  description?: string;
  /** Optional icon component to display */
  icon?: React.ReactNode;
  /** Optional action button/component */
  action?: React.ReactNode;
  /** Optional className for custom styling */
  className?: string;
}

// SVG icon for smiley face
const SmileyIcon = (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle
      cx="28"
      cy="28"
      r="24"
      fill="#F3F4F6"
      stroke="#A1A1AA"
      strokeWidth="2"
    />
    <ellipse cx="20" cy="24" rx="3" ry="4" fill="#A1A1AA" />
    <ellipse cx="36" cy="24" rx="3" ry="4" fill="#A1A1AA" />
    <path
      d="M20 36c2.5 2 8.5 2 11 0"
      stroke="#A1A1AA"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

/**
 * EmptyState component for displaying when there's no content
 * Can be used for empty lists, search results, or content that hasn't been created yet
 */
const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = SmileyIcon,
  action,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-6 text-center ${className}`}
    >
      {/* Icon if provided */}
      {icon && <div className="mb-4">{icon}</div>}

      {/* Title - always required */}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>

      {/* Description - optional */}
      {description && (
        <p className="text-sm text-gray-400 mb-6 max-w-xs">{description}</p>
      )}

      {/* Action button/component - optional */}
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
