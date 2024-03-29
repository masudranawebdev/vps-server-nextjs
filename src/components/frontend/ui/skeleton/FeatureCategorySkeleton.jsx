import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const FeatureCategorySkeleton = () => {
  return (
    <div className="border rounded-md shadow-md flex flex-col items-center justify-center">
      <p className="text-center mb-3">
        <SkeletonTheme baseColor="#d9dcde" highlightColor="#eff0f1">
          <Skeleton
            style={{
              borderRadius: "10px",
              textAlign: "center",
            }}
            height={70}
            width={70}
            duration={1.5}
          />
        </SkeletonTheme>
      </p>
      <p className="text-center">
        <SkeletonTheme baseColor="#d9dcde" highlightColor="#eff0f1">
          <Skeleton width={200} duration={1.5} count={2} />
        </SkeletonTheme>
      </p>
    </div>
  );
};

export default FeatureCategorySkeleton;
