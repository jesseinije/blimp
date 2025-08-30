export interface TextStyle {
  color: string;
  fontSize: number;
  fontFamily: string;
}

export interface TextOverlay {
  id: string;
  text: string;
  style: TextStyle;
  position: { x: number; y: number };
  isSelected: boolean;
}

import { useState, useRef, useEffect } from "react";
import BottomSheet from "../ui/BottomSheet";
import { PlusIcon, MinusIcon, CheckIcon } from "@heroicons/react/24/outline";

interface TextOverlayBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAddText: (text: string, style: TextStyle) => void;
  onUpdateText?: (id: string, text: string, style: TextStyle) => void;
  onUpdateTextStyle: (style: TextStyle) => void;
  currentStyle: TextStyle;
  showBackdrop?: boolean;
  editingText?: TextOverlay | null;
}

const MAX_CHARS = 30;

const TextOverlayBottomSheet = ({
  isOpen,
  onClose,
  onAddText,
  onUpdateText,
  onUpdateTextStyle,
  currentStyle,
  showBackdrop = true,
  editingText = null,
}: TextOverlayBottomSheetProps) => {
  const [text, setText] = useState("");
  const [textStyle, setTextStyle] = useState<TextStyle>(currentStyle);
  const textInputRef = useRef<HTMLInputElement>(null);

  // Determine if we're in edit mode
  const isEditMode = !!editingText;

  // Available color options
  const colorOptions = [
    { name: "White", value: "#FFFFFF" },
    { name: "Black", value: "#000000" },
    { name: "Red", value: "#FF0000" },
    { name: "Blue", value: "#0000FF" },
    { name: "Yellow", value: "#FFFF00" },
    { name: "Green", value: "#00FF00" },
    { name: "Pink", value: "#FF69B4" },
    { name: "Purple", value: "#800080" },
  ];

  // Font family options - THIS WAS MISSING
  const fontOptions = [
    { name: "Sans", value: "sans-serif" },
    { name: "Serif", value: "serif" },
    { name: "Mono", value: "monospace" },
    { name: "Cursive", value: "cursive" },
  ];

  // Set initial text and style when editing an existing overlay or when opening a new sheet
  useEffect(() => {
    if (isOpen) {
      if (editingText) {
        setText(editingText.text);
        setTextStyle(editingText.style);
      } else {
        setText("");
        setTextStyle(currentStyle);
      }
    }
  }, [isOpen, editingText, currentStyle]);

  // Focus the text input when the sheet opens
  useEffect(() => {
    if (isOpen && textInputRef.current) {
      setTimeout(() => {
        textInputRef.current?.focus();
      }, 300); // Add a short delay to ensure the animation completes
    }
  }, [isOpen]);

  // Update local style when current style changes from parent (only in non-edit mode)
  useEffect(() => {
    if (!editingText) {
      setTextStyle(currentStyle);
    }
  }, [currentStyle, editingText]);

  const handleColorChange = (color: string) => {
    const newStyle = { ...textStyle, color };
    setTextStyle(newStyle);
    onUpdateTextStyle(newStyle);
  };

  const handleFontFamilyChange = (fontFamily: string) => {
    const newStyle = { ...textStyle, fontFamily };
    setTextStyle(newStyle);
    onUpdateTextStyle(newStyle);
  };

  const handleFontSizeChange = (increase: boolean) => {
    // Limit font size between 12 and 72
    let newSize = increase ? textStyle.fontSize + 2 : textStyle.fontSize - 2;
    newSize = Math.min(Math.max(newSize, 12), 72);

    const newStyle = { ...textStyle, fontSize: newSize };
    setTextStyle(newStyle);
    onUpdateTextStyle(newStyle);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    if (newText.length <= MAX_CHARS) {
      setText(newText);
    }
  };

  const handleSubmit = () => {
    if (text.trim()) {
      if (isEditMode && editingText && onUpdateText) {
        // Update existing text
        onUpdateText(editingText.id, text.trim(), textStyle);
      } else {
        // Add new text
        onAddText(text.trim(), textStyle);
      }
      setText(""); // Clear the input after adding
      onClose();
    }
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      height="auto"
      showHandle={true}
      title={isEditMode ? "Edit Text" : "Add Text"}
      showBackdrop={showBackdrop}
    >
      <div className="py-4 px-5 bg-black text-white">
        {/* Text input area */}
        <div className="mb-5 relative">
          <input
            ref={textInputRef}
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter your text..."
            maxLength={MAX_CHARS}
            className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              color: textStyle.color,
              fontFamily: textStyle.fontFamily,
              fontSize: `${textStyle.fontSize}px`,
            }}
          />
          {/* Character counter */}
          <div className="absolute right-3 bottom-3 text-xs text-gray-400">
            {text.length}/{MAX_CHARS}
          </div>
        </div>

        {/* Style controls */}
        <div className="space-y-6">
          {/* Font size controls */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Font Size</span>
            <div className="flex items-center space-x-5">
              <button
                onClick={() => handleFontSizeChange(false)}
                disabled={textStyle.fontSize <= 12}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-700 disabled:opacity-50"
                aria-label="Decrease font size"
              >
                <MinusIcon className="h-5 w-5" />
              </button>
              <span className="w-14 text-center">{textStyle.fontSize}px</span>
              <button
                onClick={() => handleFontSizeChange(true)}
                disabled={textStyle.fontSize >= 72}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-700 disabled:opacity-50"
                aria-label="Increase font size"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Font family selection */}
          <div>
            <span className="text-sm font-medium block mb-3">Font Style</span>
            <div className="flex flex-wrap gap-2">
              {fontOptions.map((font) => (
                <button
                  key={font.value}
                  onClick={() => handleFontFamilyChange(font.value)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    textStyle.fontFamily === font.value
                      ? "bg-blue-600"
                      : "bg-gray-700"
                  }`}
                  style={{ fontFamily: font.value }}
                >
                  {font.name}
                </button>
              ))}
            </div>
          </div>

          {/* Color selection */}
          <div>
            <span className="text-sm font-medium block mb-3">Color</span>
            <div className="flex items-center justify-between px-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleColorChange(color.value)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    textStyle.color === color.value ? "ring-2 ring-white" : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                  aria-label={`Select ${color.name} color`}
                >
                  {textStyle.color === color.value && (
                    <CheckIcon
                      className={`h-4 w-4 ${
                        ["#FFFFFF", "#FFFF00", "#00FF00"].includes(color.value)
                          ? "text-black"
                          : "text-white"
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit button - label changes based on edit mode */}
        <div className="mt-8 mb-2">
          <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50 hover:bg-blue-700 transition-colors"
          >
            {isEditMode ? "Update Text" : "Add Text"}
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default TextOverlayBottomSheet;
