import { useState } from "react";
import BottomSheet from "../ui/BottomSheet";
import { Timer } from "@phosphor-icons/react";

interface TimerBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTimer: (seconds: number) => void;
  selectedTime: number;
}

const TimerBottomSheet = ({
  isOpen,
  onClose,
  onSelectTimer,
  selectedTime,
}: TimerBottomSheetProps) => {
  const timerOptions = [
    { seconds: 0, label: "Off" },
    { seconds: 3, label: "3s" },
    { seconds: 5, label: "5s" },
    { seconds: 10, label: "10s" },
  ];

  const handleSelect = (seconds: number) => {
    onSelectTimer(seconds);
    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Timer"
      height="auto"
      showHandle={true}
    >
      <div className="py-4 px-4 bg-black">
        <div className="grid grid-cols-4 gap-4">
          {timerOptions.map((option) => (
            <button
              key={option.seconds}
              onClick={() => handleSelect(option.seconds)}
              className={`flex flex-col items-center p-4 rounded-xl ${
                selectedTime === option.seconds ? "bg-blue-600" : "bg-gray-800"
              }`}
            >
              <Timer
                size={24}
                weight="bold"
                className={`mb-2 ${
                  selectedTime === option.seconds
                    ? "text-white"
                    : "text-gray-400"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  selectedTime === option.seconds
                    ? "text-white"
                    : "text-gray-400"
                }`}
              >
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
};

export default TimerBottomSheet;
