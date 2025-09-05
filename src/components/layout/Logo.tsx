import React from "react";
import "./Logo.css";

const Logo: React.FC = () => {
  return (
    <div className="b-logo" aria-label="B logo">
      <div className="b-logo__stem"></div>
      <div className="b-logo__lobe b-logo__lobe--top"></div>
      <div className="b-logo__lobe b-logo__lobe--bottom"></div>
    </div>
  );
};

export default Logo;
