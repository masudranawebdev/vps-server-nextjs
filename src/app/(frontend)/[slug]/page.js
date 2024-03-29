import ProductDetails from "@/components/frontend/ui/products/ProductDetails";
import { getProductDatas } from "@/lib/getProductDatas";

export async function generateMetadata({ params }) {
  // read route params
  const { slug } = params;

  // fetch data
  const product = await getProductDatas(slug);

  return {
    title: product?.data?.meta_title,
    description: product?.data?.meta_description,
    author: {
      name: "Masud Rana"
    }
  };
}

const ProductDetailsPage = async ({ params }) => {
  const { slug } = params;
  const product = await getProductDatas(slug);
  return (
    <div className="container">
      <ProductDetails product={product?.data} />
    </div>
  );
};

export default ProductDetailsPage;
