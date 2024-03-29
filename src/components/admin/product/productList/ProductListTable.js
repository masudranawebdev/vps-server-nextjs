"use client";
import BigSpinner from "@/components/common/loader/BigSpinner";
import NoDataFound from "@/components/common/noDataFound/NoDataFound";
import Pagination from "@/components/common/pagination/Pagination";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoDuplicate, IoEye } from "react-icons/io5";
import ProductUpdate from "./productUpdate/ProductUpdate";
import ProductDuplicate from "./productDupplicate/ProductDuplicate";
import ProductDelete from "./ProductDelete";
import Link from "next/link";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";
import UpdatePrice from "./updateInstant/UpdatePrice";

const ProductListTable = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState();

  const [openDeleteProductModal, setOpenDeleteProductModal] = useState(false);
  const [openDeleteProductModalValue, setOpenDeleteProductModalValue] =
    useState();
  const [openUpdateProductModal, setOpenUpdateProductModal] = useState(false);
  const [openUpdateProductModalValue, setOpenUpdateProductModalValue] =
    useState();
  const [openDuplicateProductModal, setOpenDuplicateProductModal] =
    useState(false);
  const [openDuplicateProductModalValue, setOpenDuplicateProductModalValue] =
    useState();

  const [isUpdatePrice, setIsUpdatePrice] = useState(false);
  const [updatePriceValue, setUpdatePriceValue] = useState("");

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/product/dashboard_product?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/product/dashboard_product?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setAllProducts(data);
      return data;
    },
  }); // get all product

  const [serialNumber, setSerialNumber] = useState();
  useEffect(() => {
    const newSerialNumber = (page - 1) * rows;
    setSerialNumber(newSerialNumber);
  }, [page, rows]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
    }
  };

  if (isLoading) {
    return <BigSpinner />;
  }

  return (
    <div className="bg-white p-2 rounded-md mt-5">
      {/* Search and create */}
      <div className="flex items-center justify-end my-5 gap-2">
        <div className="flex items-center gap-2 rounded-xl border border-[#E7E7E7] bg-gray-50 px-[5px] py-2">
          <BiSearch className="text-[#717171]" size={20} />
          <input
            onKeyDown={(e) => handleSearch(e)}
            type="text"
            placeholder="Search..."
            className="bg-gray-50 bg-none w-full outline-none text-[14px] font-semibold placeholder-[#717171]"
          />
        </div>
      </div>
      {/* Table for showing data */}
      {allProducts?.data?.length > 0 ? (
        <div className="overflow-x-auto capitalize">
          {/* Show all user */}
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  #
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Image
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-center">
                  Price
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-center">
                  E-commerce
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-center">
                  Discount
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-center">
                  Quantity
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Status
                </th>
                <th className="px-4 py-2 text-center font-semibold text-gray-900 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {allProducts?.data?.map((product, i) => (
                <tr key={product?._id}>
                  <td className="whitespace-nowrap px-4 py-2">
                    {serialNumber + i + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <Image
                      src={product?.product_thumbnail}
                      alt=""
                      height={50}
                      width={50}
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {product?.product_name.length > 50
                      ? product?.product_name.slice(0, 50) + "....."
                      : product?.product_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase text-center">
                    <p
                      onClick={() => {
                        setIsUpdatePrice(true);
                        setUpdatePriceValue(product);
                      }}
                      className="cursor-pointer bg-secondary rounded-md text-white hover:bg-primaryColor py-2 flex items-center justify-center gap-4"
                    >
                      {product?.product_price} <FiEdit size={15} />
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase text-center">
                    {product?.product_ecommerce_price}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase text-center">
                    {product?.product_discount_price}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase text-center">
                    {product?.product_quantity}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {product?.product_status}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 flex justify-center mt-3 gap-4">
                    <Link href={`/${product?.product_slug}`}>
                      <IoEye
                        className="cursor-pointer text-sky-500 hover:text-sky-400"
                        size={20}
                      />
                    </Link>
                    <FiEdit
                      onClick={() => {
                        setOpenUpdateProductModal(!openUpdateProductModal);
                        setOpenUpdateProductModalValue(product);
                      }}
                      className="cursor-pointer text-successColor hover:text-successColor"
                      size={20}
                    />
                    <IoDuplicate
                      onClick={() => {
                        setOpenDuplicateProductModal(
                          !openDuplicateProductModal
                        );
                        setOpenDuplicateProductModalValue(product);
                      }}
                      className="cursor-pointer text-gray-700 hover:text-gray-600"
                      size={20}
                    />
                    <FaTrashAlt
                      onClick={() => {
                        setOpenDeleteProductModal(!openDeleteProductModal);
                        setOpenDeleteProductModalValue(product);
                      }}
                      className="cursor-pointer text-red-500 hover:text-red-400"
                      size={20}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoDataFound />
      )}

      <hr />

      {/* Pagination */}
      <Pagination
        rows={rows}
        page={page}
        setPage={setPage}
        setRows={setRows}
        totalData={products?.totalData}
      />

      {/* Handle open delete modal */}
      {openDeleteProductModal && (
        <ProductDelete
          refetch={refetch}
          setOpenDeleteProductModal={setOpenDeleteProductModal}
          openDeleteProductModalValue={openDeleteProductModalValue}
        />
      )}

      {/* Handle open duplicate modal */}
      {openDuplicateProductModal && (
        <ProductDuplicate
          refetch={refetch}
          setOpenDuplicateProductModal={setOpenDuplicateProductModal}
          openDuplicateProductModalValue={openDuplicateProductModalValue}
        />
      )}

      {/* Handle open Update modal */}
      {openUpdateProductModal && (
        <ProductUpdate
          refetch={refetch}
          setOpenUpdateProductModal={setOpenUpdateProductModal}
          openUpdateProductModalValue={openUpdateProductModalValue}
        />
      )}

      {/* Update price */}
      {isUpdatePrice && (
        <UpdatePrice
          refetch={refetch}
          setIsUpdatePrice={setIsUpdatePrice}
          updatePriceValue={updatePriceValue}
        />
      )}
    </div>
  );
};

export default ProductListTable;
