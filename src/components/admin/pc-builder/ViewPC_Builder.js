"use client";

import NoDataFound from "@/components/common/noDataFound/NoDataFound";
import { authKey } from "@/contants/storageKey";
import { BASE_URL } from "@/utils/baseURL";
import { getFromLocalStorage } from "@/utils/local-storage";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";

const ViewPC_Builder = ({
  openViewPC_BuilderModalValue,
  setOpenViewPC_BuilderModal,
}) => {
  const pc_builder_id = openViewPC_BuilderModalValue?._id;

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const { data: productDetails = [], isLoading } = useQuery({
    queryKey: [
      `/api/v1/pc_builder/dashboard/see_details?pc_builder_id=${pc_builder_id}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/pc_builder/dashboard/see_details?pc_builder_id=${pc_builder_id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  }); // pc builder product details
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-full lg:w-10/12 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3
            className="text-[26px] font-bold text-[#0A0A0A] capitalize"
            id="modal-title"
          >
            {" "}
            View Product{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                setOpenViewPC_BuilderModal(false);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>
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
        ) : productDetails?.data?.length > 0 ? (
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
                  {productDetails?.data?.map((product, i) => (
                    <tr key={product?._id}>
                      <td className="whitespace-nowrap px-4 py-2 flex justify-center mt-3 gap-4">
                        {i + 1}
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
        ) : (
          <NoDataFound />
        )}
      </div>
    </div>
  );
};

export default ViewPC_Builder;
