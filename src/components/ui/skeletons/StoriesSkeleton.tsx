import Skeleton from "react-loading-skeleton";

export const StoriesSkeleton = () => {
  return (
    <div className="bg-white p-4 w-full overflow-x-auto no-scrollbar">
      <div className="flex space-x-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            {/* Story circle with ring effect */}
            <div className="relative">
              <div className="w-20 h-20">
                <Skeleton
                  circle
                  height="100%"
                  width="100%"
                  className="ring-2 ring-offset-2 ring-gray-200"
                />
                {/* Add plus button skeleton for first item */}
                {index === 0 && (
                  <div className="absolute bottom-0 right-0">
                    <Skeleton
                      circle
                      height={16}
                      width={16}
                      className="border-2 border-white"
                    />
                  </div>
                )}
              </div>
            </div>
            {/* Username skeleton */}
            <Skeleton width={60} height={12} />
          </div>
        ))}
        <div style={{ width: "4px" }} className="flex-shrink-0"></div>
      </div>
    </div>
  );
};
