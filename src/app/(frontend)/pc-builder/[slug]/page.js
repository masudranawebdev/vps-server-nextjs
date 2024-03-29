import { getFilterData } from "@/lib/getFilterData";
import PcBuilderSelectSection from "@/components/frontend/ui/pcbuilder/PcBuilderSelectSection";
export async function generateMetadata({ searchParams }) {
  // read route params
  // const { slug } = params;
  const { category } = searchParams;
  // fetch data
  // const product = await getOfferSingleData(slug);

  return {
    title: category,
  };
}
const PcBuilderSelectPage = async ({ params, searchParams }) => {
  const { slug } = params;
  const { category } = searchParams;
  const filterData = await getFilterData(category);
  return (
    <div className="container">
      <PcBuilderSelectSection
        filterData={filterData?.data}
        slug={slug}
        category={category}
      />
    </div>
  );
};

export default PcBuilderSelectPage;
