"use client";
import Link from "next/link";
import { useContext } from "react";
import { CiHeart } from "react-icons/ci";
import { useSelector } from "react-redux";
import { AuthContext } from "@/context/context";
import { TfiControlShuffle } from "react-icons/tfi";
import { useGetWishlistQuery } from "@/redux/feature/wishlist/wishlistApi";

const Sticky = () => {
  const { user } = useContext(AuthContext);
  const { data } = useGetWishlistQuery(user?.user_phone);
  const compareProducts = useSelector((state) => state.compare.products);
  return (
    <div className="flex flex-col gap-3">
      <Link
        href={`/wishlist`}
        className="relative rounded px-2 py-1 group bg-danger hover:bg-gradient-to-r hover:from-primaryColor hover:to-successColor text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-in-outout duration-300"
        passHref
      >
        <CiHeart className="text-2xl font-bold" />
        {data?.data?.length > 0 && (
          <span className="absolute -right-1 -top-1.5 w-5 h-5 bg-secondary rounded-full text-textColor text-xs flex items-center justify-center font-normal">
            {data?.data?.length}
          </span>
        )}
      </Link>
      <Link
        href={`/compare`}
        className="relative rounded px-2 py-1 group bg-gray-700 hover:bg-gradient-to-r hover:from-primaryColor hover:to-successColor text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-in-outout duration-300"
        passHref
      >
        <TfiControlShuffle className="text-2xl font-bold" />

        {compareProducts?.length > 0 && (
          <span className="absolute -right-1 -top-1.5 w-5 h-5 bg-secondary rounded-full text-textColor text-xs flex items-center justify-center font-normal">
            {compareProducts?.length}
          </span>
        )}
      </Link>
    </div>
  );
};

export default Sticky;
