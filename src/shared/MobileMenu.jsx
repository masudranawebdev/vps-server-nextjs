"use client";
import Link from "next/link";

const MobileMenu = ({ menuData, setIsMobileMenuOpen, isMobileMenuOpen }) => {
  const handleToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="px-4">
      <ul className="space-y-1 list-none">
        {menuData?.data?.map((menu) => (
          <li key={menu?.category?._id}>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <Link
                  onClick={handleToggle}
                  href={`/category/${menu?.category?.category_slug}`}
                  className="text-base font-medium"
                >
                  {menu?.category?.category_name}
                </Link>

                {menu?.subCategoryAndChildCategoryData?.length > 0 && (
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </summary>

              <ul className="mt-2 space-y-1 px-2 list-none">
                {menu?.subCategoryAndChildCategoryData?.map((category) => (
                  <li key={category?.sub_category?._id}>
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                        <Link
                          onClick={handleToggle}
                          href={`/category/${menu?.category?.category_slug}/${category?.sub_category?.sub_category_slug}`}
                          className="text-base font-medium"
                        >
                          {category?.sub_category?.sub_category_name}
                        </Link>

                        {category?.child_categories?.length > 0 && (
                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        )}
                      </summary>

                      <ul className="mt-2 space-y-1 px-2 pl-5 list-none">
                        {category?.child_categories?.map((subCategory) => (
                          <li key={subCategory?._id} className="w-[200px]">
                            <Link
                              onClick={handleToggle}
                              href={`/category/${menu?.category?.category_slug}/${category?.sub_category?.sub_category_slug}/${subCategory?.child_category_slug}`}
                              className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 py-1 px-2 w-full text-left rounded-sm text-base font-medium opacity-80 hover:opacity-100"
                            >
                              {subCategory?.child_category_name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;
