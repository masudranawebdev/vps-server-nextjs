"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import Pagination from "../../common/pagination/Pagination";
import NoDataFound from "../../common/noDataFound/NoDataFound";
import BigSpinner from "../../common/loader/BigSpinner";
import { BASE_URL } from "../../../utils/baseURL";
import { toast } from "react-toastify";
import { useRemoveProductHotDealMutation } from "@/redux/feature/product/productApi";
import AddHotDealProduct from "./AddHotDealProduct";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const HotDealTable = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState();
  const [addHotDealProductModal, setAddHotDealProductModal] = useState(false);

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/product/handle_hotDeal_product?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/product/handle_hotDeal_product?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
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

  const [removeProductHotDeal] = useRemoveProductHotDealMutation(); //remove product from hot deal

  const handleRemoveHotdealProdduct = (_id) => {
    const sendData = {
      _id,
      product_hot_deal: false,
    };
    removeProductHotDeal(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Product Remove From Hot Deal successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message, {
          autoClose: 1000,
        });
      }
    });
  };

  if (isLoading) {
    return <BigSpinner />;
  }

  return (
    <div className="bg-white p-2 rounded-md mt-5">
      {/* Search and create */}
      <div className="flex items-center justify-between my-5 gap-2">
        <div className="flex items-center gap-2 rounded-xl border border-[#E7E7E7] bg-gray-50 px-[5px] py-2">
          <BiSearch className="text-[#717171]" size={20} />
          <input
            onKeyDown={(e) => handleSearch(e)}
            type="text"
            placeholder="Search..."
            className="bg-gray-50 bg-none w-full outline-none text-[14px] font-semibold placeholder-[#717171]"
          />
        </div>
        <div>
          <button
            onClick={() => setAddHotDealProductModal(true)}
            className="btn bg-secondary hover:bg-secondary px-5 py-2 text-white border border-gray-300 rounded-lg flex items-center gap-2"
          >
            Add <CiSquarePlus className="text-white" size={25} />{" "}
          </button>
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
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Price
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Discount Price
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Quantity
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Product Id
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Product SKU
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Status
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Brand
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
                    {product?.product_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase">
                    {product?.product_price}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase">
                    {product?.product_discount_price}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase">
                    {product?.product_quantity}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {product?.product_id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {product?.product_sku}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {product?.product_status}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {product?.product_brand_id?.brand_name}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 flex justify-center mt-3 gap-4">
                    <FaTrashAlt
                      onClick={() => {
                        handleRemoveHotdealProdduct(product?._id);
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

      {/* open hot deal product add modal */}
      {addHotDealProductModal && (
        <AddHotDealProduct
          setAddHotDealProductModal={setAddHotDealProductModal}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default HotDealTable;
