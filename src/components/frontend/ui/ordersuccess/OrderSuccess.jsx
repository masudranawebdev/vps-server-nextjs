"use client";
import orderSuccessAnimation from "@/assets/lotties/order-success-animation.json";
import Lottie from "lottie-react";
import Link from "next/link";
const OrderSuccess = ({ tranxId }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="w-[200px] mx-auto -mt-48">
        <Lottie animationData={orderSuccessAnimation} loop={false} />
      </div>
      <h1 className="text-center">Thank you for ordering!</h1>
      <p>
        Your Transaction Id: <span className="text-secondary font-semibold">{tranxId}</span>
      </p>
      <div className="flex gap-3 justify-center mt-5">
        <Link
          href={`/customers-dashboard`}
          className="bg-primary px-4 py-2 text-textColor rounded hover:bg-opacity-90 text-center"
        >
          View Order
        </Link>
        <Link
          href={`/`}
          className="bg-primary px-4 py-2 text-textColor rounded hover:bg-opacity-90 text-center"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
