import BestProducts from "./BestProducts";

const MainBestProducts = async ({ promiseHotDealProductsData }) => {
  const productData = await promiseHotDealProductsData;
  return (
    <div>
      <BestProducts productData={productData?.data} />
    </div>
  );
};

export default MainBestProducts;
