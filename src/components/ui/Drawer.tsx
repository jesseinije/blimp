import React, { useEffect } from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ open, onClose, children }) => {
  // Handle body scroll locking
  useEffect(() => {
    if (open) {
      // Store current scroll position
      const scrollY = window.scrollY;

      // Add styles to prevent body scroll
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollY}px`;

      // Cleanup function to restore scrolling
      return () => {
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.top = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          transition: "opacity 0.3s",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        className="fixed inset-0 bg-black bg-opacity-40 z-40"
      />
      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 overflow-y-auto"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Drawer Content with max height and scrolling */}
        <div className="h-full overflow-y-auto">
          <div className="p-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Drawer;
