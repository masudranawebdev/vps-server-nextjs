"use client";
import { RxCross1 } from "react-icons/rx";
import OrderViewTable from "./OrderViewTable";
import { numberWithCommas } from "@/utils/thousandSeparate";
import { useEffect, useRef, useState } from "react";
import { FcPrint } from "react-icons/fc";
import { useReactToPrint } from "react-to-print";

const OrderViewModal = ({ orderData, setOrderData }) => {
  const [totalAmount, setTotalAmount] = useState(0);
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

  useEffect(() => {
    // Calculate total price for each product
    const calculateTotalPrice = (quantity, product_price) =>
      quantity * product_price;

    // Calculate overall total price for all products
    const calculateOverallTotal = () => {
      return orderData?.order_products?.reduce((total, product) => {
        const productTotal = calculateTotalPrice(
          product.product_quantity,
          product.product_price
        );
        return total + productTotal;
      }, 0);
    };

    if (orderData?.coupon_id?.coupon_type === "fixed") {
      return setTotalAmount(
        () =>
          calculateOverallTotal() - Number(orderData?.coupon_id?.coupon_amount)
      );
    } else if (orderData?.coupon_id?.coupon_type === "percent") {
      const discountPrice =
        (calculateOverallTotal() *
          Number(orderData?.coupon_id?.coupon_amount)) /
        100;
      return setTotalAmount(calculateOverallTotal() - discountPrice);
    } else {
      setTotalAmount(calculateOverallTotal());
    }
  }, [orderData]);

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Order Invoice",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-full lg:w-9/12 xl:w-7/12 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3
            className="text-[24px] font-medium text-[#0A0A0A] capitalize"
            id="modal-title"
          >
            Order Information
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                setOrderData(null);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>
        <div
          className="w-[892px] px-2 mt-10 mx-auto"
          ref={contentToPrint}
        >
          <div className="mt-6">
            <table>
              <tbody>
                <tr>
                  <td className="px-2 w-[150px] whitespace-nowrap text-xs sm:text-sm">
                    <p>Date </p>
                  </td>
                  <td className="px-2 w-[250px] whitespace-nowrap text-xs sm:text-sm">
                    <strong>: </strong> {formatDate(orderData?.createdAt)}
                  </td>
                </tr>
                <tr>
                  <td className="px-2 w-[150px] whitespace-nowrap text-xs sm:text-sm">
                    <p>Order-ID</p>
                  </td>
                  <td className="px-2 w-[250px] whitespace-nowrap text-xs sm:text-sm">
                    <strong>: </strong>
                    {orderData?.order_id}
                  </td>
                </tr>
                <tr>
                  <td className="px-2 w-[150px] whitespace-nowrap text-xs sm:text-sm">
                    <p>Transaction-ID</p>
                  </td>
                  <td className="px-2 w-[250px] whitespace-nowrap text-xs sm:text-sm">
                    <strong>: </strong> {orderData?.transaction_id}
                  </td>
                </tr>
                <tr>
                  <td className="px-2 w-[150px] whitespace-nowrap text-xs sm:text-sm">
                    <p>Name</p>
                  </td>
                  <td className="px-2 w-[250px] whitespace-nowrap text-xs sm:text-sm">
                    <strong>: </strong>{" "}
                    {orderData?.customer_id?.customer_name || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className="px-2 w-[150px] whitespace-nowrap text-xs sm:text-sm">
                    <p>Phone</p>
                  </td>
                  <td className="px-2 w-[250px] whitespace-nowrap text-xs sm:text-sm">
                    <strong>: </strong> {orderData?.customer_phone || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className="px-2 w-[150px] whitespace-nowrap text-xs sm:text-sm">
                    <p>Address</p>
                  </td>
                  <td className="px-2 w-[250px] whitespace-nowrap text-xs sm:text-sm">
                    <strong>: </strong>{" "}
                    {orderData?.city +
                      ", " +
                      orderData?.district +
                      ", " +
                      orderData?.division}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-6">
            <OrderViewTable orderData={orderData} />
          </div>

          <table className="border border-gray-200 rounded ml-auto">
            <tbody className="divide-y">
              <tr>
                <td className="px-2 w-[150px]">
                  <p className="font-medium text-sm">Sub-Total </p>
                </td>
                <td className="px-2 w-[250px] text-right">
                  {numberWithCommas(totalAmount)}৳
                </td>
              </tr>
              <tr className="">
                <td className="px-2 w-[150px]">
                  <p className="font-medium text-sm">Delivery Charge</p>
                </td>
                <td className="px-2 w-[250px] text-right">
                  {orderData?.delivery_charge}৳
                </td>
              </tr>
              <tr>
                <td className="px-2 w-[150px]">
                  <p className="font-medium text-sm">Total </p>
                </td>
                <td className="px-2 w-[250px] text-right">
                  {numberWithCommas(
                    totalAmount + Number(orderData?.delivery_charge)
                  )}
                  ৳
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-center">
          <button
            className="w-[80px] py-1 bg-gray-100 hover:bg-gray-200 text-center rounded"
            onClick={() => {
              handlePrint(null, () => contentToPrint.current);
            }}
          >
            <FcPrint className="text-2xl inline-block" />
            <span className="text-primary">Print</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderViewModal;
