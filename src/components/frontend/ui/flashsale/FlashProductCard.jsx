"use client";
import { addToStore } from "@/redux/feature/recentview/recentViewSlice";
import { numberWithCommas } from "@/utils/thousandSeparate";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

const FlashProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const savePrice =
    product?.campaign_product_id?.product_price -
    product?.campaign_product_id?.product_discount_price;
  return (
    <>
      <div className="border hover:border-secondary shadow-md hover:shadow-secondary group rounded-lg relative overflow-hidden bg-white">
        <div className="overflow-hidden relative border-b mb-3">
          <Link
            onClick={() => dispatch(addToStore(product))}
            href={`/${product?.campaign_product_id?.product_slug}`}
          >
            <Image
              width={500}
              height={500}
              src={product?.campaign_product_id?.product_thumbnail}
              alt={product?.campaign_product_id?.product_name}
              className="group-hover:scale-105 transition-all duration-500 rounded-lg p-3"
              loading="lazy"
            />
          </Link>
        </div>
        <div className="px-2 pb-3 flex flex-col justify-between">
          <Link
            onClick={() => dispatch(addToStore(product))}
            href={`/${product?.campaign_product_id?.product_slug}`}
          >
            <span className="hover:underline hover:text-secondary transition-colors duration-100 text-xs md:text-sm font-semibold md:font-medium text-black leading-4 md:leading-5 tracking-tight mb-4 line-clamp-2 h-10">
              {product?.campaign_product_id?.product_name}
            </span>
          </Link>

          <article className="flex flex-col items-center">
            <p className="text-center text-[17px] font-semibold text-secondary">
              {product?.campaign_product_id?.product_discount_price
                ? numberWithCommas(
                    product?.campaign_product_id?.product_discount_price
                  )
                : numberWithCommas(product?.campaign_product_id?.product_price)}
              ৳
            </p>
            <p className="text-center text-[15px] font-semibold text-secondary">
              {product?.campaign_product_id?.product_discount_price && (
                <span className="line-through text-gray-500">
                  {numberWithCommas(
                    product?.campaign_product_id?.product_price
                  )}{" "}
                  ৳
                </span>
              )}
            </p>
          </article>
        </div>
        <div className="absolute -top-1 -right-1 h-8 w-20 rounded-tr-xl rounded-bl-2xl bg-successColor ">
          <p className="text-center mt-2 text-textColor text-xs">
            {savePrice}৳ off
          </p>
        </div>
      </div>
    </>
  );
};

export default FlashProductCard;
