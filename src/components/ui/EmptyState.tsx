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

/**
 * EmptyState component for displaying when there's no content
 * Can be used for empty lists, search results, or content that hasn't been created yet
 */
const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
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
