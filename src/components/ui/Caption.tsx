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
    // Remove line breaks for length calculation
    const textWithoutBreaks = text.replace(/\n/g, "");

    if (textWithoutBreaks.length > maxLength) {
      setShouldShowButton(true);

      // Find a suitable truncation point that doesn't cut in the middle of a line
      let truncationPoint = maxLength - 5;
      const lines = text.split("\n");
      let currentLength = 0;
      let selectedLines = [];

      for (const line of lines) {
        if (currentLength + line.length <= truncationPoint) {
          selectedLines.push(line);
          currentLength += line.length + 1; // +1 for the newline character
        } else {
          // If this is the first line and it's too long, truncate it
          if (selectedLines.length === 0) {
            selectedLines.push(line.substring(0, truncationPoint));
          }
          break;
        }
      }

      setTruncatedText(selectedLines.join("\n"));
    } else {
      setTruncatedText(text);
      setShouldShowButton(false);
    }
  }, [text, maxLength]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const renderTextWithHighlights = (text: string) => {
    // Split by line breaks first to preserve them
    const lines = text.split("\n");

    return lines.map((line, lineIndex) => {
      // Process each line for hashtags and mentions
      const highlightRegex = /(#\w+|@\w+)/g;
      const parts = line.split(highlightRegex);

      const processedLine = parts.map((part, partIndex) => {
        if (part.match(highlightRegex)) {
          return (
            <span
              key={`${lineIndex}-${partIndex}`}
              className={highlightClassName}
            >
              {part}
            </span>
          );
        }
        return part;
      });

      // Return each line with a <br /> after it, except for the last line
      return (
        <span key={`line-${lineIndex}`}>
          {processedLine}
          {lineIndex < lines.length - 1 && <br />}
        </span>
      );
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
                className="text-gray-400 text-sm font-medium focus:outline-none"
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
              className="text-gray-400 font-medium focus:outline-none text-sm"
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
