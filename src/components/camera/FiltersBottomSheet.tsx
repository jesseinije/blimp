import { useState, useRef, useEffect } from "react";
import BottomSheet from "../ui/BottomSheet";
import { Check } from "phosphor-react";

// Define filter types and export it
export interface Filter {
  id: string;
  name: string;
  previewUrl: string; // URL to a thumbnail image showing the filter effect
  cssFilter: string; // CSS filter string that will be applied to the video
}

interface FiltersBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterSelect: (filter: Filter) => void;
  selectedFilter: Filter | null;
  showBackdrop?: boolean; // Add this prop to control backdrop visibility
}

const FiltersBottomSheet = ({
  isOpen,
  onClose,
  onFilterSelect,
  selectedFilter,
  showBackdrop = true, // Default to true for backward compatibility
}: FiltersBottomSheetProps) => {
  // We'll use the same balloon image for all filters for demo purposes
  // In a real app, you'd have different images showing the actual filter effects
  const balloonImageUrl = "/src/assets/images/balloon.png";

  // Sample filters with image previews
  const filters: Filter[] = [
    {
      id: "normal",
      name: "Normal",
      previewUrl: balloonImageUrl,
      cssFilter: "none",
    },
    {
      id: "pop",
      name: "Pop",
      previewUrl: balloonImageUrl,
      cssFilter: "contrast(1.2) saturate(1.5)",
    },
    {
      id: "dreamy",
      name: "Dreamy",
      previewUrl: balloonImageUrl,
      cssFilter: "brightness(1.1) contrast(0.9) saturate(0.9) blur(0.5px)",
    },
    {
      id: "soft",
      name: "Soft",
      previewUrl: balloonImageUrl,
      cssFilter: "brightness(1.1) contrast(0.9) saturate(0.8)",
    },
    {
      id: "luxe",
      name: "Luxe",
      previewUrl: balloonImageUrl,
      cssFilter: "contrast(1.1) brightness(1.1) saturate(1.2)",
    },
    {
      id: "electric",
      name: "Electric",
      previewUrl: balloonImageUrl,
      cssFilter: "contrast(1.3) saturate(1.6) hue-rotate(5deg)",
    },
    {
      id: "chic",
      name: "Chic",
      previewUrl: balloonImageUrl,
      cssFilter: "sepia(0.2) contrast(1.1) brightness(1.05)",
    },
  ];

  // Scroll to the selected filter when the component mounts or selection changes
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilterId, setActiveFilterId] = useState<string>(
    selectedFilter?.id || filters[0].id
  );

  // Scroll to active filter
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const selectedElement = document.getElementById(
        `filter-${activeFilterId}`
      );
      if (selectedElement) {
        const containerWidth = containerRef.current.clientWidth;
        const scrollPosition =
          selectedElement.offsetLeft -
          containerWidth / 2 +
          selectedElement.clientWidth / 2;

        containerRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [isOpen, activeFilterId]);

  // Handle filter selection
  const handleFilterClick = (filter: Filter) => {
    setActiveFilterId(filter.id);
    onFilterSelect(filter);
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      height="auto"
      showHandle={true}
      title="Filters"
      showBackdrop={showBackdrop} // Pass the prop to BottomSheet
    >
      <div className="py-4 bg-black">
        <div
          ref={containerRef}
          className="flex overflow-x-auto pb-2 space-x-4 no-scrollbar"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {filters.map((filter) => (
            <div
              key={filter.id}
              id={`filter-${filter.id}`}
              className="flex flex-col items-center flex-shrink-0 scroll-snap-align-center"
              style={{ scrollSnapAlign: "center" }}
            >
              {/* Improved selection highlight with distinct borders */}
              <div
                className={`relative ${
                  activeFilterId === filter.id
                    ? "p-0.5 bg-white rounded-lg"
                    : ""
                }`}
              >
                <button
                  onClick={() => handleFilterClick(filter)}
                  className="relative w-20 h-20 rounded-lg overflow-hidden focus:outline-none"
                  aria-label={`Apply ${filter.name} filter`}
                >
                  <div
                    className="w-full h-full"
                    style={{ filter: filter.cssFilter }}
                  >
                    <img
                      src={filter.previewUrl}
                      alt={filter.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Selected filter indicator */}
                  {activeFilterId === filter.id && (
                    <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5">
                      <Check size={12} className="text-black" />
                    </div>
                  )}
                </button>
              </div>
              {/* Filter name label */}
              <p className="mt-2 text-sm text-center text-white font-medium">
                {filter.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
};

export default FiltersBottomSheet;
