"use client";
import NoDataFound from "@/components/common/noDataFound/NoDataFound";
import { numberWithCommas } from "@/utils/thousandSeparate";
import Image from "next/image";

const OrderViewTable = ({ orderData }) => {
  return (
    <div>
      {orderData?.order_products?.length > 0 ? (
        <div className="mt-5 overflow-x-auto rounded bg-white">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  #SL
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
                  Brand
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {orderData?.order_products?.map((product, i) => (
                <tr key={product?._id} className="border-b">
                  <td className="whitespace-nowrap px-4 py-2 ">{i + 1}</td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <Image
                      src={product?.product_thumbnail}
                      alt="thumbnail"
                      height={50}
                      width={50}
                      loading="lazy"
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 w-[250px] text-wrap inline-block">
                    {product?.product_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase">
                    {numberWithCommas(product?.product_price)}৳
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
                    {product?.product_id?.product_brand_id?.brand_name || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};

export default OrderViewTable;
