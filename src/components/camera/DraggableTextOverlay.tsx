import { useState, useRef, useEffect } from "react";
import { Trash } from "phosphor-react";
// Use import type for type-only imports
import type { TextOverlay } from "./textOverlayTypes";

interface DraggableTextOverlayProps {
  overlays: TextOverlay[];
  onSelect: (id: string) => void;
  onMove: (id: string, position: { x: number; y: number }) => void;
  onDelete: (id: string) => void;
  showDeleteZone: boolean;
  onEdit?: (id: string) => void; // Renamed from onDoubleClick to onEdit
}

const DraggableTextOverlay = ({
  overlays,
  onSelect,
  onMove,
  onDelete,
  showDeleteZone,
  onEdit,
}: DraggableTextOverlayProps) => {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const deleteZoneRef = useRef<HTMLDivElement>(null);

  // Clean up any lingering event listeners
  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
    // eslint-disable-next-line
  }, []);

  // Add mousedown/touchstart event to start dragging
  const handleDragStart = (
    e: React.MouseEvent | React.TouchEvent,
    id: string,
    currentPosition: { x: number; y: number }
  ) => {
    e.stopPropagation();
    e.preventDefault();

    onSelect(id);
    setDraggedId(id);
    setIsDragging(true);

    let clientX: number, clientY: number;

    if ("touches" in e) {
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      setDragOffset({
        x: clientX - rect.left - currentPosition.x,
        y: clientY - rect.top - currentPosition.y,
      });
    }

    // Add event listeners for mouse/touch move and up/end events
    if ("touches" in e) {
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);
    } else {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && draggedId && containerRef.current) {
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      // Calculate new position
      let newX = e.clientX - rect.left - dragOffset.x;
      let newY = e.clientY - rect.top - dragOffset.y;

      // Limit to container bounds
      newX = Math.max(0, Math.min(newX, rect.width - 20));
      newY = Math.max(0, Math.min(newY, rect.height - 20));

      onMove(draggedId, { x: newX, y: newY });

      // Check if overlay is over delete zone
      if (deleteZoneRef.current && showDeleteZone) {
        const deleteRect = deleteZoneRef.current.getBoundingClientRect();
        if (
          e.clientX >= deleteRect.left &&
          e.clientX <= deleteRect.right &&
          e.clientY >= deleteRect.top &&
          e.clientY <= deleteRect.bottom
        ) {
          deleteZoneRef.current.classList.add("bg-red-600");
        } else {
          deleteZoneRef.current.classList.remove("bg-red-600");
        }
      }
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault(); // Prevent scrolling while dragging
    if (isDragging && draggedId && containerRef.current) {
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      // Get touch coordinates
      const touch = e.touches[0];

      // Calculate new position
      let newX = touch.clientX - rect.left - dragOffset.x;
      let newY = touch.clientY - rect.top - dragOffset.y;

      // Limit to container bounds
      newX = Math.max(0, Math.min(newX, rect.width - 20));
      newY = Math.max(0, Math.min(newY, rect.height - 20));

      onMove(draggedId, { x: newX, y: newY });

      // Check if overlay is over delete zone
      if (deleteZoneRef.current && showDeleteZone) {
        const deleteRect = deleteZoneRef.current.getBoundingClientRect();
        if (
          touch.clientX >= deleteRect.left &&
          touch.clientX <= deleteRect.right &&
          touch.clientY >= deleteRect.top &&
          touch.clientY <= deleteRect.bottom
        ) {
          deleteZoneRef.current.classList.add("bg-red-600");
        } else {
          deleteZoneRef.current.classList.remove("bg-red-600");
        }
      }
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (isDragging && draggedId && deleteZoneRef.current && showDeleteZone) {
      const deleteRect = deleteZoneRef.current.getBoundingClientRect();
      if (
        e.clientX >= deleteRect.left &&
        e.clientX <= deleteRect.right &&
        e.clientY >= deleteRect.top &&
        e.clientY <= deleteRect.bottom
      ) {
        onDelete(draggedId);
      }
    }

    cleanupDrag();
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (isDragging && draggedId && deleteZoneRef.current && showDeleteZone) {
      const deleteRect = deleteZoneRef.current.getBoundingClientRect();
      const touch = e.changedTouches[0];

      if (
        touch.clientX >= deleteRect.left &&
        touch.clientX <= deleteRect.right &&
        touch.clientY >= deleteRect.top &&
        touch.clientY <= deleteRect.bottom
      ) {
        onDelete(draggedId);
      }
    }

    cleanupDrag();
  };

  const cleanupDrag = () => {
    setIsDragging(false);
    setDraggedId(null);

    if (deleteZoneRef.current) {
      deleteZoneRef.current.classList.remove("bg-red-600");
    }

    // Remove event listeners
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-20 pointer-events-none"
    >
      {/* Drag delete zone - only visible when dragging */}
      {showDeleteZone && (
        <div
          ref={deleteZoneRef}
          className={`absolute bottom-28 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-red-500/50 rounded-full flex items-center justify-center transition-colors duration-200 ${
            isDragging ? "opacity-100" : "opacity-0"
          }`}
        >
          <Trash size={32} className="text-white" />
          <span className="text-white text-sm absolute bottom-4">
            Drag here to delete
          </span>
        </div>
      )}

      {/* Text overlays */}
      {overlays.map((overlay) => (
        <div
          key={overlay.id}
          className={`absolute pointer-events-auto cursor-move select-none ${
            overlay.isSelected ? "ring-2 ring-blue-500" : ""
          }`}
          style={{
            left: `${overlay.position.x}px`,
            top: `${overlay.position.y}px`,
            maxWidth: "80%",
            padding: "4px",
          }}
          onMouseDown={(e) => handleDragStart(e, overlay.id, overlay.position)}
          onTouchStart={(e) => handleDragStart(e, overlay.id, overlay.position)}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(overlay.id);
            if (onEdit) {
              onEdit(overlay.id);
            }
          }}
        >
          <p
            style={{
              color: overlay.style.color,
              fontSize: `${overlay.style.fontSize}px`,
              fontFamily: overlay.style.fontFamily,
              textShadow: "0 1px 2px rgba(0,0,0,0.5)",
              overflowWrap: "break-word",
            }}
          >
            {overlay.text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DraggableTextOverlay;
