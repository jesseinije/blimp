import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ProfileSkeleton = ({
  showHeaderSkeleton = true,
}: {
  showHeaderSkeleton?: boolean;
}) => {
  return (
    <div className="pb-16 bg-white text-gray-900">
      {/* Conditionally render Header Skeleton */}
      {showHeaderSkeleton && (
        <div className="sticky top-0 z-10 w-full bg-white flex items-center justify-between p-3">
          <Skeleton width={24} height={24} />
          <div className="flex items-center gap-1">
            <Skeleton width={100} height={24} />
            <Skeleton width={16} height={16} circle />
          </div>
          <Skeleton width={24} height={24} />
        </div>
      )}

      {/* Profile Header Skeleton */}
      <div className="flex flex-col items-center pt-8 px-3">
        {/* Avatar Skeleton */}
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <Skeleton circle height="100%" />
        </div>

        {/* User info container with better spacing */}
        <div className="flex flex-col items-center mb-3">
          <div className="flex items-center gap-1">
            <Skeleton width={120} height={24} />
            <Skeleton circle width={24} height={24} />
          </div>
          <Skeleton width={100} height={16} />
        </div>

        {/* Social Links Skeleton */}
        <div className="mb-3 flex items-center gap-2.5">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} circle width={28} height={28} />
          ))}
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-3 w-full max-w-md px-4 mb-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col items-center relative">
              <Skeleton width={50} height={20} className="mb-1" />
              <Skeleton width={60} height={16} />
              {index < 2 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bio section */}
        <div className="text-center max-w-md mb-3">
          <Skeleton count={2} width="80%" style={{ margin: "0 auto" }} />
        </div>

        {/* Link section */}
        <div className="mb-3 flex items-center justify-center">
          <Skeleton width={150} height={16} />
        </div>

        {/* Action Buttons Section */}
        <div className="flex justify-center gap-3 mb-4">
          <Skeleton width={80} height={36} borderRadius={8} />
          <Skeleton width={80} height={36} borderRadius={8} />
          <Skeleton width={40} height={36} borderRadius={8} />
        </div>
      </div>

      {/* Custom Tabs Navigation */}
      <div>
        <div className="flex border-b border-gray-200">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex-1 py-2 flex justify-center">
              <Skeleton width={26} height={26} />
            </div>
          ))}
        </div>

        {/* Tab Content Skeleton */}
        <div className="mt-[0.05rem]">
          <div className="grid grid-cols-3 gap-[0.05rem]">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="aspect-[3/4]">
                <Skeleton height="100%" borderRadius={0} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
