"use client";
import NoDataFound from "@/components/common/noDataFound/NoDataFound";
import Image from "next/image";
import Link from "next/link";
import { IoEye } from "react-icons/io5";

const OrderViewTable = ({ isViewData }) => {

  return (
    <div>
      {/* Table for showing data */}
      {
        // orders?.data?.length > 0 ?
        isViewData?.order_products?.length > 0 ? (
          <div className="mt-5 overflow-x-auto rounded bg-white">
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
                {isViewData?.order_products?.map((product, i) => (
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
                      {product?.product_quantity}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      {product?.product_id?.product_id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      {product?.product_id?.product_sku}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      {product?.product_id?.product_status}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      {product?.product_id?.product_brand_id?.brand_name}
                    </td>

                    <td className="whitespace-nowrap px-4 py-2 flex justify-center mt-3 gap-4">
                      <Link href={`/${product?.product_id?.product_slug}`}>
                        <IoEye
                          className="cursor-pointer text-sky-500 hover:text-sky-400"
                          size={20}
                        />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <NoDataFound />
        )
      }
    </div>
  );
};

export default OrderViewTable;
