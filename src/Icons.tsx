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
  size = 24,
  width,
  height,
  className,
  color = "currentColor",
  strokeWidth = 16,
  weight = "regular",
}) => {
  if (weight === "fill") {
    // Fill version
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width={width || size}
        height={height || size}
        className={className}
      >
        <rect width="256" height="256" fill="none" />
        <path
          d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"
          fill={color}
        />
      </svg>
    );
  }
  // Regular (stroke) version
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={width || size}
      height={height || size}
      className={className}
    >
      <rect width="256" height="256" fill="none" />
      <path
        d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

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
      x2="200"
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
      x2="150"
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

// Message icon with text lines
export const ChatBubble: React.FC<IconProps> = ({
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
    <line
      x1="96"
      y1="104"
      x2="160"
      y2="104"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <line
      x1="96"
      y1="136"
      x2="160"
      y2="136"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M105.07,192l16,28a8,8,0,0,0,13.9,0l16-28H216a8,8,0,0,0,8-8V56a8,8,0,0,0-8-8H40a8,8,0,0,0-8,8V184a8,8,0,0,0,8,8Z"
      fill={weight === "fill" ? color : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

// Pencil/Edit icon
export const Pencil: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className,
  color = "currentColor",
  strokeWidth = 20, // Using the stroke width from the provided SVG
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
      d="M96,216H48a8,8,0,0,1-8-8V163.31a8,8,0,0,1,2.34-5.65L165.66,34.34a8,8,0,0,1,11.31,0L221.66,79a8,8,0,0,1,0,11.31Z"
      fill={weight === "fill" ? color : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={weight === "fill" ? 0 : strokeWidth}
    />
    <line
      x1="216"
      y1="216"
      x2="96"
      y2="216"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <line
      x1="136"
      y1="64"
      x2="192"
      y2="120"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

// Grid icon (using Phosphor icon svg fill version)
export const Grid: React.FC<IconProps> = ({
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
    {weight === "fill" ? (
      <path
        d="M84,52V92H28a4,4,0,0,1-4-4V64A16,16,0,0,1,40,48H80A4,4,0,0,1,84,52Zm16,152a4,4,0,0,0,4,4h48a4,4,0,0,0,4-4V164H100ZM24,168v24a16,16,0,0,0,16,16H80a4,4,0,0,0,4-4V164H28A4,4,0,0,0,24,168Zm0-56v32a4,4,0,0,0,4,4H84V108H28A4,4,0,0,0,24,112ZM152,48H104a4,4,0,0,0-4,4V92h56V52A4,4,0,0,0,152,48Zm76,60H172v40h56a4,4,0,0,0,4-4V112A4,4,0,0,0,228,108ZM100,148h56V108H100ZM216,48H176a4,4,0,0,0-4,4V92h56a4,4,0,0,0,4-4V64A16,16,0,0,0,216,48Zm12,116H172v40a4,4,0,0,0,4,4h40a16,16,0,0,0,16-16V168A4,4,0,0,0,228,164Z"
        fill={color}
      />
    ) : (
      <>
        <rect
          x="32"
          y="56"
          width="192"
          height="144"
          rx="8"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <line
          x1="96"
          y1="56"
          x2="96"
          y2="200"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <line
          x1="160"
          y1="56"
          x2="160"
          y2="200"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <line
          x1="32"
          y1="104"
          x2="224"
          y2="104"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <line
          x1="32"
          y1="152"
          x2="224"
          y2="152"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
      </>
    )}
  </svg>
);

// At symbol icon (second SVG from your request)
export const AtSymbol: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className,
  color = "currentColor",
  strokeWidth = 20,
  weight = "regular",
}) => {
  // Use different stroke width based on weight
  const finalStrokeWidth = weight === "regular" ? strokeWidth : 24;

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
        cx="128"
        cy="128"
        r="40"
        fill={weight === "fill" ? color : "none"}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={finalStrokeWidth}
      />
      <path
        d="M184,208c-15.21,10.11-36.37,16-56,16a96,96,0,1,1,96-96c0,22.09-8,40-28,40s-28-17.91-28-40V88"
        fill={weight === "fill" ? color : "none"}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={finalStrokeWidth}
      />
    </svg>
  );
};

// Laptop keyboard icon (third SVG from your request)
export const Keyboard: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className,
  color = "currentColor",
  strokeWidth = 20, // Using the stroke width from the provided SVG
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
      d="M40,112H216a0,0,0,0,1,0,0v88a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V112A0,0,0,0,1,40,112Z"
      fill={weight === "fill" ? color : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M40.43,112,208,67.77l-8.16-30a7.9,7.9,0,0,0-9.66-5.49L37.85,72.47A7.76,7.76,0,0,0,32.27,82Z"
      fill={weight === "fill" ? color : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <line
      x1="67.71"
      y1="64.59"
      x2="115.5"
      y2="92.19"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <line
      x1="126.61"
      y1="49.05"
      x2="174.4"
      y2="76.64"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

// Film icon
export const Film: React.FC<IconProps> = ({
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
    {weight === "fill" ? (
      <path
        d="M216,104H102.09L210,75.51a8,8,0,0,0,5.68-9.84l-8.16-30a15.93,15.93,0,0,0-19.42-11.13L35.81,64.74a15.75,15.75,0,0,0-9.7,7.4,15.51,15.51,0,0,0-1.55,12L32,111.56c0,.14,0,.29,0,.44v88a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V112A8,8,0,0,0,216,104ZM192.16,40l6,22.07L164.57,71,136.44,54.72ZM77.55,70.27l28.12,16.24-59.6,15.73-6-22.08Z"
        fill={color}
      />
    ) : (
      <>
        <path
          d="M40,112H216a0,0,0,0,1,0,0v88a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V112A0,0,0,0,1,40,112Z"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <path
          d="M40.43,112,208,67.77l-8.16-30a7.9,7.9,0,0,0-9.66-5.49L37.85,72.47A7.76,7.76,0,0,0,32.27,82Z"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <line
          x1="67.71"
          y1="64.59"
          x2="115.5"
          y2="92.19"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <line
          x1="126.61"
          y1="49.05"
          x2="174.4"
          y2="76.64"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
      </>
    )}
  </svg>
);

// ChatCircle icon - new component using the provided SVG
export const ChatCircle: React.FC<IconProps> = ({
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
      d="M79.93,211.11a96,96,0,1,0-35-35h0L32.42,213.46a8,8,0,0,0,10.12,10.12l37.39-12.47Z"
      fill={weight === "fill" ? color : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

// ArrowLeft icon
export const ArrowLeft: React.FC<IconProps> = ({
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
      points="80 152 32 104 80 56"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M224,200a96,96,0,0,0-96-96H32"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

// UserAdd icon
export const UserAdd: React.FC<IconProps> = ({
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
    <line
      x1="200"
      y1="136"
      x2="248"
      y2="136"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <line
      x1="224"
      y1="112"
      x2="224"
      y2="160"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <circle
      cx="108"
      cy="100"
      r="60"
      fill={weight === "fill" ? color : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M24,200c20.55-24.45,49.56-40,84-40s63.45,15.55,84,40"
      fill={weight === "fill" ? color : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

// Add the new Gift icon
export const Gift: React.FC<IconProps> = ({
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
    <rect
      x="32"
      y="80"
      width="192"
      height="48"
      rx="8"
      fill={weight === "fill" ? color : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M208,128v72a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V128"
      fill={weight === "fill" ? color : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <line
      x1="128"
      y1="80"
      x2="128"
      y2="208"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M176.79,31.21c9.34,9.34,9.89,25.06,0,33.82C159.88,80,128,80,128,80s0-31.88,15-48.79C151.73,21.32,167.45,21.87,176.79,31.21Z"
      fill={weight === "fill" ? color : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M79.21,31.21c-9.34,9.34-9.89,25.06,0,33.82C96.12,80,128,80,128,80s0-31.88-15-48.79C104.27,21.32,88.55,21.87,79.21,31.21Z"
      fill={weight === "fill" ? color : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

// BrandLogo icon (custom SVG)
export const XLogo: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className,
  color = "currentColor",
  strokeWidth = 16,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width={width || size}
    height={height || size}
    className={className}
  >
    <rect width="256" height="256" fill="none" />
    <polygon
      points="48 40 96 40 208 216 160 216 48 40"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <line
      x1="113.88"
      y1="143.53"
      x2="48"
      y2="216"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <line
      x1="208"
      y1="40"
      x2="142.12"
      y2="112.47"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

// Add the Verification icon
export const Verification: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className,
  color = "currentColor",
  strokeWidth = 16,
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
      d="M54.46,201.54c-9.2-9.2-3.1-28.53-7.78-39.85C41.82,150,24,140.5,24,128s17.82-22,22.68-33.69C51.36,83,45.26,63.66,54.46,54.46S83,51.36,94.31,46.68C106.05,41.82,115.5,24,128,24S150,41.82,161.69,46.68c11.32,4.68,30.65-1.42,39.85,7.78s3.1,28.53,7.78,39.85C214.18,106.05,232,115.5,232,128S214.18,150,209.32,161.69c-4.68,11.32,1.42,30.65-7.78,39.85s-28.53,3.1-39.85,7.78C150,214.18,140.5,232,128,232s-22-17.82-33.69-22.68C83,204.64,63.66,210.74,54.46,201.54Z"
      fill={weight === "fill" ? color : "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <polyline
      points="88 136 112 160 168 104"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);

// ShareFat icon
export const ShareFat: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className,
  color = "currentColor",
  strokeWidth = 20,
  weight = "regular",
}) => {
  if (weight === "fill") {
    // Fill version
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width={width || size}
        height={height || size}
        className={className}
      >
        <rect width="256" height="256" fill="none" />
        <path
          d="M237.66,117.66l-80,80A8,8,0,0,1,144,192V152.23c-57.1,3.24-96.25,40.27-107.24,52h0a12,12,0,0,1-20.68-9.58c3.71-32.26,21.38-63.29,49.76-87.37,23.57-20,52.22-32.69,78.16-34.91V32a8,8,0,0,1,13.66-5.66l80,80A8,8,0,0,1,237.66,117.66Z"
          fill={color}
        />
      </svg>
    );
  }
  // Regular (stroke) version
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={width || size}
      height={height || size}
      className={className}
    >
      <rect width="256" height="256" fill="none" />
      <path
        d="M30.93,198.72C47.39,181.19,90.6,144,152,144v48l80-80L152,32V80C99.2,80,31.51,130.45,24,195.54A4,4,0,0,0,30.93,198.72Z"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export const Chat: React.FC<IconProps> = ({
  size = 24,
  width,
  height,
  className,
  color = "currentColor",
  strokeWidth = 20,
  weight = "regular",
}) => {
  if (weight === "fill") {
    // Fill version
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width={width || size}
        height={height || size}
        className={className}
      >
        <rect width="256" height="256" fill="none" />
        <path
          d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24ZM84,140a12,12,0,1,1,12-12A12,12,0,0,1,84,140Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,128,140Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,172,140Z"
          fill={color}
        />
      </svg>
    );
  }
  // Stroke version
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={width || size}
      height={height || size}
      className={className}
    >
      <rect width="256" height="256" fill="none" />
      <circle cx="128" cy="128" r="12" fill={color} />
      <circle cx="84" cy="128" r="12" fill={color} />
      <circle cx="172" cy="128" r="12" fill={color} />
      <path
        d="M79.93,211.11a96,96,0,1,0-35-35h0L32.42,213.46a8,8,0,0,0,10.12,10.12l37.39-12.47Z"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

// Refresh icon
export const Refresh: React.FC<IconProps> = ({
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
      points="24 56 24 104 72 104"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M67.59,192A88,88,0,1,0,65.77,65.77L24,104"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);
