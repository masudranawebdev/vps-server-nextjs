"use client";
import Link from "next/link";
import { useState } from "react";
import { BASE_URL } from "@/utils/baseURL";
import { IoMdClose } from "react-icons/io";
import FilterSection from "./FilterSection";
import { BsFilterLeft } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import CategoryViewCard from "./CategoryViewCard";
import Breadcrumb from "@/components/common/BreadCrum";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { convertToCrumbs } from "@/utils/convertToCrumbs";
import QuickViewDetails from "../products/QuickViewDetails";
import NotFoundData from "@/components/common/NotFoundData";
import QuickViewModal from "@/components/common/modal/QuickViewModal";
import FrontPagination from "@/components/common/pagination/FrontPagination";
import CategoryViewSpinner from "@/components/common/loader/CategoryViewSpinner";
import { IoCloseOutline } from "react-icons/io5";

const CategoryViewSection = ({ slug, filterData, filterHeadData }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    filters: [],
    min_price: 1,
    max_price: 200000,
    availability: [],
    brands: [],
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");

  const [isModalOpen, setModalOpen] = useState("");
  const [viewProduct, setViewProduct] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const queryString = encodeURIComponent(JSON.stringify(selectedFilters));

  const { data, isLoading } = useQuery({
    queryKey: [selectedFilters, slug],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/product/filtered_product/${slug[0]}?sub_categoryType=${slug[1]}&child_categoryType=${slug[2]}&filterDatas=${queryString}`
      );
      return res.json();
    },
  });

  const crumbs = convertToCrumbs(slug);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const sortedData = () => {
    if (selectedSort === "asc") {
      return [...data.data].sort((a, b) => a.product_price - b.product_price);
    } else if (selectedSort === "desc") {
      return [...data.data].sort((a, b) => b.product_price - a.product_price);
    } else {
      // Default sorting or when nothing is selected
      return data.data;
    }
  };
  const totalItems = data?.data?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + Number(itemsPerPage);

  return (
    <div className="">
      <div className="bg-white py-2.5 px-4 my-2 rounded-md shadow">
        <Breadcrumb crumbs={crumbs} />
      </div>

      {filterHeadData?.length > 0 && (
        <div className="bg-white py-2.5 px-4 my-2 rounded-md shadow flex flex-wrap gap-1">
          {filterHeadData?.map((item) => (
            <Link
              key={item._id}
              href={`/category/${slug[0]}/${
                item?.sub_category_id?.sub_category_slug
                  ? item?.sub_category_id?.sub_category_slug
                  : item?.sub_category_slug
              }/${item?.child_category_slug ? item?.child_category_slug : ""}`}
              className="rounded-full px-3 py-[1px] bg-gray-50 border border-gray-400 shadow-sm hover:bg-gray-100"
            >
              <span className="text-secondary text-base">
                {item?.sub_category_name
                  ? item?.sub_category_name
                  : item?.child_category_name}
              </span>
            </Link>
          ))}
        </div>
      )}

      <div className="grid grid-cols-5 gap-2.5">
        <div className="hidden lg:block">
          <FilterSection
            filterDatas={filterData}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>
        <div className="col-span-5 lg:col-span-4">
          <div className="bg-white py-1.5 px-4 rounded-md shadow flex justify-between items-center">
            <button onClick={toggleDrawer} className="block lg:hidden">
              <BsFilterLeft className="text-3xl rounded-full p-1 bg-gray-100 hover:bg-gray-200" />
            </button>
            <h6 className="mb-0">{slug[slug.length - 1]}</h6>
            <div className="flex gap-1 lg:gap-4">
              <div className="hidden md:flex items-center flex-col md:flex-row">
                <label
                  htmlFor="sort"
                  className="text-gray-600 text-xs md:text-sm"
                >
                  Show:
                </label>
                <select
                  name="price"
                  id="sort"
                  className="py-0 lg:py-1 px-1 text-xs md:text-sm border rounded"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(e.target.value)}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                </select>
              </div>
              <div className="flex items-center flex-col md:flex-row">
                <label
                  htmlFor="sort"
                  className="text-gray-600 text-xs md:text-sm"
                >
                  Sort By:
                </label>
                <select
                  name="price"
                  id="sort"
                  className="py-0 lg:py-1 text-xs md:text-sm w-32 border rounded"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                >
                  <option value="">Default</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
          {isLoading ? (
            <CategoryViewSpinner />
          ) : data?.data?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 py-2.5">
              {sortedData()
                .slice(startIndex, endIndex)
                ?.map((product) => (
                  <CategoryViewCard
                    key={product?._id}
                    product={product}
                    openModal={openModal}
                    setViewProduct={setViewProduct}
                  />
                ))}
            </div>
          ) : (
            <NotFoundData />
          )}
          <div className="flex justify-between items-center py-5">
            <FrontPagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
            <div className="text-xs">
              <span className="mr-1 font-semibold text-primary">Showing</span>
              <span className="font-medium text-gray-700 text-xs mr-1">
                {startIndex === 0 ? 1 : startIndex} - {endIndex}
              </span>
              of {data?.data?.length > 0 ? data?.data?.length : 0}{" "}
              {data?.data?.length > 1 ? "records" : "record"}
            </div>
          </div>
        </div>
      </div>
      <ReactTooltip variant="info" id="wish-list" />
      <ReactTooltip variant="info" id="compare" />
      <ReactTooltip variant="info" id="quick-view" />
      {viewProduct && (
        <QuickViewModal isOpen={isModalOpen} onClose={closeModal}>
          <div className="flex justify-end">
            <button
              className="text-bgray-900 font-bold py-1 px-2 mb-2 rounded"
              onClick={closeModal}
            >
              <IoCloseOutline className="text-3xl p-1 bg-gray-100 rounded-full hover:bg-gray-300" />
            </button>
          </div>
          <QuickViewDetails product={viewProduct} />
        </QuickViewModal>
      )}

      {/* ------ filter drawer ------ start */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-40 bg-white border-r-2 border-gray-300 w-9/12 sm:w-6/12 md:w-4/12 min-h-screen overflow-y-auto transition-transform duration-500 transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute right-2 top-2 items-end"
          onClick={toggleDrawer}
        >
          <IoMdClose className="p-1 text-2xl bg-gray-100 shadow-md rounded-full" />
        </button>
        <div className="block lg:hidden mt-10">
          <FilterSection
            filterDatas={filterData}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>
      </div>
      {/* ------ filter drawer ------ end */}
    </div>
  );
};

export default CategoryViewSection;