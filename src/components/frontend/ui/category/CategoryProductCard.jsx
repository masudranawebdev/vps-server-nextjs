"use client";
import { addToStore } from "@/redux/feature/recentview/recentViewSlice";
import { numberWithCommas } from "@/utils/thousandSeparate";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

const CategoryProductCard = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className="rounded-md">
      <div className="overflow-hidden border-b mb-2 p-1">
        <Link
          onClick={() => dispatch(addToStore(product))}
          href={`/${product?.product_slug}`}
        >
          <Image
            width={500}
            height={500}
            src={product?.product_thumbnail}
            alt={product?.product_name}
            className="group-hover:scale-105 transition-all duration-500 rounded-md"
            loading="lazy"
          />
        </Link>
      </div>
      <article className="flex flex-col justify-between">
        <Link
          onClick={() => dispatch(addToStore(product))}
          href={`/${product?.product_slug}`}
          className="h-12 hover:underline hover:text-secondary transition-all duration-100"
        >
          <span className="text-xs font-medium leading-4 line-clamp-2 transition-all duration-200 px-1">
            {product?.product_name}
          </span>
        </Link>
        {/* <div className="flex mt-2 item-center">
          <svg
            className="w-3 h-3 text-secondary fill-current "
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>

          <svg
            className="w-3 h-3 text-secondary fill-current "
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>

          <svg
            className="w-3 h-3 text-secondary fill-current "
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>

          <svg
            className="w-3 h-3 text-secondary fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>

          <svg
            className="w-3 h-3 text-gray-500 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>
          <span className="text-xs -mt-[2px]">({5})</span>
        </div> */}
        <p className="flex flex-col items-center px-[2px] h-12">
          <span className="text-primaryColor font-semibold">
            {product?.product_discount_price
              ? numberWithCommas(product?.product_discount_price)
              : numberWithCommas(product?.product_price)}
            ৳
          </span>
          {product?.product_discount_price && (
            <span className="line-through text-gray-500">
              {numberWithCommas(product?.product_price)} ৳
            </span>
          )}
        </p>
      </article>
    </div>
  );
};

export default CategoryProductCard;
