"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoIosSettings, IoMdHome } from "react-icons/io";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { BsFillQuestionOctagonFill } from "react-icons/bs";
import { RiCouponLine } from "react-icons/ri";
import Image from "next/image";
import {
  TbBrandNexo,
  TbCategoryMinus,
  TbCategoryPlus,
  TbFilterEdit,
} from "react-icons/tb";
import { FaBahai, FaFilter } from "react-icons/fa";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import {
  MdCampaign,
  MdLocalOffer,
  MdOutlineAddShoppingCart,
  MdPeople,
} from "react-icons/md";
import { IoCart } from "react-icons/io5";
import { VscPreview } from "react-icons/vsc";
import { FaCartFlatbed, FaComputer } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import BigSpinner from "@/components/common/loader/BigSpinner";
import { BASE_URL } from "@/utils/baseURL";

const MiniSidebar = () => {
  const pathName = usePathname();
  const {
    data: siteSetting = [],
    isLoading
  } = useQuery({
    queryKey: [
      '/api/v1/site_setting',
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/site_setting`
      );
      const data = await res.json();
      return data;
    },
  }); // get all site setting
  const [isTasksOpen, setIsTasksOpen] = useState(
    pathName === "/admin/category" ||
    pathName === "/admin/sub-category" ||
    pathName === "/admin/child-category" ||
    pathName === "/admin/filter" ||
    pathName === "/admin/child-filter" ||
    pathName === "/admin/brand" ||
    pathName === "/admin/specification"
  );

  const [isProductOpen, setIsProductOpen] = useState(
    pathName === "/admin/product/product-create" ||
    pathName === "/admin/product/product-list"
  );

  if (isLoading) {
    return <BigSpinner />
  }

  return (
    <div className="flex flex-col flex-shrink-0 antialiased text-white bg-primaryColor min-h-screen">
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <div className="flex flex-wrap items-center justify-center mt-1 border-b pb-3">
          <Link href="/">
            <Image
              src={siteSetting?.data?.[0]?.logo}
              alt="Logo"
              width={200}
              height={100}
              className="object-fill"
              loading="lazy"
            />
          </Link>
        </div>
        <ul className="flex flex-col pb-4 space-y-1 list-none">
          <li>
            <Link
              href="/admin"
              className={
                pathName == "/admin"
                  ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-successColor pr-6 bg-secondary"
                  : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white hover:text-white border-r-4 border-transparent hover:border-successColor pr-6"
              }
            >
              <span className="ml-3">
                <IoMdHome size={20} className="text-white" />
              </span>
              <span className=" tracking-wide truncate ml-1">Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin/order"
              className={
                pathName == "/admin/order"
                  ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-successColor pr-6 bg-secondary"
                  : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white hover:text-white border-r-4 border-transparent hover:border-successColor pr-6"
              }
            >
              <span className="ml-3">
                <FaCartFlatbed size={20} className="text-white" />
              </span>
              <span className=" tracking-wide truncate ml-1">Order</span>
            </Link>
          </li>

          <li>
            <details
              open={isTasksOpen}
              className="group [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700">
                <span className="text-sm font-medium"> Tasks </span>

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
              <ul className="space-y-1 list-none">
                <li>
                  <Link
                    href="/admin/category"
                    className={
                      pathName == "/admin/category"
                        ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-successColor pr-6 bg-secondary"
                        : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white hover:text-white border-r-4 border-transparent hover:border-successColor pr-6"
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-6">
                      <BiSolidCategoryAlt />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Category
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/admin/sub-category"
                    className={
                      pathName == "/admin/sub-category"
                        ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-successColor pr-6 bg-secondary"
                        : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white hover:text-white border-r-4 border-transparent hover:border-successColor pr-6"
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-6">
                      <TbCategoryPlus />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Sub Category
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/admin/child-category"
                    className={
                      pathName == "/admin/child-category"
                        ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-successColor pr-6 bg-secondary"
                        : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white hover:text-white border-r-4 border-transparent hover:border-successColor pr-6"
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-6">
                      <TbCategoryMinus />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Child Category
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/admin/filter"
                    className={
                      pathName == "/admin/filter"
                        ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-successColor pr-6 bg-secondary"
                        : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white hover:text-white border-r-4 border-transparent hover:border-successColor pr-6"
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-6">
                      <FaFilter />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Filter
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/admin/child-filter"
                    className={
                      pathName == "/admin/child-filter"
                        ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-successColor pr-6 bg-secondary"
                        : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white hover:text-white border-r-4 border-transparent hover:border-successColor pr-6"
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-6">
                      <TbFilterEdit />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Child Filter
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/admin/brand"
                    className={
                      pathName == "/admin/brand"
                        ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-successColor pr-6 bg-secondary"
                        : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white hover:text-white border-r-4 border-transparent hover:border-successColor pr-6"
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-6">
                      <TbBrandNexo />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Brand
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/admin/specification"
                    className={
                      pathName == "/admin/specification"
                        ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-successColor pr-6 bg-secondary"
                        : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white hover:text-white border-r-4 border-transparent hover:border-successColor pr-6"
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-6">
                      <GiPerspectiveDiceSixFacesRandom />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Specification
                    </span>
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details
              open={isProductOpen}
              className="group [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-white hover:bg-gray-100 hover:text-gray-700">
                <span className="text-sm font-medium"> Products </span>

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
              <ul className="mt-2 space-y-1 list-none">
                <li>
                  <Link
                    href="/admin/product/product-list"
                    className={
                      pathName == "/admin/product/product-list"
                        ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-successColor pr-6 bg-secondary"
                        : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white hover:text-white border-r-4 border-transparent hover:border-successColor pr-6"
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-6">
                      <IoCart />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Product List
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/product/product-create"
                    className={
                      pathName == "/admin/product/product-create"
                        ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-successColor pr-6 bg-secondary"
                        : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white hover:text-white border-r-4 border-transparent hover:border-successColor pr-6"
                    }
                  >
                    <span className="inline-flex justify-center items-center ml-6">
                      <MdOutlineAddShoppingCart />
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate">
                      Add Product
                    </span>
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <Link
              href="/admin/pc-builder"
              className={
                pathName == "/admin/pc-builder"
                  ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-successColor pr-6 bg-secondary"
                  : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white hover:text-white border-r-4 border-transparent hover:border-successColor pr-6"
              }
            >
              <span className="ml-3">
                <FaComputer size={20} className="text-white" />
              </span>
              <span className=" tracking-wide truncate ml-1">Pc Builder</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin/user"
              className={
                pathName == "/admin/user"
                  ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-successColor pr-6 bg-secondary"
                  : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white hover:text-white border-r-4 border-transparent hover:border-successColor pr-6"
              }
            >
              <span className="ml-3">
                <MdPeople size={20} className="text-white" />
              </span>
              <span className=" tracking-wide truncate ml-1">Users</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin/review"
              className={
                pathName == "/admin/review"
                  ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-successColor pr-6 bg-secondary"
                  : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white hover:text-white border-r-4 border-transparent hover:border-successColor pr-6"
              }
            >
              <span className="ml-3">
                <VscPreview size={20} className="text-white" />
              </span>
              <span className=" tracking-wide truncate ml-1">Review</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin/question"
              className={
                pathName == "/admin/question"
                  ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-successColor pr-6 bg-secondary"
                  : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white hover:text-white border-r-4 border-transparent hover:border-successColor pr-6"
              }
            >
              <span className="ml-3">
                <BsFillQuestionOctagonFill size={20} className="text-white" />
              </span>
              <span className=" tracking-wide truncate ml-1">Question</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin/campaign"
              className={
                pathName == "/admin/campaign"
                  ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-successColor pr-6 bg-secondary"
                  : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white hover:text-white border-r-4 border-transparent hover:border-successColor pr-6"
              }
            >
              <span className="ml-3">
                <MdCampaign size={20} className="text-white" />
              </span>
              <span className=" tracking-wide truncate ml-1">Campaign</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin/hot-deal"
              className={
                pathName == "/admin/hot-deal"
                  ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-successColor pr-6 bg-secondary"
                  : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white hover:text-white border-r-4 border-transparent hover:border-successColor pr-6"
              }
            >
              <span className="ml-3">
                <FaBahai size={20} className="text-white" />
              </span>
              <span className=" tracking-wide truncate ml-1">Hot Deal</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin/offer"
              className={
                pathName == "/admin/offer"
                  ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-successColor pr-6 bg-secondary"
                  : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white hover:text-white border-r-4 border-transparent hover:border-successColor pr-6"
              }
            >
              <span className="ml-3">
                <MdLocalOffer size={20} className="text-white" />
              </span>
              <span className=" tracking-wide truncate ml-1">Offer</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin/coupon"
              className={
                pathName == "/admin/coupon"
                  ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-successColor pr-6 bg-secondary"
                  : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white hover:text-white border-r-4 border-transparent hover:border-successColor pr-6"
              }
            >
              <span className="ml-3">
                <RiCouponLine size={20} className="text-white" />
              </span>
              <span className="tracking-wide truncate ml-1">Coupons</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin/banner"
              className={
                pathName == "/admin/banner"
                  ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-successColor pr-6 bg-secondary"
                  : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white hover:text-white border-r-4 border-transparent hover:border-successColor pr-6"
              }
            >
              <span className="ml-3">
                <TfiLayoutSliderAlt size={20} className="text-white" />
              </span>
              <span className=" tracking-wide truncate ml-1">Banner</span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin/setting"
              className={
                pathName == "/admin/setting"
                  ? "relative flex flex-row items-center h-11 focus:outline-none text-white hover:text-white border-r-4 border-successColor pr-6 bg-secondary"
                  : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-secondary text-white hover:text-white border-r-4 border-transparent hover:border-successColor pr-6"
              }
            >
              <span className="ml-3">
                <IoIosSettings size={20} className="text-white" />
              </span>
              <span className=" tracking-wide truncate ml-1">Setting</span>
            </Link>
          </li>
        </ul>
      </div>
      {/* </div> */}
    </div>
  );
};

export default MiniSidebar;
