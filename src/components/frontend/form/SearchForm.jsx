"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import useDebounced from "@/hooks/useDebounced";
import { IoSearchOutline } from "react-icons/io5";
import { numberWithCommas } from "@/utils/thousandSeparate";
import { useGetSearchValueQuery } from "@/redux/feature/search/searchApi";

const SearchForm = () => {
  const [tab, setTab] = useState("products");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const { data } = useGetSearchValueQuery(searchTerm);
  const searchText = useDebounced({ searchQuery: searchValue, delay: 500 });
  useEffect(() => {
    setSearchTerm(searchText);
  }, [searchText]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-1 justify-between lg:max-w-5xl"
      >
        <input
          id="search"
          type="text"
          name="search"
          placeholder="Search your need products"
          className="w-full px-3 py-2 focus:outline-none rounded-l text-black"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className="px-5 text-black rounded-r bg-secondary hover:bg-opacity-80"
          type="submit"
        >
          <IoSearchOutline className="text-whiteColor text-xl" />
        </button>
        {searchValue &&
          (data?.data?.products?.length > 0 ||
            data?.data?.categories?.length > 0) && (
            <div className="absolute top-[41px] lg:top-[53px] rounded bg-white shadow-lg w-full sm:w-[77vw] lg:w-[30vw] overflow-hidden mb-5">
              <nav className="px-5 py-2 border-b">
                <ul className="list-none flex gap-3">
                  <li
                    className={`rounded ${
                      tab === "products"
                        ? "bg-secondary text-textColor"
                        : "bg-gray-500 text-textColor"
                    }`}
                  >
                    <button
                      onClick={() => setTab("products")}
                      className="px-4 py-2"
                    >
                      Products
                    </button>
                  </li>
                  <li
                    className={`rounded ${
                      tab === "categories"
                        ? "bg-secondary text-textColor"
                        : "bg-gray-500 text-textColor"
                    }`}
                  >
                    <button
                      onClick={() => setTab("categories")}
                      className="px-4 py-2"
                    >
                      Categories
                    </button>
                  </li>
                </ul>
              </nav>
              <div>
                {tab === "products" && (
                  <div className="overflow-y-auto scrollbar-thin max-h-[40vh] pb-5">
                    {data?.data?.products?.map((product) => (
                      <div
                        key={product?._id}
                        className="flex gap-3 items-center py-2 hover:bg-gray-50 pl-5"
                      >
                        <div>
                          <Link
                            onClick={() => setSearchValue("")}
                            href={`/${product?.product_slug}`}
                          >
                            <Image
                              height={50}
                              width={50}
                              src={product?.product_thumbnail}
                              alt={product?.product_slug}
                              loading="lazy"
                            />
                          </Link>
                        </div>
                        <article>
                          <Link
                            onClick={() => setSearchValue("")}
                            className="text-wrap text-sm hover:underline hover:text-secondary block"
                            href={`/${product?.product_slug}`}
                          >
                            {product?.product_name}
                          </Link>
                          <p className="space-x-5 text-secondary">
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
                )}
                {tab === "categories" && (
                  <div className="overflow-y-auto scrollbar-thin max-h-[40vh] pb-5">
                    {data?.data?.categories?.map((category) => (
                      <div
                        key={category?.category_id?._id}
                        className="flex gap-3 items-center py-2 hover:bg-gray-50 pl-5"
                      >
                        <div>
                          <Link
                            onClick={() => setSearchValue("")}
                            href={`/category/${category?.category_id?.category_slug}/${category?.sub_category_slug}`}
                          >
                            <Image
                              height={50}
                              width={50}
                              src={category?.sub_category_logo}
                              alt={category?.sub_category_name}
                              loading="lazy"
                            />
                          </Link>
                        </div>
                        <article>
                          <Link
                            onClick={() => setSearchValue("")}
                            className="text-wrap text-sm hover:underline hover:text-secondary block"
                            href={`/category/${category?.category_id?.category_slug}/${category?.sub_category_slug}`}
                          >
                            {category?.sub_category_name}
                          </Link>
                        </article>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
      </form>
    </>
  );
};

export default SearchForm;
