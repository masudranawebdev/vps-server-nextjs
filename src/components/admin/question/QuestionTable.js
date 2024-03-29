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
import { FiEdit } from "react-icons/fi";
import { IoEye } from "react-icons/io5";
import Link from "next/link";
import ViewQuestion from "./ViewQuestion";
import DeleteQuestion from "./DeleteQuestion";
import EditQuestion from "./EditQuestion";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const QuestionTable = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [questions, setQuestions] = useState();

  const [openQuestionDetailsModal, setOpenQuestionDetailsModal] =
    useState(false);
  const [openQuestionDetailsModalValue, setOpenQuestionDetailsModalValue] =
    useState();
  const [openDeleteQuestionModal, setOpenDeleteQuestionModal] = useState(false);
  const [openDeleteQuestionModalValue, setOpenDeleteQuestionModalValue] =
    useState();
  const [openEditQuestionModal, setOpenEditQuestionModal] = useState(false);
  const [openEditQuestionModalValue, setOpenEditQuestionModalValue] =
    useState();

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const {
    data: allQuestions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/question/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/question/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setQuestions(data);
      return data;
    },
  }); // get all Question

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
      {questions?.data?.length > 0 ? (
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
                  Description
                </th>
                <th className="px-4 py-2 text-center font-semibold text-gray-900 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {questions?.data?.map((question, i) => (
                <tr key={question?._id}>
                  <td className="whitespace-nowrap px-4 py-2">
                    {serialNumber + i + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {question?.question_user_id?.user_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase">
                    {question?.question_user_id?.user_email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase">
                    {question?.question_user_phone}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase">
                    {question?.question_product_id?.product_name}
                  </td>
                  <td className="whitespace-pre-wrap px-4 py-2">
                    <IoEye
                      className="cursor-pointer text-sky-500 hover:text-sky-400"
                      size={25}
                      onClick={() => {
                        setOpenQuestionDetailsModal(!openQuestionDetailsModal);
                        setOpenQuestionDetailsModalValue(question);
                      }}
                    />
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 flex justify-center mt-3 gap-4 items-center">
                    <Link
                      href={`/${question?.question_product_id?.product_slug}`}
                    >
                      <IoEye
                        className="cursor-pointer text-sky-500 hover:text-sky-400"
                        size={25}
                      />
                    </Link>
                    <FiEdit
                      onClick={() => {
                        setOpenEditQuestionModal(!openEditQuestionModal);
                        setOpenEditQuestionModalValue(question);
                      }}
                      className="cursor-pointer text-successColor hover:text-successColor"
                      size={25}
                    />
                    <FaTrashAlt
                      onClick={() => {
                        setOpenDeleteQuestionModal(!openDeleteQuestionModal);
                        setOpenDeleteQuestionModalValue(question);
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
        totalData={allQuestions?.totalData}
      />
      {/* Handle open view description modal */}
      {openQuestionDetailsModal && (
        <ViewQuestion
          setOpenQuestionDetailsModal={setOpenQuestionDetailsModal}
          openQuestionDetailsModalValue={openQuestionDetailsModalValue}
        />
      )}
      {/* Handle open delete modal */}
      {openDeleteQuestionModal && (
        <DeleteQuestion
          refetch={refetch}
          setOpenDeleteQuestionModal={setOpenDeleteQuestionModal}
          openDeleteQuestionModalValue={openDeleteQuestionModalValue}
        />
      )}
      {/* Handle open edit modal */}
      {openEditQuestionModal && (
        <EditQuestion
          refetch={refetch}
          setOpenEditQuestionModal={setOpenEditQuestionModal}
          openEditQuestionModalValue={openEditQuestionModalValue}
        />
      )}
    </div>
  );
};

export default QuestionTable;
