import { useState, useEffect, useRef } from "react";

interface CaptionProps {
  text: string;
  className?: string;
  maxLength?: number; // Add new prop for customizing max length
}

const Caption = ({ text, className = "", maxLength = 85 }: CaptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const [truncatedText, setTruncatedText] = useState("");
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Check if text is long enough to need truncation
    // Using the maxLength prop to determine when to truncate
    if (text.length > maxLength) {
      setShouldShowButton(true);
      // Truncate text with a buffer for "... more" text
      setTruncatedText(text.substring(0, maxLength - 5));
    } else {
      setTruncatedText(text);
      setShouldShowButton(false);
    }
  }, [text, maxLength]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to render text with highlighted hashtags
  const renderTextWithHashtags = (text: string) => {
    // Regular expression to match hashtags (word beginning with # and containing letters, numbers, and underscores)
    const hashtagRegex = /(#\w+)/g;

    // Split the text by hashtags and map through parts
    const parts = text.split(hashtagRegex);

    return parts.map((part, index) => {
      // If the part matches hashtag pattern, render it with blue color
      if (part.match(hashtagRegex)) {
        return (
          <span key={index} className="text-blue-500">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // For expanded view, show full text with Less button
  if (isExpanded) {
    return (
      <div className={`${className}`}>
        <div>
          <span className="text-sm">
            {renderTextWithHashtags(text)}{" "}
            {shouldShowButton && (
              <button
                onClick={toggleExpanded}
                className="text-gray-500 dark:text-gray-400 text-sm font-medium focus:outline-none hover:text-gray-700 dark:hover:text-gray-300"
              >
                less
              </button>
            )}
          </span>
        </div>
      </div>
    );
  }

  // For collapsed view, show truncated text with More button
  return (
    <div className={`${className}`}>
      <div className="relative">
        {shouldShowButton ? (
          <div>
            <span ref={textRef} className="text-sm">
              {renderTextWithHashtags(truncatedText)}
              {!isExpanded && "... "}
            </span>
            <button
              onClick={toggleExpanded}
              className="text-gray-500 dark:text-gray-400 font-medium focus:outline-none hover:text-gray-700 dark:hover:text-gray-300 text-sm"
            >
              more
            </button>
          </div>
        ) : (
          <span className="text-sm">{renderTextWithHashtags(text)}</span>
        )}
      </div>
    </div>
  );
};

export default Caption;
