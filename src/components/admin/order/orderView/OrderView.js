"use client";

import { RxCross1 } from "react-icons/rx";
import OrderViewTable from "./OrderViewTable";
import OrderStatusSteper from "./OrderStatusSteper";
import OrderInvoice from "./OrderInvoice";

const OrderView = ({ setIsViewOpen, isViewData }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Asia/Dhaka",
    };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
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
            Order Information{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                setIsViewOpen(false);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>

        <div id="invoicePrintArea">
          <section className="bg-white py-5 rounded-md overflow-x-auto overflow-hidden">
            <OrderStatusSteper order={isViewData} />
          </section>

          <div className="flex items-start justify-between mx-8 mt-6 gap-14">
            <table className="table-auto">
              <tbody>
                <tr>
                  <td className="px-2 py-1 w-[150px]">
                    <strong>Date </strong>
                  </td>
                  <td className="px-2 py-1">
                    <strong>: </strong> {formatDate(isViewData?.createdAt)}
                  </td>
                </tr>
                <tr className="">
                  <td className="px-2 py-1">
                    <strong> Order-ID</strong>
                  </td>
                  <td className="px-2 py-1">
                    <strong>: </strong>
                    {isViewData?.order_id}
                  </td>
                </tr>
                <tr className="">
                  <td className="px-2 py-1">
                    <strong>Transaction-ID</strong>
                  </td>
                  <td className="px-2 py-1">
                    <strong>: </strong> {isViewData?.transaction_id}
                  </td>
                </tr>
                <tr className="">
                  <td className="px-2 py-1">
                    <strong>Payment Status</strong>
                  </td>
                  <td className="px-2 py-1">
                    <strong>: </strong> {isViewData?.payment_status}
                  </td>
                </tr>
                <tr className="">
                  <td className="px-2 py-1">
                    <strong>Method</strong>
                  </td>
                  <td className="px-2 py-1">
                    <strong>: </strong> {isViewData?.payment_method}
                  </td>
                </tr>
                <tr className="">
                  <td className="px-2 py-1">
                    <strong> Total Price</strong>
                  </td>
                  <td className="px-2 py-1">
                    <strong>: {isViewData?.total_price} </strong>
                  </td>
                </tr>
                {isViewData?.coupon_id && (
                  <>
                    <tr className="">
                      <td className="px-2 py-1">
                        <strong> Coupon</strong>
                      </td>
                      <td className="px-2 py-1">
                        <strong>: </strong> {isViewData?.coupon_id?.coupon_code}
                      </td>
                    </tr>
                    <tr className="">
                      <td className="px-2 py-1">
                        <strong> Coupon Bill</strong>
                      </td>
                      <td className="px-2 py-1">
                        <strong>: </strong>{" "}
                        {isViewData?.coupon_id?.coupon_amount}{" "}
                        {isViewData?.coupon_id?.coupon_type}
                      </td>
                    </tr>
                  </>
                )}
                <tr className="">
                  <td className="px-2 py-1">
                    <strong>Order Status</strong>
                  </td>
                  <td className="px-2 py-1">
                    <strong>: </strong> {isViewData?.order_status}
                  </td>
                </tr>
                <tr className="">
                  <td className="px-2 py-1">
                    <strong>Order Type</strong>
                  </td>
                  <td className="px-2 py-1">
                    <strong>: </strong> {isViewData?.order_type}
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="table-auto">
              <tbody>
                <tr>
                  <td className="px-2 py-1 w-[150px]">
                    <strong>Customer Name </strong>
                  </td>
                  <td className="px-2 py-1">
                    <strong>: </strong>
                    {isViewData?.customer_id?.user_name}
                  </td>
                </tr>
                <tr className="">
                  <td className="px-2 py-1">
                    <strong>Customer Phone</strong>
                  </td>
                  <td className="px-2 py-1">
                    <strong>: </strong> {isViewData?.customer_phone}
                  </td>
                </tr>
                <tr className="">
                  <td className="px-2 py-1">
                    <strong>Division</strong>
                  </td>
                  <td className="px-2 py-1">
                    <strong>: </strong> {isViewData?.division}
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-1 w-[180px]">
                    <strong>District </strong>
                  </td>
                  <td className="px-2 py-1">
                    <strong>: </strong>
                    {isViewData?.district}
                  </td>
                </tr>

                <tr className="">
                  <td className="px-2 py-1">
                    <strong>City</strong>
                  </td>
                  <td className="px-2 py-1">
                    <strong>: </strong>
                    {isViewData?.city}
                  </td>
                </tr>
                {isViewData?.biller_name && (
                  <tr className="">
                    <td className="px-2 py-1">
                      <strong>Biller Name</strong>
                    </td>
                    <td className="px-2 py-1">
                      <strong>: </strong> {isViewData?.biller_name}
                    </td>
                  </tr>
                )}
                {isViewData?.biller_phone && (
                  <tr className="">
                    <td className="px-2 py-1">
                      <strong>Biller Phone</strong>
                    </td>
                    <td className="px-2 py-1">
                      <strong>: </strong> {isViewData?.biller_phone}
                    </td>
                  </tr>
                )}
                {isViewData?.biller_pickup_address && (
                  <tr className="">
                    <td className="px-2 py-1">
                      <strong>Biller Address</strong>
                    </td>
                    <td className="px-2 py-1">
                      <strong>: </strong> {isViewData?.biller_pickup_address}
                    </td>
                  </tr>
                )}
                {isViewData?.delivery_charge && (
                  <tr className="">
                    <td className="px-2 py-1">
                      <strong> Delivery Charge</strong>
                    </td>
                    <td className="px-2 py-1">
                      <strong>: </strong> {isViewData?.delivery_charge}
                    </td>
                  </tr>
                )}
                {isViewData?.delivery_method && (
                  <tr className="">
                    <td className="px-2 py-1">
                      <strong> Method</strong>
                    </td>
                    <td className="px-2 py-1">
                      <strong>: </strong> {isViewData?.delivery_method}
                    </td>
                  </tr>
                )}
                {isViewData?.delivery_method == "courier" &&
                  isViewData?.delivery_method_type && (
                    <tr className="">
                      <td className="px-2 py-1">
                        <strong> Method Type</strong>
                      </td>
                      <td className="px-2 py-1">
                        <strong>: </strong> {isViewData?.delivery_method_type}
                      </td>
                    </tr>
                  )}
                {isViewData?.delivery_method == "courier" &&
                  isViewData?.delivery_pickup_address && (
                    <tr className="">
                      <td className="px-2 py-1">
                        <strong>Pick Up</strong>
                      </td>
                      <td className="px-2 py-1">
                        <strong>: </strong>{" "}
                        {isViewData?.delivery_pickup_address}
                      </td>
                    </tr>
                  )}
                {isViewData?.delivery_time && (
                  <tr className="">
                    <td className="px-2 py-1">
                      <strong>Pick Up</strong>
                    </td>
                    <td className="px-2 py-1">
                      <strong>: </strong> {isViewData?.delivery_time}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="my-6">
            <OrderViewTable
              isViewData={isViewData}
              setIsViewOpen={setIsViewOpen}
            />
          </div>
        </div>

        <div className="flex items-center justify-center px-3 my-1">
          <OrderInvoice products={isViewData} />
        </div>
      </div>
    </div>
    // </div>
  );
};

export default OrderView;
