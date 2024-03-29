"use client";
import AddToCartButton from "@/components/common/AddToCartButton";
import Breadcrumb from "@/components/common/BreadCrum";
import { AuthContext } from "@/context/context";
import { addToCart } from "@/redux/feature/cart/cartSlice";
import { addToStore } from "@/redux/feature/recentview/recentViewSlice";
import {
  useDeleteToWishlistMutation,
  useGetWishlistQuery,
} from "@/redux/feature/wishlist/wishlistApi";

import { numberWithCommas } from "@/utils/thousandSeparate";
import withAuth from "@/utils/withAuth";
import Lottie from "lottie-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import wishlistAnimation from "@/assets/lotties/empty-wishlist-animation.json";

const crumbs = [{ label: "Wishlist", path: "/wishlist" }];

const WishlistSection = () => {
  const { user } = useContext(AuthContext);
  const { data } = useGetWishlistQuery(user?.user_phone);
  const [deleteToWishlist] = useDeleteToWishlistMutation();
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);
  const handleDeleteToWishlist = async (id) => {
    try {
      const deleteData = {
        _id: id,
        wishlist_user_id: user?._id,
      };
      const res = await deleteToWishlist(deleteData);
      if (res?.data?.statusCode === 200 && res?.data?.success) {
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="bg-white py-2.5 px-4 my-2 rounded-md shadow">
        <Breadcrumb crumbs={crumbs} />
      </div>
      <div className="max-w-5xl mx-auto mb-5">
        <div className="rounded-md">
          <div className="bg-bgray-300 py-2.5 px-4 flex justify-between">
            <h6 className="mb-0">My Wish list</h6>
            <button className="mb-0 text-secondary tracking-normal">
              <TfiHeadphoneAlt className="inline ml-2" /> Need Helps
            </button>
          </div>
          {data?.data?.length > 0 ? (
            data?.data?.map((product, i) => (
              <div
                className="flex items-center gap-2 border rounded shadow-sm hover:shadow bg-white py-3 my-2 px-4"
                key={i}
              >
                <div className="w-[70px] h-[70px] border rounded mr-3">
                  <Link
                    onClick={() => dispatch(addToStore(product))}
                    href={`/${product?.wishlist_product_id?.product_slug}`}
                  >
                    <Image
                      width={100}
                      height={100}
                      loading="lazy"
                      src={product?.wishlist_product_id?.product_thumbnail}
                      alt={product?.wishlist_product_id?.product_name}
                      className="object-fill rounded"
                    />
                  </Link>
                </div>
                <div className="flex flex-col flex-1 space-y-2">
                  <div>
                    <Link
                      onClick={() => dispatch(addToStore(product))}
                      href={`/${product?.wishlist_product_id?.product_slug}`}
                      className="hover:underline"
                    >
                      <span className="text-[15px] tracking-tight hover:text-secondary leading-5 mb-0 font-normal">
                        {product?.wishlist_product_id?.product_name}
                      </span>
                    </Link>
                    <p className="text-base text-secondary mb-0 font-medium">
                      {product?.wishlist_product_id?.product_ecommerce_price
                        ? numberWithCommas(
                            product?.wishlist_product_id
                              ?.product_ecommerce_price
                          )
                        : product?.wishlist_product_id?.product_discount_price
                        ? numberWithCommas(
                            product?.wishlist_product_id?.product_discount_price
                          )
                        : numberWithCommas(
                            product?.wishlist_product_id?.product_price
                          )}
                      ৳
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 items-center mr-2">
                  <button
                    onClick={() => handleDeleteToWishlist(product?._id)}
                    className="text-error-200 px-1 py-1 border rounded hover:bg-bgray-300"
                  >
                    <FaTrashAlt />
                  </button>
                  <AddToCartButton className="relative rounded px-2 py-1 overflow-hidden group bg-secondary hover:bg-gradient-to-r hover:from-primaryColor hover:to-successColor text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-in-outout duration-300 cursor-pointer">
                    <div
                      onClick={() => {
                        const isExistCart = cartProducts.find(
                          (cartItem) =>
                            cartItem?.productId ===
                            product?.wishlist_product_id?._id
                        );
                        if (isExistCart) {
                          toast.error("Already is added cart", {
                            autoClose: 1500,
                          });
                        } else {
                          dispatch(
                            addToCart({
                              productId: product?.wishlist_product_id?._id,
                              product_thumbnail:
                                product?.wishlist_product_id?.product_thumbnail,
                              product_name:
                                product?.wishlist_product_id?.product_name,
                              quantity: 1,
                              price: product?.wishlist_product_id
                                ?.product_ecommerce_price
                                ? product?.wishlist_product_id
                                    ?.product_ecommerce_price
                                : product?.wishlist_product_id
                                    ?.product_discount_price
                                ? product?.wishlist_product_id
                                    ?.product_discount_price
                                : product?.wishlist_product_id?.product_price,
                              product_price: product?.wishlist_product_id
                                ?.product_ecommerce_price
                                ? product?.wishlist_product_id
                                    ?.product_ecommerce_price
                                : product?.wishlist_product_id
                                    ?.product_discount_price
                                ? product?.wishlist_product_id
                                    ?.product_discount_price
                                : product?.wishlist_product_id?.product_price,
                            })
                          );
                          toast.success("Successfully added to cart", {
                            autoClose: 1500,
                          });
                        }
                      }}
                      className="flex items-center gap-[2px]"
                    >
                      <span className="text-sm font-normal">Add To</span>
                      <GiShoppingCart className="text-lg md:text-xl lg:text-xl font-normal" />
                    </div>
                  </AddToCartButton>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <div>
                <Lottie animationData={wishlistAnimation} loop={true} />
              </div>
              <p>Your Wishlist is Empty!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(WishlistSection);
