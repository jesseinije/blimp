import React from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ open, onClose, children }) => {
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
        className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="p-4">{children}</div>
      </div>
    </>
  );
};

export default Drawer;
