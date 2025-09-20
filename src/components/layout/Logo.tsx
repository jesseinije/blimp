import React from "react";
import "./Logo.css";

interface LogoProps {
  size?: "small" | "regular" | "large";
  lightMode?: boolean;
  withIcon?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  size = "regular",
  lightMode = false,
  withIcon = false,
}) => {
  const sizeClass =
    size === "small"
      ? "blimp-logo--small"
      : size === "large"
      ? "blimp-logo--large"
      : "";

  const lightClass = lightMode ? "blimp-logo--light" : "";

  return (
    <div
      className={`blimp-logo ${sizeClass} ${lightClass}`}
      aria-label="Blimp logo"
    >
      {withIcon && <span className="blimp-logo__icon">🎈</span>}
      Blimp
    </div>
  );
};

export default Logo;
