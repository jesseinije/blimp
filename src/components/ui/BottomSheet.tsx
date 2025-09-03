import { useRef, useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  height?: "auto" | "half" | "full" | "fullscreen" | "80vh" | "75vh" | "70vh";
  showBackdrop?: boolean;
  showHandle?: boolean;
  dragThreshold?: number;
  onDrag?: (offset: number) => void;
  customCloseButton?: React.ReactNode;
}

const BottomSheet = ({
  isOpen,
  onClose,
  title,
  children,
  height = "auto",
  showBackdrop = true,
  showHandle = true,
  dragThreshold = 100,
  customCloseButton,
}: BottomSheetProps) => {
  const initialFocusRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle scroll locking
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
  }, [isOpen]);

  const getSheetHeightStyles = () => {
    switch (height) {
      case "full":
      case "fullscreen":
        return {
          height: "100dvh",
          maxHeight: "100dvh",
          // Add support for devices with home indicators and browser bars
          "@supports (height: 100dvh)": {
            height:
              "calc(100dvh - env(safe-area-inset-bottom, 0px) - env(safe-area-inset-top, 0px))",
            maxHeight:
              "calc(100dvh - env(safe-area-inset-bottom, 0px) - env(safe-area-inset-top, 0px))",
          },
        };
      case "half":
        return {
          height: "50dvh",
          maxHeight: "50dvh",
          "@supports (height: 100dvh)": {
            height: "calc(50dvh - env(safe-area-inset-bottom, 0px))",
            maxHeight: "calc(50dvh - env(safe-area-inset-bottom, 0px))",
          },
        };
      case "80vh":
        return {
          height: "80dvh",
          maxHeight: "80dvh",
          "@supports (height: 100dvh)": {
            height: "calc(80dvh - env(safe-area-inset-bottom, 0px))",
            maxHeight: "calc(80dvh - env(safe-area-inset-bottom, 0px))",
          },
        };
      case "75vh":
        return {
          height: "75dvh",
          maxHeight: "75dvh",
          "@supports (height: 100dvh)": {
            height: "calc(75dvh - env(safe-area-inset-bottom, 0px))",
            maxHeight: "calc(75dvh - env(safe-area-inset-bottom, 0px))",
          },
        };
      case "70vh":
        return {
          height: "70dvh",
          maxHeight: "70dvh",
          "@supports (height: 100dvh)": {
            height: "calc(70dvh - env(safe-area-inset-bottom, 0px))",
            maxHeight: "calc(70dvh - env(safe-area-inset-bottom, 0px))",
          },
        };
      default:
        return {
          height: "auto",
          maxHeight: "90dvh",
          "@supports (height: 100dvh)": {
            maxHeight: "calc(90dvh - env(safe-area-inset-bottom, 0px))",
          },
        };
    }
  };

  // Add this to ensure viewport height is correct on mobile
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);
    window.addEventListener("orientationchange", setViewportHeight);

    return () => {
      window.removeEventListener("resize", setViewportHeight);
      window.removeEventListener("orientationchange", setViewportHeight);
    };
  }, []);

  const sheetStyles = {
    ...getSheetHeightStyles(),
  };

  return (
    <Dialog as="div" className="relative z-50" onClose={onClose} open={isOpen}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            {showBackdrop && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-0 bg-gray-500/20 backdrop-blur-[2px]"
                onClick={onClose}
              />
            )}

            {/* Bottom Sheet Panel */}
            <div className="fixed inset-0 overflow-hidden">
              <div className="flex min-h-full items-end justify-center text-center">
                <Dialog.Panel className="w-full">
                  <motion.div
                    ref={panelRef}
                    style={sheetStyles}
                    className={`
                      w-full transform bg-white  
                      text-left align-middle shadow-xl
                      flex flex-col rounded-t-3xl overflow-hidden
                      pb-safe focus:outline-none
                    `}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{
                      type: "tween", // Change from "spring" to "tween"
                      duration: 0.35, // Add a specific duration
                      ease: [0.4, 0, 0.2, 1], // Add custom easing
                    }}
                    drag="y"
                    dragConstraints={{ top: 0 }}
                    dragElastic={0.2}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={(_, info) => {
                      setIsDragging(false);
                      if (
                        info.velocity.y > 300 ||
                        info.offset.y > dragThreshold
                      ) {
                        onClose();
                      }
                    }}
                  >
                    <div
                      ref={initialFocusRef}
                      tabIndex={-1}
                      className="sticky top-0 z-10 bg-white rounded-t-3xl outline-none"
                    >
                      {showHandle && (
                        <div className="pt-2 pb-4">
                          <div className="mx-auto w-12 h-1 rounded-full bg-gray-300 " />
                        </div>
                      )}

                      {title && (
                        <div className="flex items-center justify-between pb-4 px-4 mb-3 border-b border-gray-200  relative">
                          <div className="absolute left-4">
                            {customCloseButton}
                          </div>
                          <Dialog.Title
                            as="h3"
                            className="text-sm font-medium leading-6 text-gray-900  absolute left-1/2 transform -translate-x-1/2 text-center"
                          >
                            {title}
                          </Dialog.Title>
                          <div className="w-12"></div>
                        </div>
                      )}
                    </div>

                    <div
                      className={`${
                        isDragging ? "pointer-events-none" : ""
                      } flex-1 overflow-y-auto scrollbar-hide px-3`}
                    >
                      {children}
                    </div>
                  </motion.div>
                </Dialog.Panel>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default BottomSheet;
