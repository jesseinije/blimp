import Skeleton from "react-loading-skeleton";

export const ExploreGridSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-0.5">
      {[...Array(15)].map((_, index) => (
        <div key={index} className="aspect-[3/4]">
          <Skeleton
            height="100%"
            style={{ aspectRatio: "3/4" }}
            borderRadius={0}
          />
        </div>
      ))}
    </div>
  );
};
