import SliderCategory from "./SliderCategory";
import Link from "next/link";
import Image from "next/image";

const CategorySection = async ({ promiseExploreProductsData }) => {
  const categoryData = await promiseExploreProductsData;
  return (
    <div className="py-5 md:py-10 container">
      {categoryData?.data?.map((item, i) => {
        return (
          item?.products?.length > 0 && (
            <div key={i} className="grid grid-cols-1 md:grid-cols-8 py-4">
              <div
                className={`col-span-2 bg-white rounded-md mx-2 md:mx-0 mb-2 md:mb-0 ${
                  i === 1 ? "md:order-1" : ""
                }`}
              >
                <h4 className="text-center mt-3 line-clamp-1">
                  Explore {item?.categoryDetails?.category_name}
                </h4>
                <div className="flex items-center justify-center group overflow-hidden">
                  <Link
                    href={`/category/${item?.categoryDetails?.category_slug}`}
                  >
                    <Image
                      width={200}
                      height={100}
                      src={item?.categoryDetails?.category_logo}
                      alt={item?.categoryDetails?.category_name}
                      className="h-[200px] object-fill group-hover:scale-105 transition-all duration-300"
                      loading="lazy"
                    />
                  </Link>
                </div>
              </div>

              <div className={`col-span-6 px-2 ${i === 1 ? "" : ""}`}>
                <SliderCategory products={item?.products} />
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default CategorySection;
