"use client";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import { removeFromPcbuild } from "@/redux/feature/pcbuild/pcbuildSlice";
import { numberWithCommas } from "@/utils/thousandSeparate";

const PcBuilderCard = ({ category }) => {
  const pcbuildProducts = useSelector((state) => state.pcbuild.products);
  const dispatch = useDispatch();
  return (
    <div className="">
      <div className="flex items-center gap-3 px-5 border-b py-2">
        <div className="w-10 lg:w-20 h-10 lg:h-20 flex items-center justify-center rounded overflow-hidden">
          <Link
            href={`/pc-builder/${category?._id}?category=${category?.category_id?.category_slug}`}
          >
            <Image
              src={category?.pc_builder_logo}
              alt={category?.pc_builder_name}
              height={100}
              width={100}
              className="hover:scale-105 transition-all duration-300"
              loading="lazy"
            />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm lg:text-base">{category?.pc_builder_name}</p>
          {category?.pc_builder_required && (
            <p className="text-xs bg-gray-200 rounded-sm px-1 text-center">
              Required
            </p>
          )}
        </div>
        <div className="flex-1 h-2 lg:h-3 bg-gray-200"></div>
        <Link
          href={`/pc-builder/${category?._id}?category=${category?.category_id?.category_slug}`}
        >
          <span className="px-3 py-1 hover:bg-primary hover:text-white border border-primary rounded-sm transition-all duration-300 ease-in-out">
            Select
          </span>
        </Link>
      </div>
      <div>
        {pcbuildProducts?.map(
          (product) =>
            product.pc_builder_name === category.pc_builder_name && (
              <div
                key={product.productId}
                className="border-b flex lg:flex-row justify-between items-center gap-2 pb-2 px-4"
              >
                <div className="w-[50px] md:w-[100px] h-[50px] md:h-[100px]">
                  <Image
                    src={product?.product_thumbnail}
                    alt={product?.product_name}
                    height={100}
                    width={100}
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <p>{product?.pc_builder_name}</p>
                  <h6 className="text-sm font-semibold">
                    {product?.product_name}
                  </h6>
                </div>
                <div>
                  <p>{numberWithCommas(product?.price)} ৳</p>
                </div>
                <div>
                  <button
                    onClick={() => dispatch(removeFromPcbuild(product))}
                    className="flex items-center font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded hover:bg-danger focus:outline-none focus:ring focus:ring-danger focus:ring-opacity-80"
                  >
                    <IoCloseOutline className="text-3xl p-1" />
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default PcBuilderCard;
