import Skeleton from "react-loading-skeleton";

export const PostSkeleton = () => {
  return (
    <div className="bg-white  mb-0 overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-2">
          <Skeleton circle width={32} height={32} />
          <div>
            <div className="flex items-center">
              <Skeleton width={120} />
            </div>
            {/* Music overlay skeleton */}
            <div className="mt-1">
              <Skeleton width={80} height={12} />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Skeleton width={64} height={24} borderRadius={6} />
          <Skeleton circle width={24} height={24} />
        </div>
      </div>

      {/* Post Media */}
      <div className="aspect-square w-full">
        <Skeleton height="100%" style={{ aspectRatio: "1" }} />
      </div>

      {/* Post Actions */}
      <div className="p-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex space-x-4">
            {/* Like, Comment, Repost, Share buttons */}
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center">
                <Skeleton circle width={24} height={24} className="mr-1" />
                <Skeleton width={20} height={16} />
              </div>
            ))}
          </div>
          {/* Bookmark button */}
          <Skeleton circle width={24} height={24} />
        </div>

        {/* Caption skeleton */}
        <div className="mt-2">
          <Skeleton width="90%" />
          <Skeleton width="60%" />
        </div>

        {/* Timestamp skeleton */}
        <div className="mt-1">
          <Skeleton width={60} height={12} />
        </div>
      </div>
    </div>
  );
};
