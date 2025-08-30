import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ProfileSkeleton = () => {
  return (
    <div className="pb-16 bg-white">
      {/* Header Skeleton */}
      <div className="h-14 border-b flex items-center px-4">
        <Skeleton width={120} />
      </div>

      {/* Profile Header Skeleton */}
      <div className="flex flex-col items-center pt-6 px-3">
        {/* Avatar Skeleton */}
        <div className="w-24 h-24 mb-4">
          <Skeleton circle height="100%" />
        </div>

        {/* Name and Username Skeleton */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <Skeleton width={150} height={24} />
          <Skeleton width={100} height={16} />
        </div>

        {/* Stats Skeleton */}
        <div className="flex justify-center w-full mb-6 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <Skeleton width={50} height={24} />
              <Skeleton width={60} height={16} />
            </div>
          ))}
        </div>

        {/* Bio Skeleton */}
        <div className="text-center mb-6 w-full max-w-md">
          <Skeleton count={2} width="80%" style={{ margin: "0 auto" }} />
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex gap-2 w-full max-w-md mb-8">
          <Skeleton height={40} width="40%" />
          <Skeleton height={40} width="40%" />
          <Skeleton height={40} width="15%" />
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="flex border-b border-gray-200">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex-1 py-3.5">
            <Skeleton height={20} />
          </div>
        ))}
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-3 gap-0.5 mt-0.5">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="aspect-[3/4]">
            <Skeleton height="100%" />
          </div>
        ))}
      </div>
    </div>
  );
};
