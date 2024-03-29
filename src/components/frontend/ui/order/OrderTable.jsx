"use client";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import { BASE_URL } from "@/utils/baseURL";
import NoDataFound from "@/components/common/noDataFound/NoDataFound";
import Pagination from "@/components/common/pagination/Pagination";
import BigSpinner from "@/components/common/loader/BigSpinner";
import { useQuery } from "@tanstack/react-query";
import { numberWithCommas } from "@/utils/thousandSeparate";
import OrderViewModal from "./OrderViewModal";

const OrderTable = ({ phone, orderStatus }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [orderData, setOrderData] = useState(null);

  const [totalData, setTotalData] = useState(0);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
    }
  };

  const { data: orders, isLoading } = useQuery({
    queryKey: [
      `${BASE_URL}/order/${phone}?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/order/${phone}?page=${page}&limit=${rows}&searchTerm=${searchTerm}`
      );
      const data = await res.json();
      setTotalData(data?.totalData);
      return data?.data;
    },
  });

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

  if (isLoading) {
    return <BigSpinner />;
  }

  const filteredOrders =
    orderStatus === "all"
      ? orders
      : orders.filter((orderItem) => orderItem.order_status === orderStatus);
      
  return (
    <div>
      {/* Date and search field */}
      <div className="flex items-center justify-between gap-1 mt-2">
        <div className="flex items-center gap-2 rounded border border-[#E7E7E7] bg-gray-50 px-[5px] py-2 mt-[16px]">
          <BiSearch className="text-[#717171]" size={20} />
          <input
            onKeyDown={(e) => handleSearch(e)}
            type="text"
            placeholder="Search..."
            className="bg-gray-50 bg-none w-full outline-none text-[14px] placeholder-[#717171]"
          />
        </div>
      </div>

      {/* Table for showing data */}
      {filteredOrders?.length > 0 ? (
        <div className="mt-5 overflow-x-auto rounded bg-white">
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  #SL
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Order ID
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Transaction Id
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Status
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Order Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Payment Type
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Payment Method
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Payment Status
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                  Total Price
                </th>
                <th className="px-4 py-2 text-center font-medium text-gray-900 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredOrders?.map((order, i) => (
                <tr key={order?._id}>
                  <td className="whitespace-nowrap px-4 py-2">{i + 1}</td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {order?.order_id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {order?.transaction_id || "N/A"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <span
                      className={`inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset ${
                        order?.order_status === "pending"
                          ? "bg-yellow-50 text-yellow-700 ring-yellow-600/20"
                          : order?.order_status === "confirm"
                          ? "bg-indigo-50 text-indigo-700 ring-indigo-600/20"
                          : order?.order_status === "processing"
                          ? "bg-purple-50 text-purple-700 ring-purple-600/20"
                          : order?.order_status === "pickup"
                          ? "bg-blue-50 text-bule-700 ring-blue-600/20"
                          : order?.order_status === "shipped"
                          ? "bg-gray-50 text-gray-700 ring-gray-600/20"
                          : "bg-green-50 text-green-700 ring-green-600/20"
                      }`}
                    >
                      {order?.order_status}
                    </span>
                  </td>
                  <td className={`whitespace-nowrap px-4 py-2`}>
                    {formatDate(order?.createdAt)}
                  </td>
                  <td className={`whitespace-nowrap px-4 py-2 capitalize`}>
                    <span
                      className={`inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset ${
                        order?.payment_type === "paid"
                          ? "bg-green-50 text-green-700 ring-green-600/20"
                          : "bg-pink-50 text-pink-700 ring-pink-600/20"
                      }`}
                    >
                      {order?.payment_type}
                    </span>
                  </td>
                  <td className={`whitespace-nowrap px-4 py-2 capitalize`}>
                    <span
                      className={`inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset ${
                        order?.payment_method === "online"
                          ? "bg-indigo-50 text-indigo-700 ring-indigo-600/20"
                          : "bg-yellow-50 text-yellow-700 ring-yellow-600/20"
                      }`}
                    >
                      {order?.payment_method}
                    </span>
                  </td>
                  <td className={`whitespace-nowrap px-4 py-2 capitalize`}>
                    <span
                      className={`inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset ${
                        order?.payment_status === "success"
                          ? "bg-green-50 text-green-700 ring-green-600/20"
                          : "bg-pink-50 text-pink-700 ring-pink-600/20"
                      }`}
                    >
                      {order?.payment_status}
                    </span>
                  </td>
                  <td className={`whitespace-nowrap px-4 py-2`}>
                    {numberWithCommas(order?.total_price)}৳
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                    <IoEyeOutline
                      onClick={() => setOrderData(order)}
                      className="cursor-pointer text-secondary hover:text-successColor"
                      size={24}
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
        totalData={filteredOrders.length}
      />

      {/* Handle open view modal */}
      {orderData && (
        <OrderViewModal orderData={orderData} setOrderData={setOrderData} />
      )}
    </div>
  );
};

export default OrderTable;
