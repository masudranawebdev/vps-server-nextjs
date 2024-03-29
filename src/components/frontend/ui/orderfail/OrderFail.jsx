"use client";
import Link from "next/link";
import Lottie from "lottie-react";
import orderFailAnimation from "@/assets/lotties/order-fail-animation.json";

const OrderFail = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="w-[200px] mx-auto -mt-48">
        <Lottie animationData={orderFailAnimation} loop={true} />
      </div>
      <h1 className="text-center text-danger">Payment Fail!</h1>
      <div className="flex gap-3 justify-center mt-5">
        <Link
          href={`/checkout`}
          className="bg-primary px-4 py-2 text-textColor rounded hover:bg-opacity-90 text-center"
        >
          Cart
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

export default OrderFail;
