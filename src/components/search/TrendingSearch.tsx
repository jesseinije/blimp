import React from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import type { TrendingTopic } from "../../types/searchTypes";

interface TrendingSearchProps {
  topics: TrendingTopic[];
  onSelectTopic: (topic: string) => void;
}

const TrendingSearch: React.FC<TrendingSearchProps> = ({
  topics,
  onSelectTopic,
}) => {
  if (topics.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Popular LIVE</h2>
      <div className="space-y-1">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="py-3 cursor-pointer"
            onClick={() => onSelectTopic(topic.topic)}
          >
            <div className="flex justify-between items-center mb-1">
              <div className="text-sm text-gray-500">
                Trending in {topic.location}
              </div>
              <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <EllipsisHorizontalIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="font-semibold text-base">{topic.topic}</div>
            <div className="text-sm text-gray-500">
              {topic.postCount.toLocaleString()} posts
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSearch;
