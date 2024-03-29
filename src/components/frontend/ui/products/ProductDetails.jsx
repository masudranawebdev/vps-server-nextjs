"use client";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { CiHeart } from "react-icons/ci";
import { SiAnswer } from "react-icons/si";
import { useContext, useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { Link as NavLink } from "react-scroll";
import { AuthContext } from "@/context/context";
import ReviewModal from "../review/ReviewModal";
import { GiShoppingCart } from "react-icons/gi";
import { FaMinus, FaPlus } from "react-icons/fa";
import { TfiControlShuffle } from "react-icons/tfi";
import { RiQuestionnaireFill } from "react-icons/ri";
import { redirect, useRouter } from "next/navigation";
import QuestionModal from "../question/QuestionModal";
import { isLoggedin } from "@/services/auth.services";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/feature/cart/cartSlice";
import { numberWithCommas } from "@/utils/thousandSeparate";
import { RiMessage2Line, RiFileListLine } from "react-icons/ri";
import AddToCartButton from "@/components/common/AddToCartButton";
import { addToCompare } from "@/redux/feature/compare/compareSlice";
import { useGetReviewQuery } from "@/redux/feature/review/reviewApi";
import { useGetQuestionQuery } from "@/redux/feature/question/questionApi";
import FrontPagination from "@/components/common/pagination/FrontPagination";
import { useAddToWishlistMutation } from "@/redux/feature/wishlist/wishlistApi";
import { useGetRelatedProductsQuery } from "@/redux/feature/product/productApi";

const ProductDetails = ({ product }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const compareProducts = useSelector((state) => state.compare.products);
  const cartProducts = useSelector((state) => state.cart.products);
  const recentViewProducts = useSelector((state) => state.recentView.products);
  const [image, setImage] = useState(product?.product_thumbnail);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const [addToWishlist] = useAddToWishlistMutation();
  const [quantity, setQuantity] = useState(1);
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: reviews } = useGetReviewQuery(product?._id);
  const { data: questions } = useGetQuestionQuery(product?._id);
  const { data: relatedProducts } = useGetRelatedProductsQuery(
    product?.product_related_slug
  );

  const price = product?.product_ecommerce_price
    ? product?.product_ecommerce_price * quantity
    : product?.product_discount_price
    ? product?.product_discount_price * quantity
    : product?.product_price * quantity;

  const isLoggedIn = isLoggedin();

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

  const handleOpenToReview = () => {
    if (!isLoggedIn) {
      return router.push("/signin");
    } else {
      setOpenReviewModal(!openReviewModal);
    }
  };

  const handleOpenToQuestion = () => {
    if (!isLoggedIn) {
      return router.push("/signin");
    } else {
      setOpenQuestionModal(!openQuestionModal);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Asia/Dhaka",
    };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleReviewPageChange = (page) => {
    setCurrentReviewPage(page);
  };

  const totalItems = questions?.data?.length;
  const totalPages = Math.ceil(totalItems / 5);
  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + Number(5);

  const totalReviewItems = reviews?.data?.length;
  const totalReviewPages = Math.ceil(totalReviewItems / 5);
  const startReviewIndex = (currentPage - 1) * 5;
  const endReviewIndex = startReviewIndex + Number(5);

  if (!product) {
    return redirect("/");
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-9 gap-5 lg:gap-20 xl:gap-5 my-4 lg:mb-10 mt-1 lg:py-10 bg-white rounded-lg">
        <div className="md:col-span-4 lg:col-span-3 flex flex-col">
          <div className="col-span-3 h-full lg:h-[360px] w-full lg:w-[400px]">
            <div>
              <Image
                width={500}
                height={500}
                src={image}
                alt={product?.product_name}
                title={product?.product_name}
                loading="lazy"
              />
            </div>
            <div className="flex justify-center">
              {product?.product_images?.map((imageItem, i) => (
                <Image
                  width={50}
                  height={50}
                  onClick={() => setImage(imageItem?.image)}
                  key={i}
                  src={imageItem?.image}
                  alt="images"
                  title="Multiple Images"
                  loading="lazy"
                  className={`w-[40px] h-[40px] border ${
                    image === imageItem?.image && "border-secondary"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-5 lg:col-span-6 grid grid-cols-1 xl:grid-cols-6">
          <div className="lg:col-span-4 px-2">
            <h5 className="mb-3 text-base lg:text-lg xl:text-xl font-medium ">
              {product?.product_name}
            </h5>
            <article className="flex flex-wrap gap-1 mb-3">
              <p className="rounded-full px-3 py-[2px] bg-gray-200">
                <span>Special Price:</span>
                <span className="text-secondary text-lg ml-1">
                  {numberWithCommas(product?.product_price)}৳
                </span>
              </p>
              {product?.product_discount_price && (
                <p className="rounded-full px-3 py-[2px] bg-gray-200">
                  <span>Regular Price:</span>
                  <span className="text-secondary text-lg ml-1">
                    {numberWithCommas(product?.product_discount_price)}৳
                  </span>
                </p>
              )}
              {product?.product_ecommerce_price && (
                <p className="rounded-full px-3 py-[2px] bg-successColor">
                  <span>E-com Price:</span>
                  <span className="text-lg ml-1">
                    {numberWithCommas(product?.product_ecommerce_price)}৳
                  </span>
                </p>
              )}
            </article>
            <article>
              <h5 className="font-semibold">Key Features</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: product?.product_key_feature,
                }}
                className="text-xs"
              ></div>
            </article>
          </div>
          <div className="lg:col-span-2 px-2">
            <h6 className="text-base">Available Offers</h6>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div className="border border-dotted border-spacing-2 border-secondary rounded-md">
                <p className="text-xs text-successColor text-wrap p-1 tracking-tighter leading-3 mb-0">
                  Get a mouse, USB
                </p>
                <p className="text-xs text-gray-500 text-wrap p-1 tracking-tighter">
                  free worth of ৳100
                </p>
                <p className="text-danger text-xs text-end mr-2 mb-0">t&c</p>
              </div>
              <div className="border border-dotted border-spacing-2 border-secondary rounded-md">
                <p className="text-xs text-successColor text-wrap p-1 tracking-tighter leading-3 mb-0">
                  Get a mouse, USB
                </p>
                <p className="text-xs text-gray-500 text-wrap p-1 tracking-tighter">
                  free worth of ৳100
                </p>
              </div>
            </div>
            <article className="flex flex-wrap gap-1 mb-3 mt-3">
              <p className="rounded-full px-3 py-[2px] bg-gray-100">
                <span className="text-sm font-medium">Brand: </span>
                <span className="text-secondary text-sm">
                  {product?.product_brand_id?.brand_name}
                </span>
              </p>
              <p className="rounded-full px-3 py-[2px] bg-gray-100">
                <span className="text-gray-800 font-medium text-sm">
                  Status: In-Stock
                </span>
              </p>
              <p className="rounded-full px-3 py-[2px] bg-gray-100">
                <span className="text-gray-800 font-medium text-sm">
                  SKU: {product?.product_sku}
                </span>
              </p>
              <p className="rounded-full px-3 py-[2px] bg-gray-100">
                <span className="text-gray-800 font-medium text-sm">
                  Warranty Type: Brand Warranty
                </span>
              </p>
            </article>
            <div className="flex gap-2">
              <div className="flex gap-5">
                <div className="flex rounded">
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

                <div className="flex gap-3">
                  <button
                    onClick={handleToWishlist}
                    className="relative rounded px-2 py-1 overflow-hidden group bg-danger hover:bg-gradient-to-r hover:from-primaryColor hover:to-successColor text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-in-outout duration-300"
                  >
                    <CiHeart className="text-2xl font-bold" />
                  </button>
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
                        toast.success(
                          "Successfully Added for compare Product!"
                        );
                      }
                    }}
                    className="relative rounded px-2 py-1 overflow-hidden group bg-gray-700 hover:bg-gradient-to-r hover:from-primaryColor hover:to-successColor text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-in-outout duration-300"
                  >
                    <TfiControlShuffle className="text-2xl font-bold" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center"></div>
            </div>
            <div className="flex  gap-2 mt-4">
              <div className="flex justify-center items-center">
                <AddToCartButton className="relative rounded px-2 py-2 overflow-hidden group bg-secondary hover:bg-gradient-to-r hover:from-primaryColor hover:to-successColor text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-in-outout duration-300">
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
                    <span className="text-sm font-normal">Add To</span>
                    <GiShoppingCart className="text-lg md:text-xl lg:text-xl font-normal" />
                  </button>
                </AddToCartButton>
              </div>
              <div className="flex items-center justify-center">
                <AddToCartButton className="relative rounded px-4 py-2 overflow-hidden group bg-successColor hover:bg-gradient-to-r hover:from-primaryColor hover:to-successColor text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-in-outout duration-300 cursor-pointer">
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <nav className="flex flex-wrap justify-center lg:justify-start pt-2 border-b border-gray-200 whitespace-nowrap bg-white">
            <NavLink
              to="specification"
              duration={500}
              className="inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-secondary bg-transparent border-b-2 border-danger sm:text-base whitespace-nowrap focus:outline-none cursor-pointer"
            >
              Specification
            </NavLink>

            <NavLink
              to="description"
              duration={500}
              className="inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 cursor-pointer"
            >
              Description
            </NavLink>

            <NavLink
              to="question"
              duration={500}
              className="inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 cursor-pointer"
            >
              Questions ({questions?.data?.length})
            </NavLink>
            <NavLink
              to="review"
              duration={500}
              className="inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 cursor-pointer"
            >
              Reviews ({reviews?.data?.length})
            </NavLink>
          </nav>

          <section id="specification">
            <div className="flex flex-col">
              <h2 className="text-[20px] font-medium text-gray-800 py-2 my-2 bg-white px-6 rounded-md">
                Specification
              </h2>
              <div className="inline-block min-w-full align-middle">
                {product?.specifications?.map((specification) => (
                  <div
                    key={specification?._id}
                    className="border border-gray-200 shadow overflow-x-auto"
                  >
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th
                            colSpan={2}
                            className="whitespace-nowrap text-left font-medium text-gray-900"
                          >
                            <h2 className="text-lg font-medium bg-primary text-textColor py-2 mb-0 px-4 min-w-full">
                              {
                                specification?.specification_id
                                  ?.specification_name
                              }
                            </h2>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {specification?.specification_details?.map(
                          (item, i) => (
                            <tr
                              className={`${
                                (i + 1) % 2 === 0 ? "bg-white" : "bg-white"
                              }`}
                              key={item?._id}
                            >
                              <td className="w-4/12 py-2 px-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                {item?.specification_details_id?.filter_name}
                              </td>
                              <td className="border-l py-2 px-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: item?.specification_details_value,
                                  }}
                                ></div>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="description" className="container mt-10 lg:mt-10">
            <details className="flex flex-col lg:my-10 bg-white rounded-md shadow group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between py-2 px-4 border-b">
                <span className="text-xl font-medium"> Description </span>
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>
              <div
                className="pt-2 pb-4 px-4"
                dangerouslySetInnerHTML={{
                  __html: product?.product_description,
                }}
              ></div>
            </details>
          </section>

          <section id="question" className="container">
            <div className="flex flex-col my-8 bg-white rounded-md shadow px-4">
              <div className="flex justify-between border-b-2 border-gray-400 py-2 lg:py-5">
                <article>
                  <h2 className="text-[20px] font-medium text-gray-800 my-2 rounded-md">
                    Questions ({questions?.data?.length})
                  </h2>
                  <p className="text-gray-500 text-wrap font-normal tracking-tight leading-4 text-xs lg:text-sm">
                    Have question about this product? Get specific details about
                    this product from expert.
                  </p>
                </article>
                <div className="flex items-center justify-center">
                  <button
                    onClick={handleOpenToQuestion}
                    className="relative rounded px-3 py-[2px] md:py-2 overflow-hidden group bg-secondary hover:bg-gradient-to-r hover:from-primaryColor hover:to-successColor text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-in-outout duration-300"
                  >
                    Ask Question
                  </button>
                </div>
              </div>
              {questions?.data?.length > 0 ? (
                <div className="my-5">
                  {questions?.data
                    ?.slice(startIndex, endIndex)
                    .map((question) => (
                      <div
                        className="space-y-3 border-b mb-2 pb-2"
                        key={question?._id}
                      >
                        <p className="flex gap-3">
                          <span>
                            <RiQuestionnaireFill className="text-3xl" />
                          </span>{" "}
                          <span>{question?.question_name}</span>
                        </p>
                        {question?.question_answer && (
                          <p className="text-wrap w-full flex gap-3">
                            <span>
                              <SiAnswer className="text-2xl text-secondary" />
                            </span>
                            <span>{question?.question_answer}</span>
                          </p>
                        )}
                      </div>
                    ))}
                  {questions?.data?.length > 10 && (
                    <div className="flex justify-end">
                      <FrontPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        itemsPerPage={5}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center h-[200px] lg:h-[300px]">
                  <span className="w-10 lg:w-20 h-10 lg:h-20 rounded-full bg-secondary flex items-center justify-center">
                    <RiMessage2Line className="text-white text-2xl lg:text-5xl" />
                  </span>
                  <p className="text-gray-700 text-wrap font-normal tracking-tight leading-4 mt-5">
                    There are no questions asked yet. Be the first one to ask a
                    question.
                  </p>
                </div>
              )}
            </div>
          </section>

          <section id="review" className="container">
            <div className="flex flex-col my-5 lg:my-10 bg-white rounded-md shadow px-4">
              <div className="flex justify-between border-b-2 border-gray-400 py-2 lg:py-5">
                <article>
                  <h2 className="text-[20px] font-medium text-gray-800 my-2 rounded-md">
                    Reviews ({reviews?.data?.length})
                  </h2>
                  <p className="text-gray-500 text-wrap font-normal tracking-tight leading-4 text-xs lg:text-sm">
                    Get specific details about this product from customers who
                    own it.
                  </p>
                </article>
                <div className="flex items-center justify-center">
                  <button
                    onClick={handleOpenToReview}
                    className="relative rounded px-3 py-[2px] lg:py-2 overflow-hidden group bg-secondary hover:bg-gradient-to-r hover:from-primaryColor hover:to-successColor text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-in-outout duration-300"
                  >
                    Write Reviews
                  </button>
                </div>
              </div>
              {reviews?.data?.length > 0 ? (
                <div className="mb-5">
                  {reviews?.data
                    ?.slice(startReviewIndex, endReviewIndex)
                    ?.map((review) => (
                      <div
                        key={review?._id}
                        className="container flex flex-col w-full p-6 mx-auto divide-y rounded-md"
                      >
                        <div className="flex justify-between p-4">
                          <div className="flex items-center space-x-4">
                            <div>
                              <Image
                                src="https://source.unsplash.com/100x100/?portrait"
                                alt="avater"
                                title="avater"
                                width={48}
                                height={48}
                                className="object-cover w-12 h-12 rounded-full bg-gray-500"
                                loading="lazy"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-0">
                                {review?.review_user_id?.user_name}
                              </h4>
                              <span className="text-xs">
                                {formatDate(review?.createdAt)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              className="w-5 h-5 fill-current text-yellow-500"
                            >
                              <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                            </svg>
                            <span className="text-xl font-medium">
                              {review?.review_ratting}
                            </span>
                          </div>
                        </div>
                        <div className="p-4 space-y-2 text-sm">
                          {review?.review_description}
                        </div>
                      </div>
                    ))}
                  {reviews?.data?.length > 10 && (
                    <div className="flex justify-end">
                      <FrontPagination
                        currentPage={currentReviewPage}
                        totalPages={totalReviewPages}
                        itemsPerPage={5}
                        onPageChange={handleReviewPageChange}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center h-[200px] lg:h-[300px]">
                  <span className="w-10 lg:w-20 h-10 lg:h-20 rounded-full bg-secondary flex items-center justify-center">
                    <RiFileListLine className="text-white text-2xl lg:text-5xl" />
                  </span>
                  <p className="text-gray-700 text-wrap font-normal tracking-tight leading-4 mt-5">
                    This product has no reviews yet. Be the first one to write a
                    review.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="flex flex-col md:flex-row lg:flex-col gap-4">
          {relatedProducts?.data?.length > 0 && (
            <section className="bg-white rounded-md shadow">
              <h5 className="text-center py-3 border-b-2 border-gray-400 tracking-normal font-normal">
                Related Products
              </h5>
              <div className="space-y-2">
                {relatedProducts?.data?.slice(0, 5)?.map((product) => (
                  <div
                    key={product?._id}
                    className="flex items-center gap-2 px-1 border-b py-2"
                  >
                    <div className="w-[100px] h-[100px] shrink-0">
                      <Image
                        width={100}
                        height={100}
                        src={product?.product_thumbnail}
                        alt={product?.product_name}
                        title={product?.product_name}
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/${product?.product_slug}`}
                        className="hover:underline hover:text-secondary"
                      >
                        <h6 className="text-sm text-wrap tracking-tight line-clamp-2">
                          {product?.product_name}
                        </h6>
                      </Link>
                      <p className="text-secondary text-lg font-medium">
                        <span>
                          {product?.product_ecommerce_price
                            ? numberWithCommas(product?.product_ecommerce_price)
                            : product?.product_discount_price
                            ? numberWithCommas(product?.product_discount_price)
                            : numberWithCommas(product?.product_price)}
                        </span>
                        <span>৳</span>
                      </p>
                      <button
                        onClick={() => {
                          const isAdded = compareProducts?.find(
                            (comItem) => comItem?._id === product?._id
                          );
                          if (isAdded) {
                            toast.info(
                              "Already This product Added for Compare!"
                            );
                          } else if (compareProducts?.length === 4) {
                            toast.error(
                              "You can Added Maximum 4 Products! at a same time"
                            );
                          } else {
                            dispatch(addToCompare(product));
                            toast.success(
                              "Successfully Added for compare Product!"
                            );
                          }
                        }}
                        className="my-1 group"
                      >
                        <BiAddToQueue className="text-xl inline mr-1 group-hover:scale-105 transition-all duration-300" />
                        <span className="tracking-tighter">Add To Compare</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {recentViewProducts?.length > 1 && (
            <section className="bg-white rounded-md shadow">
              <h5 className="text-center py-3 border-b-2 border-gray-400 tracking-normal font-normal">
                Recently Viewed
              </h5>
              <div className="space-y-2">
                {recentViewProducts
                  ?.filter((item) => item?._id !== product?._id)
                  .map((product) => (
                    <div
                      key={product?._id}
                      className="flex gap-2 px-1 border-b py-2"
                    >
                      <div className="w-[100px] h-[100px] shrink-0">
                        <Image
                          width={100}
                          height={100}
                          src={product?.product_thumbnail}
                          alt={product?.product_name}
                          title={product?.product_name}
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/${product?.product_slug}`}
                          className="hover:underline hover:text-secondary"
                        >
                          <h6 className="text-sm text-wrap tracking-tight line-clamp-2">
                            {product?.product_name}
                          </h6>
                        </Link>
                        <p className="text-secondary text-lg font-medium">
                          <span>
                            {product?.product_ecommerce_price
                              ? numberWithCommas(
                                  product?.product_ecommerce_price
                                )
                              : product?.product_discount_price
                              ? numberWithCommas(
                                  product?.product_discount_price
                                )
                              : numberWithCommas(product?.product_price)}
                          </span>
                          <span>৳</span>
                        </p>
                        <button
                          onClick={() => {
                            const isAdded = compareProducts?.find(
                              (comItem) => comItem?._id === product?._id
                            );
                            if (isAdded) {
                              toast.info(
                                "Already This product Added for Compare!"
                              );
                            } else if (compareProducts?.length === 4) {
                              toast.error(
                                "You can Added Maximum 4 Products! at a same time"
                              );
                            } else {
                              dispatch(addToCompare(product));
                              toast.success(
                                "Successfully Added for compare Product!"
                              );
                            }
                          }}
                          className="mb-2 group"
                        >
                          <BiAddToQueue className="text-xl inline mr-1 group-hover:scale-105 transition-all duration-300" />
                          <span className="tracking-tighter">
                            Add To Compare
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {openReviewModal && (
        <ReviewModal
          product={product}
          openReviewModal={openReviewModal}
          setOpenReviewModal={setOpenReviewModal}
        />
      )}

      {openQuestionModal && (
        <QuestionModal
          product={product}
          setOpenQuestionModal={setOpenQuestionModal}
        />
      )}
    </>
  );
};

export default ProductDetails;
