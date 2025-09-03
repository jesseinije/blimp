import { useState, useEffect, useRef } from "react";

interface CaptionProps {
  text: string;
  className?: string;
  maxLength?: number;
  highlightClassName?: string; // Add new prop for highlight color customization
}

const Caption = ({
  text,
  className = "",
  maxLength = 85,
  highlightClassName = "text-blue-500", // Default blue highlight
}: CaptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const [truncatedText, setTruncatedText] = useState("");
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (text.length > maxLength) {
      setShouldShowButton(true);
      setTruncatedText(text.substring(0, maxLength - 5));
    } else {
      setTruncatedText(text);
      setShouldShowButton(false);
    }
  }, [text, maxLength]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const renderTextWithHighlights = (text: string) => {
    const highlightRegex = /(#\w+|@\w+)/g;
    const parts = text.split(highlightRegex);

    return parts.map((part, index) => {
      if (part.match(highlightRegex)) {
        return (
          <span key={index} className={highlightClassName}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  if (isExpanded) {
    return (
      <div className={`${className}`}>
        <div>
          <span className="text-sm">
            {renderTextWithHighlights(text)}{" "}
            {shouldShowButton && (
              <button
                onClick={toggleExpanded}
                className="text-gray-400  text-sm font-medium focus:outline-none"
              >
                less
              </button>
            )}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="relative">
        {shouldShowButton ? (
          <div>
            <span ref={textRef} className="text-sm">
              {renderTextWithHighlights(truncatedText)}
              {!isExpanded && "... "}
            </span>
            <button
              onClick={toggleExpanded}
              className="text-gray-400 font-medium focus:outline-none  text-sm"
            >
              more
            </button>
          </div>
        ) : (
          <span className="text-sm">{renderTextWithHighlights(text)}</span>
        )}
      </div>
    </div>
  );
};

export default Caption;
