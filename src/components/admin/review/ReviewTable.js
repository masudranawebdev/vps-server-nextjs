/* eslint-disable react/prop-types */
"use client";

import BigSpinner from "@/components/common/loader/BigSpinner";
import NoDataFound from "@/components/common/noDataFound/NoDataFound";
import Pagination from "@/components/common/pagination/Pagination";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { IoEye } from "react-icons/io5";
import { toast } from "react-toastify";
import { useUpdateReviewMutation } from "@/redux/feature/review/reviewApi";
import DeleteReview from './DeleteReview';
import ViewDescription from './ViewDescription';
import Link from "next/link";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const ReviewTable = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [reviews, setReviews] = useState();

  const [openReviewDescriptionModal, setOpenReviewDescriptionModal] =
    useState(false);
  const [openReviewDescriptionModalValue, setOpenReviewDescriptionModalValue] =
    useState();
  const [openDeleteReviewModal, setOpenDeleteReviewModal] = useState(false);
  const [openDeleteReviewModalValue, setOpenDeleteReviewModalValue] =
    useState();

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const {
    data: allReviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/review/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/review/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setReviews(data);
      return data;
    },
  }); // get all Review

  const [serialNumber, setSerialNumber] = useState();
  useEffect(() => {
    const newSerialNumber = (page - 1) * rows;
    setSerialNumber(newSerialNumber);
  }, [page, rows]);

  // Handle search field
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
    }
  };

  const [updateReviewStatus] = useUpdateReviewMutation(); //Update Review status

  const updateReviewStatusActiveHandle = (_id, review_status) => {
    const sendData = {
      _id,
      review_status,
    };
    updateReviewStatus(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Status Update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message, {
          autoClose: 1000,
        });
      }
    });
  };

  const updateReviewStatusInActive = (_id, review_status) => {
    const sendData = {
      _id,
      review_status,
    };
    updateReviewStatus(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Status Update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message, {
          autoClose: 1000,
        });
      }
    });
  };

  if (isLoading) {
    return <BigSpinner />;
  }

  return (
    <div className="bg-white p-2 rounded-md mt-5">
      {/* Search and create */}
      <div className="flex items-center justify-end my-5 gap-2">
        <div className="flex items-center gap-2 rounded-xl border border-[#E7E7E7] bg-gray-50 px-[5px] py-2">
          <BiSearch className="text-[#717171]" size={20} />
          <input
            onKeyDown={(e) => handleSearch(e)}
            type="text"
            placeholder="Search..."
            className="bg-gray-50 bg-none w-full outline-none text-[14px] font-semibold placeholder-[#717171]"
          />
        </div>
      </div>
      {/* Table for showing data */}
      {reviews?.data?.length > 0 ? (
        <div className="overflow-x-auto capitalize">
          {/* Show all user */}
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  #
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Email
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Phone
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Product Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Ratting
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Description
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Status
                </th>
                <th className="px-4 py-2 text-center font-semibold text-gray-900 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {reviews?.data?.map((review, i) => (
                <tr key={review?._id}>
                  <td className="whitespace-nowrap px-4 py-2">
                    {serialNumber + i + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {review?.review_user_id?.user_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase">
                    {review?.review_user_id?.user_email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase">
                    {review?.review_user_phone}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase">
                    {review?.review_product_id?.product_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase">
                    {review?.review_ratting}
                  </td>
                  <td className="whitespace-pre-wrap px-4 py-2">
                    <IoEye
                      className="cursor-pointer text-sky-500 hover:text-sky-400"
                      size={25}
                      onClick={() => {
                        setOpenReviewDescriptionModal(
                          !openReviewDescriptionModal
                        );
                        setOpenReviewDescriptionModalValue(review);
                      }}
                    />
                  </td>
                  {review?.review_status == "in-active" ? (
                    <td className="whitespace-nowrap px-4 py-2">
                      <button
                        onClick={() =>
                          updateReviewStatusActiveHandle(review?._id, "active")
                        }
                        className="btn bg-red-500 text-white border rounded-md px-2 py-1"
                      >
                        Active ?
                      </button>
                    </td>
                  ) : (
                    <td className="whitespace-nowrap px-4 py-2">
                      <button
                        onClick={() =>
                          updateReviewStatusInActive(review?._id, "in-active")
                        }
                        className="btn bg-green-500 text-white border rounded-md px-2 py-1"
                      >
                        Active
                      </button>
                    </td>
                  )}

                  <td className="whitespace-nowrap px-4 py-2 flex justify-center mt-3 gap-4 items-center">
                    <Link href={`/${review?.review_product_id?.product_slug}`}>
                      <IoEye
                        className="cursor-pointer text-sky-500 hover:text-sky-400"
                        size={25}
                      />
                    </Link>
                    <FaTrashAlt
                      onClick={() => {
                        setOpenDeleteReviewModal(!openDeleteReviewModal);
                        setOpenDeleteReviewModalValue(review);
                      }}
                      className="cursor-pointer text-red-500 hover:text-red-400"
                      size={25}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoDataFound />
      )}

      <hr />

      {/* Pagination */}
      <Pagination
        rows={rows}
        page={page}
        setPage={setPage}
        setRows={setRows}
        totalData={allReviews?.totalData}
      />
      {/* Handle open view description modal */}
      {openReviewDescriptionModal && (
        <ViewDescription
          setOpenReviewDescriptionModal={setOpenReviewDescriptionModal}
          openReviewDescriptionModalValue={openReviewDescriptionModalValue}
        />
      )}
      {/* Handle open delete modal */}
      {openDeleteReviewModal && (
        <DeleteReview
          refetch={refetch}
          setOpenDeleteReviewModal={setOpenDeleteReviewModal}
          openDeleteReviewModalValue={openDeleteReviewModalValue}
        />
      )}
    </div>
  );
};

export default ReviewTable;
