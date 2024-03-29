"use client";
import Link from "next/link";
import Image from "next/image";
import Select from "react-select";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import useDebounced from "@/hooks/useDebounced";
import { IoSearchOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/feature/cart/cartSlice";
import { numberWithCommas } from "@/utils/thousandSeparate";
import { useGetCategoryQuery } from "@/redux/feature/category/categoryApi";
import { useGetSearchProductForCompareQuery } from "@/redux/feature/search/searchApi";
import {
  addToCompare,
  removeFromCompare,
} from "@/redux/feature/compare/compareSlice";
import { addToStore } from "@/redux/feature/recentview/recentViewSlice";

const ComparisonTable = ({ selectedProducts }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isHeadActive, setIsHeadActive] = useState(false);
  const searchText = useDebounced({ searchQuery: searchValue, delay: 10 });
  const { data } = useGetSearchProductForCompareQuery({
    categoryId,
    searchTerm,
  });
  const { data: categories } = useGetCategoryQuery();
  const cartProducts = useSelector((state) => state.cart.products);
  const compareProducts = useSelector((state) => state.compare.products);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchTerm(searchText);
  }, [searchText]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        // Adjust the value according to when you want the navbar to become active
        setIsHeadActive(true);
      } else {
        setIsHeadActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const getAllSpecifications = () => {
    const specifications = selectedProducts?.reduce((acc, product) => {
      product?.specifications?.forEach((spec) => {
        spec?.specification_details?.forEach((detail) => {
          const specificationKey = spec?.specification_id?.specification_name;
          const existingSpec = acc.find(
            (item) => item?.specificationKey === specificationKey
          );

          if (!existingSpec) {
            acc.push({
              specificationKey,
              details: [
                {
                  filter_name: detail?.specification_details_id?.filter_name,
                  value: detail?.specification_details_value,
                },
              ],
            });
          } else {
            const existingDetail = existingSpec?.details?.find(
              (d) =>
                d?.filter_name === detail?.specification_details_id?.filter_name
            );

            if (!existingDetail) {
              existingSpec?.details.push({
                filter_name: detail?.specification_details_id?.filter_name,
                value: detail?.specification_details_value,
              });
            }
          }
        });
      });
      return acc;
    }, []);

    return specifications;
  };

  const specifications = getAllSpecifications();

  return (
    <div className="overflow-x-auto rounded min-h-screen lg:mb-10">
      {isHeadActive && (
        <table className="lg:fixed z-40 top-[72px] border-collapse border table-fixed container px-0">
          <thead>
            <tr className="bg-white">
              <th className="whitespace-nowrap p-3 border border-gray-200">
                <p className="text-xl font-medium">Product Comparison</p>
                <p className="text-sm font-normal">
                  ({selectedProducts?.length}
                  {selectedProducts?.length > 1 ? " Products " : " Product "}
                  selected)
                </p>
              </th>
              {selectedProducts.map((product) => (
                <th
                  key={product?._id}
                  className="whitespace-nowrap p-3 border border-gray-200 relative"
                >
                  <div>
                    <div className="flex items-center justify-center">
                      <Image
                        src={product?.product_thumbnail}
                        alt={product?.product_name}
                        width={150}
                        height={150}
                        loading="lazy"
                      />
                    </div>
                    <Link
                      onClick={() => dispatch(addToStore(product))}
                      href={`/${product?.product_slug}`}
                      className="hover:underline hover:text-secondary text-sm mb-2 text-wrap whitespace-nowrap font-medium"
                    >
                      {product?.product_name}
                    </Link>
                    {/* ... (previous product details) */}
                    <p>
                      <span className="text-sm">Regular price:</span>{" "}
                      <span
                        className={`text-sm ${
                          product?.product_discount_price
                            ? "line-through text-gray-600"
                            : "text-secondary"
                        }`}
                      >
                        ৳{numberWithCommas(product?.product_price)}
                      </span>
                    </p>
                    {product?.product_discount_price && (
                      <p>
                        <span className="text-sm">Special price:</span>{" "}
                        <span className={`text-sm text-secondary`}>
                          ৳{numberWithCommas(product?.product_discount_price)}
                        </span>
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      dispatch(removeFromCompare(product));
                      toast.success("Successfully remove from compare!");
                    }}
                    className="absolute top-2 right-2"
                  >
                    <FaTrashAlt className="text-2xl p-1 bg-gray-300 rounded-sm text-danger" />
                  </button>
                </th>
              ))}
              {selectedProducts?.length < 4 && (
                <th className="whitespace-nowrap border px-3 h-[245px]">
                  <form className="space-y-2 relative" onSubmit={handleSubmit}>
                    <Select
                      id="division"
                      name="division"
                      required
                      aria-label="Select a Division"
                      isSearchable={true}
                      options={categories?.data}
                      getOptionLabel={(x) => x?.category_name}
                      getOptionValue={(x) => x?.id}
                      onChange={(selectedOption) => {
                        setCategoryId(selectedOption?._id);
                      }}
                    ></Select>
                    <div className="flex flex-1 justify-between border rounded">
                      <input
                        id="search"
                        type="text"
                        name="search"
                        placeholder="find product"
                        className="w-full px-3 py-2 focus:outline-none rounded-l text-black text-xs font-medium"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                      <button
                        className="px-2 text-black rounded-r bg-secondary hover:bg-opacity-80"
                        type="submit"
                      >
                        <IoSearchOutline className="text-whiteColor text-xl" />
                      </button>
                    </div>
                    {data?.data?.length > 0 && searchValue ? (
                      <div className="absolute rounded bg-white shadow-lg w-full overflow-hidden mb-5">
                        <div className="overflow-y-auto scrollbar-thin max-h-[30vh] pb-5">
                          {data?.data?.map((product) => (
                            <div
                              key={product?._id}
                              className="flex gap-3 items-center py-2 hover:bg-gray-50 pl-5"
                            >
                              <div>
                                <Image
                                  height={40}
                                  width={40}
                                  src={product?.product_thumbnail}
                                  alt={product?.product_slug}
                                  loading="lazy"
                                />
                              </div>
                              <article>
                                <button
                                  onClick={() => {
                                    const isAdded = compareProducts?.find(
                                      (comItem) => comItem?._id === product?._id
                                    );
                                    if (isAdded) {
                                      toast.error(
                                        "Already This product Added for Compare!"
                                      );
                                    } else if (compareProducts?.length === 4) {
                                      toast.error(
                                        "You can Added Maximum 4 Products! at a same time"
                                      );
                                    } else {
                                      dispatch(addToCompare(product));
                                      toast.success(
                                        "Successfully Added for compare Product!"
                                      );
                                      setSearchValue("");
                                    }
                                  }}
                                  className="text-wrap font-normal text-xs hover:underline hover:text-secondary block text-center"
                                  href={`/${product?.product_slug}`}
                                >
                                  {product?.product_name}
                                </button>
                                <p className="space-x-5 text-secondary text-xs">
                                  <span>
                                    {product?.product_discount_price
                                      ? numberWithCommas(
                                          product?.product_discount_price
                                        )
                                      : numberWithCommas(
                                          product?.product_price
                                        )}
                                    ৳
                                  </span>
                                  {product?.product_discount_price && (
                                    <span className="line-through">
                                      {numberWithCommas(product?.product_price)}
                                      ৳
                                    </span>
                                  )}
                                </p>
                              </article>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </form>
                  <p className="font-normal text-xs mt-5">
                    Find and select product to compare
                  </p>
                </th>
              )}
            </tr>
          </thead>
        </table>
      )}
      <table className="min-w-full lg:w-full border-collapse border table-fixed">
        <thead>
          <tr className="bg-white">
            <th className="whitespace-nowrap p-3 border border-gray-200">
              <p className="text-xl font-medium">Product Comparison</p>
              <p className="text-sm font-normal">
                ({selectedProducts?.length}
                {selectedProducts?.length > 1 ? " Products " : " Product "}
                selected)
              </p>
            </th>
            {selectedProducts.map((product) => (
              <th
                key={product?._id}
                className="whitespace-nowrap p-3 border border-gray-200 relative"
              >
                <div>
                  <div className="flex items-center justify-center">
                    <Image
                      src={product?.product_thumbnail}
                      alt={product?.product_name}
                      width={150}
                      height={150}
                      loading="lazy"
                    />
                  </div>
                  <Link
                    onClick={() => dispatch(addToStore(product))}
                    href={`/${product?.product_slug}`}
                    className="hover:underline hover:text-secondary text-sm mb-2 text-wrap whitespace-nowrap font-medium"
                  >
                    {product?.product_name}
                  </Link>
                  {/* ... (previous product details) */}
                  <p>
                    <span className="text-sm">Regular price:</span>{" "}
                    <span
                      className={`text-sm ${
                        product?.product_discount_price
                          ? "line-through text-gray-600"
                          : "text-secondary"
                      }`}
                    >
                      ৳{numberWithCommas(product?.product_price)}
                    </span>
                  </p>
                  {product?.product_discount_price && (
                    <p>
                      <span className="text-sm">Special price:</span>{" "}
                      <span className={`text-sm text-secondary`}>
                        ৳{numberWithCommas(product?.product_discount_price)}
                      </span>
                    </p>
                  )}
                </div>
                <button
                  onClick={() => {
                    dispatch(removeFromCompare(product));
                    toast.success("Successfully remove from compare!");
                  }}
                  className="absolute top-2 right-2"
                >
                  <FaTrashAlt className="text-2xl p-1 bg-gray-300 rounded-sm text-danger" />
                </button>
              </th>
            ))}
            {selectedProducts?.length < 4 && (
              <th className="whitespace-nowrap border px-3 h-[245px]">
                <form className="space-y-2 relative" onSubmit={handleSubmit}>
                  <Select
                    id="division"
                    name="division"
                    required
                    aria-label="Select a Division"
                    isSearchable={true}
                    options={categories?.data}
                    getOptionLabel={(x) => x?.category_name}
                    getOptionValue={(x) => x?.id}
                    onChange={(selectedOption) => {
                      setCategoryId(selectedOption?._id);
                    }}
                  ></Select>
                  <div className="flex flex-1 justify-between border rounded">
                    <input
                      id="search"
                      type="text"
                      name="search"
                      placeholder="find product"
                      className="w-full px-3 py-2 focus:outline-none rounded-l text-black text-xs font-medium"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button
                      className="px-2 text-black rounded-r bg-secondary hover:bg-opacity-80"
                      type="submit"
                    >
                      <IoSearchOutline className="text-whiteColor text-xl" />
                    </button>
                  </div>
                  {data?.data?.length > 0 && searchValue && (
                    <div className="absolute rounded bg-white shadow-lg w-full overflow-hidden mb-5">
                      <div className="overflow-y-auto scrollbar-thin max-h-[30vh] pb-5">
                        {data?.data?.map((product) => (
                          <div
                            key={product?._id}
                            className="flex gap-3 items-center py-2 hover:bg-gray-50 pl-5"
                          >
                            <div>
                              <Image
                                height={40}
                                width={40}
                                src={product?.product_thumbnail}
                                alt={product?.product_slug}
                                loading="lazy"
                              />
                            </div>
                            <article>
                              <button
                                onClick={() => {
                                  const isAdded = compareProducts?.find(
                                    (comItem) => comItem?._id === product?._id
                                  );
                                  if (isAdded) {
                                    toast.error(
                                      "Already This product Added for Compare!"
                                    );
                                  } else if (compareProducts?.length === 4) {
                                    toast.error(
                                      "You can Added Maximum 4 Products! at a same time"
                                    );
                                  } else {
                                    dispatch(addToCompare(product));
                                    toast.success(
                                      "Successfully Added for compare Product!"
                                    );
                                    setSearchValue("");
                                  }
                                }}
                                className="text-wrap font-normal text-xs hover:underline hover:text-secondary block text-center"
                                href={`/${product?.product_slug}`}
                              >
                                {product?.product_name}
                              </button>
                              <p className="space-x-5 text-secondary text-xs">
                                <span>
                                  {product?.product_discount_price
                                    ? numberWithCommas(
                                        product?.product_discount_price
                                      )
                                    : numberWithCommas(product?.product_price)}
                                  ৳
                                </span>
                                {product?.product_discount_price && (
                                  <span className="line-through">
                                    {numberWithCommas(product?.product_price)}৳
                                  </span>
                                )}
                              </p>
                            </article>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </form>
                <p className="font-normal text-xs mt-5">
                  Find and select product to compare
                </p>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {specifications.map((spec) => (
            <React.Fragment key={spec?.specificationKey}>
              <tr className="bg-gray-100">
                <td
                  colSpan={selectedProducts.length + 1}
                  className="whitespace-nowrap p-3 border bg-blue-100 border-gray-300 font-semibold"
                >
                  {spec?.specificationKey}
                </td>
              </tr>

              {spec.details.map((detail) => (
                <React.Fragment
                  key={`${spec?.specificationKey}-${detail?.filter_name}`}
                >
                  <tr>
                    <td className="whitespace-nowrap p-3 border">
                      {detail?.filter_name}
                    </td>
                    {selectedProducts?.map((product) => (
                      <td
                        className="whitespace-nowrap p-3 border text-xs font-medium text-center"
                        key={product?._id}
                      >
                        <div
                          className="text-wrap"
                          dangerouslySetInnerHTML={{
                            __html:
                              product.specifications
                                ?.flatMap((s) => s?.specification_details)
                                .find(
                                  (d) =>
                                    `${d?.specification_details_id?.filter_name}` ===
                                    detail?.filter_name
                                )?.specification_details_value || "-",
                          }}
                        ></div>
                      </td>
                    ))}
                  </tr>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}

          <tr>
            <td></td>
            {selectedProducts.map((product) => (
              <td
                key={product._id}
                className="whitespace-nowrap p-3 border border-gray-200 text-center"
              >
                <Link
                  href={`/cart`}
                  onClick={() => {
                    const isExistCart = cartProducts.find(
                      (cartItem) => cartItem?.productId === product?._id
                    );
                    if (!isExistCart) {
                      dispatch(
                        addToCart({
                          productId: product?._id,
                          product_thumbnail: product?.product_thumbnail,
                          product_name: product?.product_name,
                          quantity: 1,
                          price: product?.product_ecommerce_price
                            ? product?.product_ecommerce_price
                            : product?.product_discount_price
                            ? product?.product_discount_price
                            : product?.product_price,
                          product_price: product?.product_ecommerce_price
                            ? product?.product_ecommerce_price
                            : product?.product_discount_price
                            ? product?.product_discount_price
                            : product?.product_price,
                        })
                      );
                      toast.success("Successfully added to cart", {
                        autoClose: 1500,
                      });
                    }
                  }}
                  className="bg-secondary px-4 py-1 text-textColor rounded"
                >
                  Buy Now
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
//   {
//     id: 1,
//     name: "laptop",
//     specifications: [
//       {
//         specification_id: {
//           specification_name: "basic information",
//         },
//         specification_details: [
//           {
//             specification_details_id: {
//               filter_name: "Ram",
//             },
//             specification_detail_value: "2GB",
//           },
//           {
//             specification_details_id: {
//               filter_name: "Rom",
//             },
//             specification_detail_value: "20GB",
//           },
//           {
//             specification_details_id: {
//               filter_name: "Processor",
//             },
//             specification_detail_value: "Intel Core i3",
//           },
//         ],
//       },
//       {
//         specification_id: {
//           specification_name: "Physical",
//         },
//         specification_details: [
//           {
//             specification_details_id: {
//               filter_name: "Color",
//             },
//             specification_detail_value: "Black",
//           },
//           {
//             specification_details_id: {
//               filter_name: "Dimensions",
//             },
//             specification_detail_value: "336 x 258 x 125mm",
//           },
//           {
//             specification_details_id: {
//               filter_name: "Weight",
//             },
//             specification_detail_value: "2.5kg",
//           },
//         ],
//       },
//     ],
//   },
// ];
