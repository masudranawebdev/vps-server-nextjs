"use client";
import Breadcrumb from "@/components/common/BreadCrum";
import {
  addToCart,
  decrementQuantity,
  removeFromCart,
} from "@/redux/feature/cart/cartSlice";
import { numberWithCommas } from "@/utils/thousandSeparate";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTrashAlt } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import cartAnimation from "@/assets/lotties/empty-cart-animation.json";

const CartSection = () => {
  const pathname = usePathname();
  const cartProducts = useSelector((state) => state.cart.products);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const path = pathname.split("/")[1];

  return (
    <div className="mb-10">
      <div className="bg-white py-2.5 px-4 my-2 rounded-md shadow">
        <Breadcrumb crumbs={[{ label: path, path }]} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-8">
          <div className="border rounded-md">
            <div className="bg-bgray-300 py-2.5 px-4 flex justify-between">
              <h6 className="mb-0">
                You have ({cartProducts?.length}) items in your cart
              </h6>
              <button className="mb-0 text-secondary tracking-normal">
                <TfiHeadphoneAlt className="inline ml-2" /> Need Helps
              </button>
            </div>
            {cartProducts?.length > 0 ? (
              cartProducts?.map((product, i) => (
                <div
                  className="flex items-center gap-2 border-b bg-white py-2 px-4"
                  key={i}
                >
                  <div className="w-[70px] h-[70px] border rounded mr-3">
                    <Image
                      width={100}
                      height={100}
                      loading="lazy"
                      src={product?.product_thumbnail}
                      alt={product?.product_name}
                      className="object-fill rounded"
                    />
                  </div>
                  <div className="flex flex-col flex-1 space-y-2">
                    <h2 className="text-[15px] tracking-tight leading-5 mb-0 font-normal">
                      {product?.product_name}
                    </h2>
                    <div className="flex justify-between items-center mr-2">
                      <p className="text-base text-secondary mb-0 font-medium">
                        ৳{numberWithCommas(product?.product_price)}
                      </p>
                      <div className={`flex items-center justify-center`}>
                        <button
                          onClick={() => dispatch(decrementQuantity(product))}
                          className="text-bgray-700 px-1 py-1.5 border hover:bg-bgray-300"
                        >
                          <FiMinus />
                        </button>
                        <button className="px-4 py-1 border text-sm">
                          {product?.quantity}
                        </button>
                        <button
                          onClick={() => dispatch(addToCart(product))}
                          className="text-bgray-700 px-1 py-1.5 border hover:bg-bgray-300"
                        >
                          <GoPlus />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          dispatch(removeFromCart(product));
                        }}
                        className="text-error-200 px-1 py-1 border rounded hover:bg-bgray-300"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col justify-center items-center h-[70vh]">
                <div>
                  <Lottie animationData={cartAnimation} loop={true} />
                </div>
                <p>Your cart is Empty</p>
              </div>
            )}
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="sticky top-20">
            <div className="border rounded-md mb-5">
              <div className="bg-bgray-300 py-2.5 px-4 flex justify-between">
                <h6 className="mb-0 font-semibold">Price Details</h6>
              </div>
              <div className="overflow-x-auto py-2 bg-white border">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="whitespace-nowrap px-4 font-semibold text-gray-900">
                        Sub-Total
                      </td>
                      <td className="whitespace-nowrap px-4 text-right font-medium">
                        ৳{numberWithCommas(totalPrice)}
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 font-semibold text-gray-900">
                        Delivery Charge
                      </td>
                      <td className="whitespace-nowrap px-4 text-right font-medium">
                        to be calculated
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-1 font-semibold text-gray-900">
                        Total
                      </td>
                      <td className="whitespace-nowrap px-4 py-1 text-gray-700 font-medium text-right">
                        ৳{numberWithCommas(totalPrice)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {cartProducts?.length > 0 ? (
              <Link
                href={`/checkout`}
                className="block w-full text-center py-2 bg-primaryColor text-white rounded text-sm"
              >
                Checkout
              </Link>
            ) : (
              <button className="cursor-not-allowed block w-full text-center py-2 bg-gray-500 text-white rounded text-sm">
                Checkout
              </button>
            )}
            <Link
              href={`/`}
              className="block w-full text-center py-2 text-white bg-primary rounded mt-1 text-sm"
            >
              Continue Shipping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSection;
