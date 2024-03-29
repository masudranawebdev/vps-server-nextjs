"use client";
import AddToCartButton from "@/components/common/AddToCartButton";
import { addToCart } from "@/redux/feature/cart/cartSlice";
import { numberWithCommas } from "@/utils/thousandSeparate";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const QuickViewDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);
  const price = product?.product_ecommerce_price
    ? product?.product_ecommerce_price * quantity
    : product?.product_discount_price
    ? product?.product_discount_price * quantity
    : product?.product_price * quantity;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <Image
          width={500}
          height={500}
          src={product?.product_thumbnail}
          alt={product?.product_name}
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h6 className="font-medium tracking-tight leading-5 mb-5">
          {product?.product_name}
        </h6>
        <div className="flex flex-wrap gap-1">
          <p className="rounded-full px-4 py-[3px] bg-gray-100">
            <strong>Price: </strong>
            <span className="text-secondary">
              {product?.product_discount_price
                ? numberWithCommas(product?.product_discount_price)
                : numberWithCommas(product?.product_price)}
              ৳
            </span>
            {product?.product_discount_price && (
              <span className="line-through text-gray-600 ml-2">
                {numberWithCommas(product?.product_price)}৳
              </span>
            )}
          </p>
          <p className="rounded-full px-4 py-[3px] bg-successColor">
            <strong>E-com Price:</strong>
            <span>{numberWithCommas(product?.product_ecommerce_price)}৳</span>
          </p>
          <p className="rounded-full px-4 py-[3px] bg-gray-100">
            <strong>Brand:</strong>
            <span>Asus</span>
          </p>
          <p className="rounded-full px-4 py-[3px] bg-gray-100">
            <span className="text-successColor">In-Stock</span>
          </p>
        </div>
        <h6 className="mt-3 font-semibold">Key Feature</h6>
        <div
          className="text-xs"
          dangerouslySetInnerHTML={{ __html: product?.product_key_feature }}
        ></div>
        <div className="flex gap-2 mt-5">
          <div className="flex border rounded">
            <button
              onClick={() => {
                if (quantity > 1) {
                  setQuantity((prev) => prev - 1);
                }
              }}
              className={`${
                quantity === 1 && "cursor-not-allowed"
              } w-8 h-full flex items-center justify-center border rounded-tl rounded-bl`}
            >
              <FaMinus className="font-extralight" />
            </button>
            <p className="w-12 h-full flex items-center justify-center border">
              <span>{quantity}</span>
            </p>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="w-8 h-full flex items-center justify-center border rounded-br rounded-tr"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex items-center justify-center">
            <AddToCartButton className="relative rounded px-4 py-2 overflow-hidden group bg-secondary hover:bg-gradient-to-r hover:from-primaryColor hover:to-successColor text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-in-outout duration-300 cursor-pointer">
              <Link
                href={`/cart`}
                onClick={() => {
                  const isExistCart = cartProducts.find(
                    (cartItem) => cartItem?.productId === product?._id
                  );
                  if (!isExistCart) {
                    dispatch(
                      addToCart({
                        productId: product?._id,
                        product_thumbnail: product?.product_thumbnail,
                        product_name: product?.product_name,
                        quantity: quantity,
                        price,
                        product_price: product?.product_ecommerce_price
                          ? product?.product_ecommerce_price
                          : product?.product_discount_price
                          ? product?.product_discount_price
                          : product?.product_price,
                      })
                    );
                    toast.success("Successfully added to cart", {
                      autoClose: 1500,
                    });
                  }
                }}
                className="flex items-center gap-[2px]"
              >
                <span className="text-sm font-normal">Buy Now</span>
              </Link>
            </AddToCartButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewDetails;
