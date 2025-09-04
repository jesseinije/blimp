import { useState } from "react";
import {
  TextT,
  Microphone,
  User,
  Sparkle,
  CaretDown,
  CaretUp,
} from "phosphor-react";

interface RightCameraControlsProps {
  onFiltersClick: () => void;
  onTextClick: () => void;
  onVoiceoverClick: () => void;
  onCapturePress: () => void;
  activeButtons?: string[];
  isRecording?: boolean;
}

const RightCameraControls = ({
  onFiltersClick,
  onTextClick,
  onVoiceoverClick,
  activeButtons = ["Beautify", "Filters"],
}: RightCameraControlsProps) => {
  // State declarations first
  const [showLabels, setShowLabels] = useState(false);

  // Define all functions before using them
  const toggleLabels = () => {
    setShowLabels(!showLabels);
  };

  // Define controls after all functions are defined
  const controls = [
    {
      icon: <TextT size={28} />,
      label: "Text",
      onClick: onTextClick,
      active: activeButtons.includes("Text"),
      disabled: false,
    },
    {
      icon: <Microphone size={28} />,
      label: "Voiceover",
      onClick: onVoiceoverClick,
      active: activeButtons.includes("Voiceover"),
      disabled: false,
    },
    {
      icon: <User size={28} />,
      label: "Beautify",
      onClick: () => {
        console.log("Beautify clicked");
      },
      active: activeButtons.includes("Beautify"),
      disabled: false,
    },
    {
      icon: <Sparkle size={28} />,
      label: "Filters",
      onClick: onFiltersClick,
      active: activeButtons.includes("Filters"),
      disabled: false,
    },
  ];

  return (
    <>
      <div className="fixed right-3 top-1/2 transform -translate-y-1/2 z-10">
        <div className="flex flex-col items-end space-y-2">
          {controls.map((control, index) => (
            <div key={index} className="flex items-center">
              {/* Label - conditionally displayed */}
              {showLabels && (
                <div className="mr-2 text-white text-sm whitespace-nowrap animate-fadeIn">
                  {control.label}
                </div>
              )}

              {/* Button */}
              <div className="relative">
                <button
                  onClick={control.onClick}
                  className={`mb-2 flex items-center justify-center ${
                    control.disabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={control.disabled}
                  aria-label={control.label}
                >
                  <div className="text-white">{control.icon}</div>
                </button>

                {/* Active indicator */}
                {control.active && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Toggle button for labels */}
          <div className="flex items-center">
            {showLabels && (
              <div className="mr-3 opacity-0">
                {/* Empty space to maintain alignment */}
                Placeholder
              </div>
            )}
            <button
              onClick={toggleLabels}
              className=" flex items-center justify-center"
              aria-label={showLabels ? "Hide labels" : "Show labels"}
            >
              <div className="text-white">
                {showLabels ? <CaretUp size={28} /> : <CaretDown size={28} />}
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightCameraControls;
