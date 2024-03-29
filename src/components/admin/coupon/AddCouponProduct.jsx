"use client";
import Image from "next/image";
import NoDataFound from "@/components/common/noDataFound/NoDataFound";
import Pagination from "@/components/common/pagination/Pagination";
import useDebounced from "@/hooks/useDebounced";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { CiSquareRemove } from "react-icons/ci";
import { MdAddBox } from "react-icons/md";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const AddCouponProduct = ({ addProduct, setAddProduct }) => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  const searchText = useDebounced({ searchQuery: searchValue, delay: 500 });

  useEffect(() => {
    setSearchTerm(searchText);
  }, [searchText]);

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const { data: products = [], isLoading } = useQuery({
    queryKey: [
      `/api/v1/product/get_add_campaign_product?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/product/get_add_campaign_product?page=${page}&limit=${rows}&searchTerm=${searchTerm}`, {
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
    setSearchValue(e.target.value);
  };
  // add selected product
  const handleAddCampaignProdduct = (product) => {
    setAddProduct((prev) => [...prev, product]);
  };
  // delete selected product
  const handleRemoveCampaignProdduct = (product) => {
    const newProduct = addProduct?.filter(
      (oldProduct) => oldProduct?._id !== product?._id
    );
    setAddProduct(newProduct);
  };

  let remaingProducts = [];

  allProducts?.data?.forEach((product) => {
    const isProductAdded = addProduct?.some(
      (addedProduct) => addedProduct?._id === product?._id
    );

    if (!isProductAdded) {
      remaingProducts.push(product);
    }
  });

  return (
    <div>
      {addProduct?.length > 0 && (
        <div>
          <h5 className="mt-4 font-semibold">You added Those Product:</h5>
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
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {addProduct?.map((product) => (
                  <tr key={product?._id}>
                    <td className="whitespace-nowrap px-4 py-2 flex justify-center mt-3 gap-4">
                      <CiSquareRemove
                        onClick={() => {
                          handleRemoveCampaignProdduct(product);
                        }}
                        className="cursor-pointer text-red-500 hover:text-red-400"
                        size={25}
                      />
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <h5 className="mt-4 font-medium">Please Add Product: </h5>
      {/* Search */}
      <div className="flex items-center justify-end mb-5 gap-2">
        <div className="flex items-center gap-2 rounded border border-[#E7E7E7] bg-gray-50 px-[5px] py-2">
          <BiSearch className="text-[#717171]" size={20} />
          <input
            onChange={(e) => handleSearch(e)}
            type="search"
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
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {remaingProducts?.map((product) => {
                return (
                  <tr key={product?._id}>
                    <td className="whitespace-nowrap px-4 py-2 flex justify-center mt-3 gap-4">
                      <MdAddBox
                        onClick={() => {
                          handleAddCampaignProdduct(product);
                        }}
                        className="cursor-pointer text-green-500 hover:text-green-400"
                        size={25}
                        title="Add Product"
                      />
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
                  </tr>
                );
              })}
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
  );
};

export default AddCouponProduct;
