import { Fragment, useRef, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  height?: "auto" | "half" | "full" | "fullscreen" | "80vh" | "75vh" | "70vh"; // Added new options
  showBackdrop?: boolean;
  showHandle?: boolean;
  dragThreshold?: number; // New prop to customize drag threshold
  onDrag?: (offset: number) => void;
  customCloseButton?: React.ReactNode; // Add this prop
}

const BottomSheet = ({
  isOpen,
  onClose,
  title,
  children,
  height = "auto",
  showBackdrop = true,
  showHandle = true,
  dragThreshold = 100, // Default value
  onDrag,
  customCloseButton, // Destructure the new prop
}: BottomSheetProps) => {
  const initialFocusRef = useRef(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [backdropOpacity, setBackdropOpacity] = useState(1); // For visual feedback

  // For velocity calculation
  const lastPositionRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // Reset state when sheet opens
  useEffect(() => {
    if (isOpen) {
      setOffsetY(0);
      setBackdropOpacity(1);
      velocityRef.current = 0;
    }
  }, [isOpen]);

  // Handle dragging functionality
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const y = e.touches[0].clientY;
    setStartY(y);
    lastPositionRef.current = y;
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const y = e.clientY;
    setStartY(y);
    lastPositionRef.current = y;
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;
    // Prevent text selection during drag
    document.body.style.userSelect = "none";
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    handleDrag(currentY);
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement> | MouseEvent
  ) => {
    if (!isDragging) return;
    const currentY = e.clientY;
    handleDrag(currentY);
  };

  // Shared drag logic with velocity tracking
  const handleDrag = (currentY: number) => {
    const diff = currentY - startY;

    if (diff > 0) {
      // Only allow dragging down
      setOffsetY(diff);
      onDrag?.(diff); // Report drag offset to parent

      // Calculate backdrop opacity based on drag distance
      const dragPercentage = Math.min(diff / dragThreshold, 1);
      setBackdropOpacity(1 - dragPercentage * 0.6);

      // Calculate velocity (pixels per millisecond)
      const now = Date.now();
      const elapsed = now - lastTimeRef.current;

      if (elapsed > 0) {
        const deltaY = currentY - lastPositionRef.current;
        velocityRef.current = deltaY / elapsed; // pixels per millisecond

        lastPositionRef.current = currentY;
        lastTimeRef.current = now;
      }
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    document.body.style.userSelect = "";

    // Get current velocity in pixels per second
    const velocity = velocityRef.current * 1000;

    // Get the sheet height to calculate threshold based on percentage
    const sheetHeight = panelRef.current?.getBoundingClientRect().height || 0;
    const draggedPercentage = (offsetY / sheetHeight) * 100;

    // Close if:
    // 1. User dragged more than 25% of sheet height, OR
    // 2. User flicked downward with significant velocity
    if (draggedPercentage > 25 || (velocity > 300 && offsetY > 20)) {
      onClose();
    } else {
      // Spring back animation
      setOffsetY(0);
      onDrag?.(0);
      setBackdropOpacity(1);
    }

    // Reset velocity
    velocityRef.current = 0;
  };

  // Add mouse event listeners for dragging outside the component
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleDragEnd);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleDragEnd);
      };
    }
  }, [isDragging]);

  // Determine sheet height styles based on height prop
  const getSheetHeightStyles = () => {
    switch (height) {
      case "half":
        return { height: "50vh", maxHeight: "50vh" }; // Add explicit height
      case "80vh":
        return { height: "80vh", maxHeight: "80vh" }; // Add explicit height
      case "75vh":
        return { height: "75vh", maxHeight: "75vh" }; // Add explicit height
      case "70vh":
        return { height: "70vh", maxHeight: "70vh" }; // Add explicit height
      case "full":
        return { height: "100vh", maxHeight: "100vh" };
      case "fullscreen":
        return { height: "100vh", maxHeight: "100vh" };
      default:
        return { height: "auto", maxHeight: "auto" }; // Add explicit height
    }
  };

  const sheetStyles = {
    ...getSheetHeightStyles(),
    transform: isDragging ? `translateY(${offsetY}px)` : undefined,
    transition: isDragging ? "none" : "transform 0.3s ease-out", // Add spring-back animation
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onClose}
        initialFocus={initialFocusRef}
      >
        {/* Backdrop - using a more transparent background */}
        {showBackdrop && (
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-gray-500/20 dark:bg-gray-900/30 backdrop-blur-[2px]"
              style={{ opacity: backdropOpacity }} // Dynamic opacity based on drag
            />
          </Transition.Child>
        )}

        {/* Bottom Sheet Panel */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="flex min-h-full items-end justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-full"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-full"
            >
              <Dialog.Panel
                ref={panelRef}
                style={sheetStyles}
                className={`w-full transform bg-white dark:bg-gray-800 text-left align-middle shadow-xl transition-all flex flex-col h-auto rounded-t-3xl overflow-hidden`}
              >
                {/* Entire panel becomes draggable for better UX */}
                <div
                  className="sticky top-0 z-10 bg-white dark:bg-gray-800 rounded-t-3xl cursor-grab active:cursor-grabbing"
                  ref={initialFocusRef}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleDragEnd}
                  onMouseDown={handleMouseDown}
                >
                  {/* Always show draggable area with handle */}
                  {showHandle && (
                    <div className="pt-2 pb-4">
                      {" "}
                      {/* Changed pb-2 to pb-4 for more space */}
                      <div className="mx-auto w-12 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                    </div>
                  )}

                  {/* Header: title only */}
                  {title && (
                    <div className="flex items-center justify-between pb-4 px-4 mb-3 border-b border-gray-200 dark:border-gray-700 relative">
                      {" "}
                      {/* Added px-4 */}
                      {/* Left side - Back button */}
                      <div className="absolute left-4">{customCloseButton}</div>
                      {/* Center - Title */}
                      <Dialog.Title
                        as="h3"
                        className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 absolute left-1/2 transform -translate-x-1/2 text-center"
                      >
                        {title}
                      </Dialog.Title>
                      {/* Right side - Empty space for balance */}
                      <div className="w-12"></div>
                    </div>
                  )}
                </div>

                {/* Scrollable Content Area */}
                <div
                  className={`${
                    isDragging ? "pointer-events-none" : ""
                  } flex-1 overflow-y-auto scrollbar-hide px-3`}
                >
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BottomSheet;
