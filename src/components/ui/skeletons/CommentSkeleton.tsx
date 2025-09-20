import Skeleton from "react-loading-skeleton";

export const CommentSkeleton = () => {
  return (
    <div className="flex mb-4">
      {/* Comment avatar */}
      <Skeleton circle width={32} height={32} className="mr-3" />

      <div className="flex-1">
        <div className="flex items-start">
          <div className="flex-1">
            {/* Username and timestamp */}
            <div className="flex items-center">
              <Skeleton width={80} height={16} className="mr-2" />
              <Skeleton width={40} height={12} />
            </div>

            {/* Comment text */}
            <div className="mt-1">
              <Skeleton width="95%" height={16} />
              <Skeleton width="60%" height={16} />
            </div>

            {/* Actions row */}
            <div className="mt-2 flex items-center space-x-4">
              <Skeleton width={40} height={14} />
              <Skeleton width={40} height={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
