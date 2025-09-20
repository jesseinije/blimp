import React from "react";
import { X, Clock } from "phosphor-react"; // Replace Heroicons imports
import type { SearchHistoryItem } from "../../types/searchTypes";

interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onClearItem: (id: string) => void;
  onSelectItem: (query: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  history,
  onClearItem,
  onSelectItem,
}) => {
  if (history.length === 0) return null;

  return (
    <div className="mb-6">
      {history.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between py-3 cursor-pointer"
          onClick={() => onSelectItem(item.query)}
        >
          <div className="flex items-center space-x-3">
            <Clock size={20} className="text-gray-400" />{" "}
            {/* Replace ClockIcon */}
            <span className="text-sm text-gray-900">{item.query}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClearItem(item.id);
            }}
            className="p-1 rounded-full"
          >
            <X size={20} className="text-gray-400" /> {/* Replace XMarkIcon */}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchHistory;
