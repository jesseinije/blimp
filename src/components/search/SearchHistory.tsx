import React from "react";
import { XMarkIcon, ClockIcon } from "@heroicons/react/24/outline";
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
            <ClockIcon className="h-5 w-5 text-gray-400" />
            <span className="text-base">{item.query}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClearItem(item.id);
            }}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <XMarkIcon className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchHistory;
