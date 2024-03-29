import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const ProductSkeleton = () => {
  return (
    <div className="border rounded-md shadow-md flex flex-col items-center justify-center">
      <p className="text-center mb-3">
        <SkeletonTheme baseColor="#d9dcde" highlightColor="#eff0f1">
          <Skeleton
            style={{
              borderRadius: "10px",
              textAlign: "center",
            }}
            height={200}
            width={200}
            duration={1.5}
          />
        </SkeletonTheme>
      </p>
      <p className="text-center">
        <SkeletonTheme baseColor="#d9dcde" highlightColor="#eff0f1">
          <Skeleton width={200} duration={1.5} count={3} />
        </SkeletonTheme>
      </p>
      <p className="text-left">
        <SkeletonTheme baseColor="#d9dcde" highlightColor="#eff0f1">
          <Skeleton width={100} duration={1.5} count={1} />
        </SkeletonTheme>
      </p>
    </div>
  );
};

export default ProductSkeleton;
