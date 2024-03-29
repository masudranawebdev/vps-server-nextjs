import Link from "next/link";
import Image from "next/image";

const TopCategory = async ({ promiseFeatureCategoryData }) => {
  const categoryData = await promiseFeatureCategoryData;
  return (
    <div className="container py-5 lg:py-10">
      <h4 className="text-2xl font-medium leading-10 tracking-normal">
        Feature Categories
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-3 gap-y-3 lg:gap-y-5">
        {categoryData?.data?.slice(0, 12)?.map((category) => (
          <div
            className="border hover:border-secondary p-5 flex flex-col items-center justify-center rounded-lg shadow-md hover:shadow-secondary transition-shadow ease-out duration-500 group bg-white"
            key={category?._id}
          >
            <div className="w-[50px] lg:w-[100px]">
              <Link href={`/category/${category?.category_slug}`}>
                <Image
                  width={100}
                  height={100}
                  src={category?.category_logo}
                  alt={category?.category_name}
                  className="group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </Link>
            </div>
            <p className="text-xl font-normal lg:font-medium text-center">
              <Link href={`/category/${category?.category_slug}`}>
                {category?.category_name}
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategory;
