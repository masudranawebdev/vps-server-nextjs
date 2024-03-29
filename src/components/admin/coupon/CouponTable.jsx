"use client";
import Pagination from "@/components/common/pagination/Pagination";
import { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import AddCoupon from "./AddCoupon";
import DeleteCoupon from "./DeleteCoupon";
import UpdateCoupon from "./UpdateCoupon";
import { useQuery } from "@tanstack/react-query";
import useDebounced from "@/hooks/useDebounced";
import { BASE_URL } from "@/utils/baseURL";
// import { MdRemoveRedEye } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import BigSpinner from "@/components/common/loader/BigSpinner";
import CouponViewProducts from "./CouponViewProducts";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const CouponTable = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [openAddCouponModal, setOpenAddCouponModal] = useState(false);
  const [openDeleteCouponModal, setOpenDeleteCouponModal] = useState(false);
  const [openDeleteCouponModalId, setOpenDeleteCouponModalId] = useState(false);
  const [openUpdateCouponModal, setOpenUpdateCouponModal] = useState(false);
  const [openUpdateCouponModalValue, setOpenUpdateCouponModalValue] =
    useState(null);

  const [openViewCouponModal, setOpenViewCouponModal] = useState(false);
  const [openViewCouponModalValue, setOpenViewCouponModalValue] =
    useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const searchText = useDebounced({ searchQuery: searchValue, delay: 500 });
  useEffect(() => {
    setSearchTerm(searchText);
  }, [searchText]);

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const {
    data: coupons = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/coupon/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/coupon/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
      );
      const data = await res.json();
      return data;
    },
  }); // get all campaign

  const [serialNumber, setSerialNumber] = useState();
  useEffect(() => {
    const newSerialNumber = (page - 1) * rows;
    setSerialNumber(newSerialNumber);
  }, [page, rows]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="bg-white p-2 rounded mt-5">
      {/* Search and create */}
      <div className="flex items-center justify-between my-5 gap-2">
        <div className="flex items-center gap-2 rounded border border-[#E7E7E7] bg-gray-50 px-[5px] py-2">
          <BiSearch className="text-[#717171]" size={20} />
          <input
            onChange={(e) => handleSearch(e)}
            type="search"
            placeholder="Search..."
            className="bg-gray-50 bg-none w-full outline-none text-[14px] font-semibold placeholder-[#717171]"
          />
        </div>
        <button
          onClick={() => setOpenAddCouponModal(true)}
          className="btn bg-secondary hover:bg-secondary px-5 py-2 text-white border border-gray-300 rounded flex items-center gap-2"
        >
          Add <CiSquarePlus className="text-white" size={25} />{" "}
        </button>
      </div>
      {/* Table for showing data */}
      <div className="overflow-x-auto capitalize">
        {/* Show all user */}
        {isLoading ? (
          <BigSpinner />
        ) : (
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm border">
            <thead className="">
              <tr className="text-center">
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-center border">
                  #
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-center border">
                  Coupon Code
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-center border">
                  Start Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-center border">
                  End Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-center border">
                  Amount
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-center border">
                  Amount Type
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-center border">
                  Use Per Person
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-center border">
                  Use Total Person
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-center border">
                  Coupon Available
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-center border">
                  Status
                </th>
                <th className="px-4 py-2 text-center font-semibold text-gray-900 whitespace-nowrap border">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {coupons?.data?.length > 0 ? (
                coupons?.data?.map((coupon, i) => (
                  <tr key={coupon?._id}>
                    <td className="whitespace-nowrap px-4 py-2 border text-center">
                      {serialNumber + i + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border text-center">
                      {coupon?.coupon_code}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border text-center">
                      {coupon?.coupon_start_date}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border text-center">
                      {coupon?.coupon_end_date}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border text-center">
                      {coupon?.coupon_amount}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border text-center">
                      {coupon?.coupon_type}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border text-center">
                      {coupon?.coupon_use_per_person}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border text-center">
                      {coupon?.coupon_use_total_person}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 border text-center">
                      {coupon?.coupon_available}
                    </td>

                    <td className="whitespace-nowrap px-4 py-2 border text-center">
                      {coupon?.coupon_status}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 flex justify-center mt-3 gap-4">
                      {/* <MdRemoveRedEye
                        data-tooltip-id={`${
                          coupon?.coupon_products_type === "specific" &&
                          "view-products"
                        }`}
                        data-tooltip-content={`${
                          coupon?.coupon_products_type === "specific" &&
                          "View Products"
                        }`}
                        onClick={() => {
                          if (
                            coupon &&
                            coupon?.coupon_products_type === "specific"
                          ) {
                            setOpenViewCouponModal(!openViewCouponModal);
                            setOpenViewCouponModalValue(coupon);
                          }
                        }}
                        className={`${
                          coupon?.coupon_products_type === "specific"
                            ? "text-secondary text-opacity-80 cursor-pointer "
                            : "text-gray-700 hover:text-gray-600"
                        }`}
                        size={25}
                      /> */}
                      <FaTrashAlt
                        onClick={() => {
                          setOpenDeleteCouponModal(true);
                          setOpenDeleteCouponModalId(coupon?._id);
                        }}
                        className="cursor-pointer text-red-500 hover:text-red-400"
                        size={25}
                      />
                      <FiEdit
                        onClick={() => {
                          setOpenUpdateCouponModal(!openUpdateCouponModal);
                          setOpenUpdateCouponModalValue(coupon);
                        }}
                        className="cursor-pointer text-successColor hover:text-successColor"
                        size={25}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center border">
                  <td colSpan={6} className="text-danger text-xl py-5">
                    There is no data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        rows={rows}
        page={page}
        setPage={setPage}
        setRows={setRows}
        totalData={coupons?.totalData}
      />

      {/* Handle open addCoupon */}
      {openAddCouponModal && (
        <AddCoupon
          refetch={refetch}
          setOpenAddCouponModal={setOpenAddCouponModal}
        />
      )}

      {/* Handle open view Campaign*/}
      {openViewCouponModal && (
        <CouponViewProducts
          setOpenViewCouponModal={setOpenViewCouponModal}
          openViewCouponModalValue={openViewCouponModalValue}
        />
      )}

      {/* Handle open delete modal */}
      {openDeleteCouponModal && (
        <DeleteCoupon
          refetch={refetch}
          setOpenDeleteCouponModal={setOpenDeleteCouponModal}
          openDeleteCouponModalId={openDeleteCouponModalId}
        />
      )}

      {/* Handle open Update modal */}
      {openUpdateCouponModal && (
        <UpdateCoupon
          refetch={refetch}
          setOpenUpdateCouponModal={setOpenUpdateCouponModal}
          openUpdateCouponModalValue={openUpdateCouponModalValue}
        />
      )}
      <ReactTooltip id="view-products" />
    </div>
  );
};

export default CouponTable;
