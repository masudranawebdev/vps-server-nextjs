"use client";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/context";
import { GiShoppingCart } from "react-icons/gi";
import { TfiControlShuffle } from "react-icons/tfi";
import { isLoggedin } from "@/services/auth.services";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/feature/cart/cartSlice";
import { numberWithCommas } from "@/utils/thousandSeparate";
import AddToCartButton from "@/components/common/AddToCartButton";
import { addToCompare } from "@/redux/feature/compare/compareSlice";
import { addToStore } from "@/redux/feature/recentview/recentViewSlice";
import { useAddToWishlistMutation } from "@/redux/feature/wishlist/wishlistApi";

const ProductCard = ({ product, openModal, setViewProduct }) => {
  const dispatch = useDispatch();
  const compareProducts = useSelector((state) => state.compare.products);
  const cartProducts = useSelector((state) => state.cart.products);
  const [addToWishlist] = useAddToWishlistMutation();
  const { user } = useContext(AuthContext);

  const router = useRouter();
  const isLoggedIn = isLoggedin();

  const savePrice = product?.product_price - product?.product_discount_price;

  const handleToWishlist = async () => {
    try {
      if (!isLoggedIn) {
        router.push("/signin");
      } else {
        const wishListData = {
          wishlist_user_id: user?._id,
          wishlist_product_id: product?._id,
          wishlist_user_phone: user?.user_phone,
        };
        const res = await addToWishlist(wishListData);
        if (res?.data?.statusCode === 200 && res?.data?.success === true) {
          toast.success(res?.data?.message, {
            autoClose: 2000,
          });
        } else {
          toast.error(res?.error?.data?.message, {
            autoClose: 2000,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="border hover:border-secondary shadow-md hover:shadow-secondary group rounded-lg relative overflow-hidden bg-white">
        <div className="overflow-hidden relative">
          <div className="border-b mb-2">
            <Link
              onClick={() => dispatch(addToStore(product))}
              href={`/${product?.product_slug}`}
            >
              <Image
                width={500}
                height={500}
                src={product?.product_thumbnail}
                alt={product?.product_name}
                className="group-hover:scale-105 transition-all duration-500 rounded-lg p-3"
                loading="lazy"
              />
            </Link>
          </div>
          <div
            className={`absolute -top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary px-2 py-[6px] rounded group-hover:top-1/2 transition-all duration-700`}
          >
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={handleToWishlist}
                data-tooltip-id="wish-list"
                data-tooltip-content="Wishlist"
              >
                <CiHeart className="text-2xl font-bold text-textColor" />
              </button>
              <span className="inline-block h-[20px] w-[2px] bg-gray-200"></span>
              <button
                onClick={() => {
                  const isAdded = compareProducts?.find(
                    (comItem) => comItem?._id === product?._id
                  );
                  if (isAdded) {
                    toast.info("Already This product Added for Compare!");
                  } else if (compareProducts?.length === 4) {
                    toast.error(
                      "You can Added Maximum 4 Products! at a same time"
                    );
                  } else {
                    dispatch(addToCompare(product));
                    toast.success("Successfully Added for compare Product!");
                  }
                }}
                data-tooltip-id="compare"
                data-tooltip-content="Compare"
              >
                <TfiControlShuffle className="text-2xl font-bold text-textColor" />
              </button>
              <span className="inline-block h-[20px] w-[2px] bg-gray-200"></span>
              <button
                onClick={() => {
                  openModal();
                  setViewProduct(product);
                }}
                data-tooltip-id="quick-view"
                data-tooltip-content="Quick View"
              >
                <FaEye className="text-xl font-bold text-textColor" />
              </button>
            </div>
          </div>
        </div>
        <div className="px-2 pb-3 flex flex-col justify-between">
          <Link
            onClick={() => dispatch(addToStore(product))}
            data-tooltip-id="title"
            data-tooltip-content={product?.product_name}
            href={`/${product?.product_slug}`}
            className="h-12 hover:underline hover:text-secondary"
          >
            <span className="text-sm md:text-sm font-normal md:font-medium leading-5 tracking-tight line-clamp-2">
              {product?.product_name}
            </span>
          </Link>
          <article className="flex flex-col justify-evenly">
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
            <div className="flex justify-between items-center">
              <p className="flex flex-col h-full items-center px-[2px]">
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
              <AddToCartButton className="relative rounded px-2 py-1 overflow-hidden group bg-secondary hover:bg-gradient-to-r hover:from-primaryColor hover:to-successColor text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-in-outout duration-300 cursor-pointer">
                <button
                  onClick={() => {
                    const isExistCart = cartProducts.find(
                      (cartItem) => cartItem?.productId === product?._id
                    );
                    if (isExistCart) {
                      toast.error("Already is added cart", {
                        autoClose: 1500,
                      });
                    } else {
                      dispatch(
                        addToCart({
                          productId: product?._id,
                          product_thumbnail: product?.product_thumbnail,
                          product_name: product?.product_name,
                          quantity: 1,
                          price: product?.product_ecommerce_price
                            ? product?.product_ecommerce_price
                            : product?.product_discount_price
                            ? product?.product_discount_price
                            : product?.product_price,
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
                  <span className="text-sm font-normal">Add</span>
                  <GiShoppingCart className="text-lg md:text-xl lg:text-xl font-normal" />
                </button>
              </AddToCartButton>
            </div>
          </article>
        </div>
        {product?.product_discount_price && (
          <div className="absolute -top-1 -right-1 h-8 w-20 rounded-tr-xl rounded-bl-2xl bg-successColor ">
            <p className="text-center mt-2 text-textColor text-xs">
              {numberWithCommas(savePrice)}৳ off
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCard;
