import { getOfferSingleData } from "@/lib/getOfferSingleData";
import OfferDetailsSection from "@/components/frontend/ui/offer/OfferDetailsSection";
export async function generateMetadata({ params }) {
  // read route params
  const { slug } = params;

  // fetch data
  const product = await getOfferSingleData(slug);

  return {
    title: product?.data?.offer_title,
  };
}

const OfferDetailsPage = async ({ params }) => {
  const { slug } = params;
  const offerData = await getOfferSingleData(slug);

  return (
    <div className="container">
      <OfferDetailsSection offerSingleData={offerData?.data} />
    </div>
  );
};

export default OfferDetailsPage;
