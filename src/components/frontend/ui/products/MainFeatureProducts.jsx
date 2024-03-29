import FeatureProducts from "./FeatureProducts";

const MainFeatureProducts = async ({ promiseFeatureProductData }) => {
  const productData = await promiseFeatureProductData;

  return (
    <div>
      <FeatureProducts productData={productData?.data} />
    </div>
  );
};

export default MainFeatureProducts;
