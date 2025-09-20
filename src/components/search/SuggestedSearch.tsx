import React from "react";
import { MagnifyingGlass, ArrowClockwise } from "phosphor-react";
import type { SuggestedSearchItem } from "../../types/searchTypes";

interface SuggestedSearchProps {
  suggestions: SuggestedSearchItem[];
  onSelectSuggestion: (query: string) => void;
  onRefresh: () => void;
}

const SuggestedSearch: React.FC<SuggestedSearchProps> = ({
  suggestions,
  onSelectSuggestion,
  onRefresh,
}) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="mb-6 pt-4 border-t border-gray-200 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">You may like</h2>
        <button
          onClick={onRefresh}
          className="text-gray-400 flex items-center text-sm"
          aria-label="Refresh suggestions"
        >
          <span className="mr-1">Refresh</span>
          <ArrowClockwise size={16} />
        </button>
      </div>
      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="flex items-center justify-between py-3 cursor-pointer"
            onClick={() => onSelectSuggestion(suggestion.query)}
          >
            <div className="flex flex-col flex-1">
              <span className="font-semibold text-sm">{suggestion.query}</span>
              {suggestion.postCount && (
                <span className="text-sm text-gray-400">
                  {suggestion.postCount.toLocaleString()} posts
                </span>
              )}
            </div>

            {suggestion.imageUrl ? (
              <div className="h-10 w-10 rounded-full overflow-hidden ml-3">
                <img
                  src={suggestion.imageUrl}
                  alt={suggestion.query}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <MagnifyingGlass size={20} className="text-gray-400 ml-3" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedSearch;
