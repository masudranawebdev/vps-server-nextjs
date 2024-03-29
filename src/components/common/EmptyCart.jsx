import Link from "next/link";
import Lottie from "lottie-react";
import cartAnimation from "@/assets/lotties/empty-cart-animation.json";

const EmptyCart = ({ toggleDrawer }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="rounded-full p-2">
        <Lottie animationData={cartAnimation} loop={true} />
      </div>
      <p className="text-black">Your Cart is Empty!</p>
      <Link
        href={`/`}
        onClick={toggleDrawer}
        className="relative mt-10 bg-primary inline-flex items-center justify-start px-5 py-3 overflow-hidden font-normal rounded-md group"
      >
        <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-primaryColor opacity-[3%]"></span>
        <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-logoColor opacity-100 group-hover:-translate-x-8"></span>
        <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out">
          Continue Shipping
        </span>
        <span className="absolute inset-0 border-2 border-white rounded"></span>
      </Link>
    </div>
  );
};

export default EmptyCart;
