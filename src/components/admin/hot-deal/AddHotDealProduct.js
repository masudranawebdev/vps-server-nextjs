"use client";

import NoDataFound from "@/components/common/noDataFound/NoDataFound";
import Pagination from "@/components/common/pagination/Pagination";
import { authKey } from "@/contants/storageKey";
import { useRemoveProductHotDealMutation } from "@/redux/feature/product/productApi";
import { BASE_URL } from "@/utils/baseURL";
import { getFromLocalStorage } from "@/utils/local-storage";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdAddBox } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";

const AddHotDealProduct = ({ setAddHotDealProductModal, refetch }) => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState();

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const { data: products = [], isLoading } = useQuery({
    queryKey: [
      `/api/v1/product/get_add_hotDeal_product?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/product/get_add_hotDeal_product?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
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

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
    }
  };

  const [addProductHotDeal] = useRemoveProductHotDealMutation(); //add product in hot deal

  const handleAddHotdealProdduct = (_id) => {
    const sendData = {
      _id,
      product_hot_deal: true,
    };
    addProductHotDeal(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Product Add Hot Deal successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setAddHotDealProductModal(false);
      } else {
        toast.error(result?.error?.data?.message, {
          autoClose: 1000,
        });
      }
    });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-full lg:w-10/12 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3
            className="text-[26px] font-bold text-[#0A0A0A] capitalize"
            id="modal-title"
          >
            {" "}
            Add Hot Deal{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => setAddHotDealProductModal(false)}
              size={25}
            ></RxCross1>
          </button>
        </div>

        {/* Search */}
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
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div
              className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        ) : allProducts?.data?.length > 0 ? (
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
                    <td className="whitespace-nowrap px-4 py-2">{i + 1}</td>
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
                      <MdAddBox
                        onClick={() => {
                          handleAddHotdealProdduct(product?._id);
                        }}
                        className="cursor-pointer text-green-500 hover:text-green-400"
                        size={25}
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

        {!isLoading && <hr />}

        {/* Pagination */}
        <Pagination
          rows={rows}
          page={page}
          setPage={setPage}
          setRows={setRows}
          totalData={products?.totalData}
        />
      </div>
    </div>
  );
};

export default AddHotDealProduct;
