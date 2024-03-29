"use client";
import withAuth from "@/utils/withAuth";
import { FcProcess } from "react-icons/fc";
import { useContext, useState } from "react";
import OrderTable from "../order/OrderTable";
import { AuthContext } from "@/context/context";
import { MdPendingActions } from "react-icons/md";
import { GiConfirmed, GiCardPickup } from "react-icons/gi";
import { FaShippingFast, FaHandshake, FaJediOrder } from "react-icons/fa";

const CustomerSection = () => {
  const { user } = useContext(AuthContext);
  const [orderStatus, setOrderStatus] = useState("all");
  return (
    <div>
      <div className="flex overflow-x-auto overflow-y-hidden scrollbar-none border-b border-gray-200 whitespace-nowrap bg-white shadow">
        <button
          onClick={() => setOrderStatus("all")}
          className={`inline-flex items-center h-10 px-2 py-2 -mb-px text-center  bg-transparent border-b-2  sm:px-4 -px-1 whitespace-nowrap hover:border-gray-500 focus:outline-none ${
            orderStatus === "all"
              ? "text-blue-600 border-blue-500"
              : "text-gray-700"
          }`}
        >
          <FaJediOrder />

          <span className="mx-1 text-sm sm:text-base">All Order</span>
        </button>
        <button
          onClick={() => setOrderStatus("pending")}
          className={`inline-flex items-center h-10 px-2 py-2 -mb-px text-center bg-transparent border-b-2 hover:border-gray-500 sm:px-4 -px-1 whitespace-nowrap focus:outline-none ${
            orderStatus === "pending"
              ? "text-yellow-600 border-yellow-500"
              : "text-gray-700"
          }`}
        >
          <MdPendingActions />

          <span className="mx-1 text-sm sm:text-base">Pending</span>
        </button>
        <button
          onClick={() => setOrderStatus("confirm")}
          className={`inline-flex items-center h-10 px-2 py-2 -mb-px text-center bg-transparent border-b-2 border-transparent sm:px-4 -px-1 whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 ${
            orderStatus === "confirm"
              ? "text-green-600 border-green-500"
              : "text-gray-700"
          }`}
        >
          <GiConfirmed />
          <span className="mx-1 text-sm sm:text-base">Confirm</span>
        </button>
        <button
          onClick={() => setOrderStatus("processing")}
          className={`inline-flex items-center h-10 px-2 py-2 -mb-px text-center bg-transparent border-b-2 border-transparent sm:px-4 -px-1 whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 ${
            orderStatus === "processing"
              ? "text-indigo-700 border-indigo-500"
              : "text-gray-700"
          }`}
        >
          <FcProcess />
          <span className="mx-1 text-sm sm:text-base">Procesing</span>
        </button>
        <button
          onClick={() => setOrderStatus("pickup")}
          className={`inline-flex items-center h-10 px-2 py-2 -mb-px text-center bg-transparent border-b-2 border-transparent sm:px-4 -px-1 whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 ${
            orderStatus === "pickup"
              ? "text-pink-700 border-pink-500"
              : "text-gray-700"
          }`}
        >
          <GiCardPickup />
          <span className="mx-1 text-sm sm:text-base">Pickup</span>
        </button>
        <button
          onClick={() => setOrderStatus("shipped")}
          className={`inline-flex items-center h-10 px-2 py-2 -mb-px text-center bg-transparent border-b-2 sm:px-4 -px-1 whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 ${
            orderStatus === "shipped"
              ? "text-gray-600 border-gray-500"
              : "text-gray-700"
          }`}
        >
          <FaShippingFast />

          <span className="mx-1 text-sm sm:text-base">Shipped</span>
        </button>
        <button
          onClick={() => setOrderStatus("delivered")}
          className={`inline-flex items-center h-10 px-2 py-2 -mb-px text-center bg-transparent border-b-2 border-transparent sm:px-4 -px-1 whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 ${
            orderStatus === "delivered"
              ? "text-purple border-purple"
              : "text-gray-700"
          }`}
        >
          <FaHandshake />

          <span className="mx-1 text-sm sm:text-base">Delivered</span>
        </button>
      </div>
      <div>
        <OrderTable
          orderStatus={orderStatus}
          setOrderStatus={setOrderStatus}
          phone={user?.user_phone}
        />
      </div>
    </div>
  );
};

export default withAuth(CustomerSection);
