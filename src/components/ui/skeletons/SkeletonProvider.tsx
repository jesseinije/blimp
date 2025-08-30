import { SkeletonTheme } from "react-loading-skeleton";

interface SkeletonProviderProps {
  children: React.ReactNode;
}

export const SkeletonProvider = ({ children }: SkeletonProviderProps) => {
  return (
    <SkeletonTheme
      baseColor="#ebebeb"
      highlightColor="#f5f5f5"
      borderRadius="0.5rem"
      duration={1.5}
    >
      {children}
    </SkeletonTheme>
  );
};
