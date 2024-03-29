"use client";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import PcBuilderProductCard from "./PcBuilderProductCard";
import { useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import QuickViewModal from "@/components/common/modal/QuickViewModal";
import QuickViewDetails from "../products/QuickViewDetails";
import { IoMdClose } from "react-icons/io";
import FilterSection from "../categoryview/FilterSection";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/baseURL";
import CategoryViewSpinner from "@/components/common/loader/CategoryViewSpinner";
import NotFoundData from "@/components/common/NotFoundData";
import { useSelector } from "react-redux";
import { numberWithCommas } from "@/utils/thousandSeparate";

const PcBuilderSelectSection = ({ filterData, slug, category }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    filters: [],
    min_price: 1,
    max_price: 200000,
    availability: [],
    brands: [],
  });
  // const [value, setValue] = useState("");
  const [isModalOpen, setModalOpen] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const totalPrice = useSelector((state) => state.pcbuild.totalPrice);

  const queryString = encodeURIComponent(JSON.stringify(selectedFilters));
  const { data, isLoading } = useQuery({
    queryKey: [selectedFilters, slug, category],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/pc_builder/filtered_pc_builder_product/${slug}?categoryType=${category}&filterDatas=${queryString}`
      );
      return res.json();
    },
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setValue("");
  // };

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

  return (
    <div className="mb-3 lg:mb-10">
      <div className="bg-white rounded my-3 shadow flex items-center justify-between px-4">
        <Link className="text-xs lg:text-xl" href={`/pc-builder`}>
          {" "}
          &lt; Back
        </Link>
        <h5 className="text-center text-sm lg:text-xl font-light lg:font-medium py-2 mb-0">
          Select your components
        </h5>
        <p className="mb-0 border border-dotted border-black py-[2px] px-1 text-xs lg:text-xl font-medium">
          Total: {numberWithCommas(totalPrice)}
        </p>
      </div>

      <div className="bg-white rounded my-3 shadow flex items-center justify-between px-4 py-1">
        <button
          onClick={toggleDrawer}
          className="text-center font-normal py-1 mb-0 border px-4 text-gray-600"
        >
          Filter by: <FaPlus className="inline ml-2 font-normal" />
        </button>
        {/* <form onSubmit={handleSubmit}>
          <input
            id="search"
            type="text"
            name="search"
            placeholder="Search..."
            className="w-64 px-3 py-1 focus:outline-none text-black border rounded"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form> */}
        <div className="flex items-center flex-col md:flex-row">
          <label htmlFor="sort" className="text-gray-600 text-xs md:text-sm">
            Sort By:
          </label>
          <select
            name="price"
            id="sort"
            className="py-0 lg:py-1 text-xs md:sm w-32 border rounded"
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
          >
            <option value="">Default</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <CategoryViewSpinner />
      ) : data?.data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2.5 py-2.5">
          {sortedData()?.map((product) => (
            <PcBuilderProductCard
              pcbuildId={slug}
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

      <ReactTooltip variant="info" id="wish-list" />
      <ReactTooltip variant="info" id="compare" />
      <ReactTooltip variant="info" id="quick-view" />
      {viewProduct && (
        <QuickViewModal isOpen={isModalOpen} onClose={closeModal}>
          <QuickViewDetails product={viewProduct} />
        </QuickViewModal>
      )}
      {/* ------ filter drawer ------ start */}
      <div
        className={`fixed inset-y-0 left-0 z-40 bg-gray-100 border-r-2 border-gray-300 w-9/12 sm:w-6/12 md:w-2/12 transition-transform duration-500 transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute right-2 top-2 items-end"
          onClick={toggleDrawer}
        >
          <IoMdClose className="p-1 text-2xl bg-gray-100 shadow-md rounded-full" />
        </button>
        <div className="my-10 pb-10 max-h-screen overflow-y-auto scrollbar-thin">
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

export default PcBuilderSelectSection;
