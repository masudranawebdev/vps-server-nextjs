import { getFilterData } from "@/lib/getFilterData";
import { getFilterHeadData } from "@/lib/getFilterHeadData";
import CategoryViewSection from "@/components/frontend/ui/categoryview/CategoryViewSection";

export async function generateMetadata({ params }) {
  const { slug } = params;

  return {
    title: slug[slug.length - 1],
  };
}

const CategoryPage = async ({ params }) => {
  const { slug } = params;
  const promiseFilterData = getFilterData(slug[0]);
  const promiseFilterHeadData = getFilterHeadData({
    category: slug[0],
    subCategory: slug[1],
    childCategory: slug[2],
  });
  const [filterData, filterHeadData] = await Promise.all([
    promiseFilterData,
    promiseFilterHeadData,
  ]);
  return (
    <div className="container mx-auto px-2 pb-5">
      <CategoryViewSection
        slug={slug}
        filterData={filterData?.data}
        filterHeadData={filterHeadData?.data}
      />
    </div>
  );
};

export default CategoryPage;
