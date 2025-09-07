import React from "react";

// Base interface for all icon props
interface IconProps {
  size?: number; // Add this line
  width?: string | number;
  height?: string | number;
  className?: string;
  color?: string;
  strokeWidth?: string | number;
  weight?: "regular" | "fill" | "bold"; // Add "bold" to weight
}

// Chat/Message icon
export const Chat: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className,
  color = "currentColor",
  strokeWidth = 20,
  weight = "regular", // Add weight prop
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width={width || size}
    height={height || size}
    className={className}
  >
    <rect width="256" height="256" fill="none" />
    <path
      d="M79.93,211.11a96,96,0,1,0-35-35h0L32.42,213.46a8,8,0,0,0,10.12,10.12l37.39-12.47Z"
      fill={weight === "fill" ? color : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={weight === "fill" ? 0 : strokeWidth}
    />
  </svg>
);

// Share icon
export const Share: React.FC<IconProps> = ({
  size = 24, // Add this line
  width,
  height,
  className,
  color = "currentColor",
  strokeWidth = 20,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width={width || size} // Update this line
    height={height || size} // Update this line
    className={className}
  >
    <rect width="256" height="256" fill="none" />
    <line
      x1="108"
      y1="148"
      x2="160"
      y2="96"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="16"
    />
    <path
      d="M223.69,42.18a8,8,0,0,0-9.87-9.87l-192,58.22a8,8,0,0,0-1.25,14.93L108,148l42.54,87.42a8,8,0,0,0,14.93-1.25Z"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

// Repost icon
export const Repost: React.FC<IconProps> = ({
  size = 24, // Add this line
  width,
  height,
  className,
  color = "currentColor",
  strokeWidth = 20,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width={width || size} // Update this line
    height={height || size} // Update this line
    className={className}
  >
    <rect width="256" height="256" fill="none" />
    <polyline
      points="168 96 216 96 216 48"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M216,96,187.72,67.72A88,88,0,0,0,64,67"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <polyline
      points="88 160 40 160 40 208"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M40,160l28.28,28.28A88,88,0,0,0,192,189"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

// Heart icon
export const Heart: React.FC<IconProps> = ({
  size = 24, // Add this line
  width,
  height,
  className,
  color = "currentColor",
  strokeWidth = 20,
  weight = "regular", // Add this line
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width={width || size} // Update this line
    height={height || size} // Update this line
    className={className}
  >
    <rect width="256" height="256" fill="none" />
    <path
      d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z"
      fill={weight === "fill" ? color : "none"} // Add fill condition
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={weight === "fill" ? 0 : strokeWidth} // Optional: remove stroke in fill mode
    />
  </svg>
);

// House icon
export const House: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className,
  color = "currentColor",
  strokeWidth = 20,
  weight = "regular", // Add this line
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width={width || size}
    height={height || size}
    className={className}
  >
    <rect width="256" height="256" fill="none" />
    <path
      d="M40,216H216V120a8,8,0,0,0-2.34-5.66l-80-80a8,8,0,0,0-11.32,0l-80,80A8,8,0,0,0,40,120Z"
      fill={weight === "fill" ? color : "none"} // Add fill condition
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={weight === "fill" ? 0 : strokeWidth} // Optionally remove stroke in fill mode
    />
  </svg>
);

// Search icon
export const Search: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className,
  color = "currentColor",
  strokeWidth = 20,
  weight = "regular",
}) => {
  const finalStrokeWidth =
    weight === "bold" ? Number(strokeWidth) * 1.5 : Number(strokeWidth);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={width || size}
      height={height || size}
      className={className}
    >
      <rect width="256" height="256" fill="none" />
      <circle
        cx="112"
        cy="112"
        r="80"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={finalStrokeWidth}
      />
      <line
        x1="168.57"
        y1="168.57"
        x2="208" // Changed from 224 to 208
        y2="208" // Changed from 224 to 208
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={finalStrokeWidth}
      />
    </svg>
  );
};

// Add these new components after your existing icons:

// Bookmark icon
export const Bookmark: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className,
  color = "currentColor",
  strokeWidth = 20,
  weight = "regular",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width={width || size}
    height={height || size}
    className={className}
  >
    <rect width="256" height="256" fill="none" />
    <path
      d="M192,224l-64-40L64,224V48a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8Z"
      fill={weight === "fill" ? color : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

// Bell icon
export const Bell: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className,
  color = "currentColor",
  strokeWidth = 20,
  weight = "regular",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width={width || size}
    height={height || size}
    className={className}
  >
    <rect width="256" height="256" fill="none" />
    <path
      d="M96,192a32,32,0,0,0,64,0"
      fill={weight === "fill" ? color : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={weight === "fill" ? 0 : strokeWidth} // Update stroke width logic
    />
    <path
      d="M56,104a72,72,0,0,1,144,0c0,35.82,8.3,64.6,14.9,76A8,8,0,0,1,208,192H48a8,8,0,0,1-6.88-12C47.71,168.6,56,139.81,56,104Z"
      fill={weight === "fill" ? color : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={weight === "fill" ? 0 : strokeWidth} // Update stroke width logic
    />
  </svg>
);

// Plus icon
export const Plus: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className,
  color = "currentColor",
  strokeWidth = 20,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width={width || size}
    height={height || size}
    className={className}
  >
    <rect width="256" height="256" fill="none" />
    <line
      x1="40"
      y1="128"
      x2="216"
      y2="128"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <line
      x1="128"
      y1="40"
      x2="128"
      y2="216"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

// DotsVertical icon
export const DotsVertical: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className,
  color = "currentColor",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width={width || size}
    height={height || size}
    className={className}
  >
    <rect width="256" height="256" fill="none" />
    <circle cx="128" cy="128" r="14" fill={color} />
    <circle cx="128" cy="60" r="14" fill={color} />
    <circle cx="128" cy="196" r="14" fill={color} />
  </svg>
);

// Menu/Hamburger icon
export const Menu: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className,
  color = "currentColor",
  strokeWidth = 20,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width={width || size}
    height={height || size}
    className={className}
  >
    <rect width="256" height="256" fill="none" />
    <line
      x1="40"
      y1="88" // Changed from 96 to 88 (moved up)
      x2="216"
      y2="88" // Changed from 96 to 88 (moved up)
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <line
      x1="40"
      y1="168" // Changed from 160 to 168 (moved down)
      x2="216"
      y2="168" // Changed from 160 to 168 (moved down)
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

// CaretLeft icon
export const CaretLeft: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className,
  color = "currentColor",
  strokeWidth = 20,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width={width || size}
    height={height || size}
    className={className}
  >
    <rect width="256" height="256" fill="none" />
    <polyline
      points="160 208 80 128 160 48"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

// Settings/Gear icon
export const Settings: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className,
  color = "currentColor",
  strokeWidth = 20,
  weight = "regular",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width={width || size}
    height={height || size}
    className={className}
  >
    <rect width="256" height="256" fill="none" />
    <circle
      cx="128"
      cy="128"
      r="40"
      fill={weight === "fill" ? color : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M41.43,178.09A99.14,99.14,0,0,1,31.36,153.8l16.78-21a81.59,81.59,0,0,1,0-9.64l-16.77-21a99.43,99.43,0,0,1,10.05-24.3l26.71-3a81,81,0,0,1,6.81-6.81l3-26.7A99.14,99.14,0,0,1,102.2,31.36l21,16.78a81.59,81.59,0,0,1,9.64,0l21-16.77a99.43,99.43,0,0,1,24.3,10.05l3,26.71a81,81,0,0,1,6.81,6.81l26.7,3a99.14,99.14,0,0,1,10.07,24.29l-16.78,21a81.59,81.59,0,0,1,0,9.64l16.77,21a99.43,99.43,0,0,1-10,24.3l-26.71,3a81,81,0,0,1-6.81,6.81l-3,26.7a99.14,99.14,0,0,1-24.29,10.07l-21-16.78a81.59,81.59,0,0,1-9.64,0l-21,16.77a99.43,99.43,0,0,1-24.3-10l-3-26.71a81,81,0,0,1-6.81-6.81Z"
      fill={weight === "fill" ? color : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

// Users/Group icon
export const Users: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className,
  color = "currentColor",
  strokeWidth = 20,
  weight = "regular",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width={width || size}
    height={height || size}
    className={className}
  >
    <rect width="256" height="256" fill="none" />
    <circle
      cx="84"
      cy="108"
      r="52"
      fill={weight === "fill" ? color : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M10.23,200a88,88,0,0,1,147.54,0"
      fill={weight === "fill" ? color : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M172,160a87.93,87.93,0,0,1,73.77,40"
      fill={weight === "fill" ? color : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M152.69,59.7A52,52,0,1,1,172,160"
      fill={weight === "fill" ? color : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);
