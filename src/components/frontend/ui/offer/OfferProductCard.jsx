"use client";
import { addToStore } from "@/redux/feature/recentview/recentViewSlice";
import { numberWithCommas } from "@/utils/thousandSeparate";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

const OfferProductCard = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="border hover:border-secondary shadow-md hover:shadow-secondary group rounded-lg relative overflow-hidden bg-white">
        <div className="overflow-hidden relative border-b">
          <Link
            onClick={() => dispatch(addToStore(product))}
            href={`/${product?.offer_product_id?.product_slug}`}
          >
            <Image
              width={500}
              height={500}
              src={product?.offer_product_id?.product_thumbnail}
              alt={product?.offer_product_id?.product_name}
              className="group-hover:scale-105 transition-all duration-500 rounded-lg p-3"
              loading="lazy"
            />
          </Link>
        </div>
        <div className="px-2 pb-3 flex flex-col justify-between mt-3">
          <Link
            onClick={() => dispatch(addToStore(product))}
            href={`/${product?.offer_product_id?.product_slug}`}
            className="h-12"
          >
            <span className="hover:underline hover:text-secondary transition-colors duration-100 text-sm md:text-sm font-semibold md:font-medium text-black leading-5 tracking-tight mb-4 line-clamp-2 h-10">
              {product?.offer_product_id?.product_name}
            </span>
          </Link>
          <article>
            <p className="text-center text-[17px] font-semibold text-secondary">
              {product?.offer_product_id?.product_ecommerce_price
                ? numberWithCommas(
                    product?.offer_product_id?.product_ecommerce_price
                  )
                : product?.offer_product_id?.product_discount_price
                ? numberWithCommas(
                    product?.offer_product_id?.product_discount_price
                  )
                : numberWithCommas(product?.offer_product_id?.product_price)}
              ৳
            </p>
          </article>
        </div>
      </div>
    </>
  );
};

export default OfferProductCard;
