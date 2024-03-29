"use client";

import Image from "next/image";
import { RxCross1 } from "react-icons/rx";

const ViewCampaign = ({
  openViewCampaignModalValue,
  setOpenViewCampaignModal,
}) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-full lg:w-10/12 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3
            className="text-[26px] font-bold text-[#0A0A0A] capitalize"
            id="modal-title"
          >
            {" "}
            View Campaign{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                setOpenViewCampaignModal(false);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>
        <p className="mt-4">
          <strong>Description: </strong>
          {openViewCampaignModalValue?.campaign_description}
        </p>
        {openViewCampaignModalValue?.campaign_products?.length > 0 && (
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
                  {openViewCampaignModalValue?.campaign_products?.map(
                    (product, i) => (
                      <tr key={product?._id}>
                        <td className="whitespace-nowrap px-4 py-2 flex justify-center mt-3 gap-4">
                          {i + 1}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          <Image
                            src={
                              product?.campaign_product_id?.product_thumbnail
                            }
                            alt=""
                            height={50}
                            width={50}
                          />
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          {product?.campaign_product_id?.product_name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 lowercase">
                          {product?.campaign_product_id?.product_price}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 lowercase">
                          {product?.campaign_product_id?.product_discount_price}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 lowercase">
                          {product?.campaign_product_id?.product_quantity}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          {product?.campaign_product_id?.product_id}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          {product?.campaign_product_id?.product_sku}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          {product?.campaign_product_id?.product_status}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          {
                            product?.campaign_product_id?.product_brand_id
                              ?.brand_name
                          }
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCampaign;
