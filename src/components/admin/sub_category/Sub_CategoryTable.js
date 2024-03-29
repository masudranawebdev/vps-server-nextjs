"use client";

import BigSpinner from "@/components/common/loader/BigSpinner";
import NoDataFound from "@/components/common/noDataFound/NoDataFound";
import Pagination from "@/components/common/pagination/Pagination";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { CiSquarePlus } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import AddSub_Category from "./AddSub_Category";
import DeleteSub_Category from "./DeleteSub_Category";
import UpdateSub_Category from "./UpdateSub_Category";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const Sub_CategoryTable = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [allSub_Categories, setAllSub_Categories] = useState();

  const [openAddSub_CategoryModal, setOpenAddSub_CategoryModal] =
    useState(false);
  const [openDeleteSub_CategoryModal, setOpenDeleteSub_CategoryModal] =
    useState(false);
  const [
    openDeleteSub_CategoryModalValue,
    setOpenDeleteSub_CategoryModalValue,
  ] = useState();
  const [openUpdateSub_CategoryModal, setOpenUpdateSub_CategoryModal] =
    useState(false);
  const [
    openUpdateSub_CategoryModalValue,
    setOpenUpdateSub_CategoryModalValue,
  ] = useState();

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const {
    data: Sub_categories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/sub_category/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/sub_category/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setAllSub_Categories(data);
      return data;
    },
  }); // get all sub_category

  const [serialNumber, setSerialNumber] = useState();
  useEffect(() => {
    const newSerialNumber = (page - 1) * rows;
    setSerialNumber(newSerialNumber);
  }, [page, rows]);

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
      <div className="flex items-center justify-between my-5 gap-2">
        <div className="flex items-center gap-2 rounded-xl border border-[#E7E7E7] bg-gray-50 px-[5px] py-2">
          <BiSearch className="text-[#717171]" size={20} />
          <input
            onKeyDown={(e) => handleSearch(e)}
            type="text"
            placeholder="Search..."
            className="bg-gray-50 bg-none w-full outline-none text-[14px] font-semibold placeholder-[#717171]"
          />
        </div>
        <div>
          <button
            onClick={() =>
              setOpenAddSub_CategoryModal(!openAddSub_CategoryModal)
            }
            className="btn bg-secondary hover:bg-secondary px-5 py-2 text-white border border-gray-300 rounded-lg flex items-center gap-2"
          >
            Add <CiSquarePlus className="text-white" size={25} />{" "}
          </button>
        </div>
      </div>
      {/* Table for showing data */}
      {allSub_Categories?.data?.length > 0 ? (
        <div className="overflow-x-auto capitalize">
          {/* Show all user */}
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  #
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Logo
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Serial
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Status
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Create-Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Category Name
                </th>
                <th className="px-4 py-2 text-center font-semibold text-gray-900 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {allSub_Categories?.data?.map((sub_category, i) => (
                <tr key={sub_category?._id}>
                  <td className="whitespace-nowrap px-4 py-2">
                    {serialNumber + i + 1}
                  </td>
                  {sub_category?.sub_category_logo ? (
                    <td className="whitespace-nowrap px-4 py-2">
                      <Image
                        src={sub_category?.sub_category_logo}
                        alt=""
                        height={50}
                        width={50}
                      />
                    </td>
                  ) : (
                    <td className="whitespace-nowrap px-4 py-2">N/A</td>
                  )}
                  <td className="whitespace-nowrap px-4 py-2">
                    {sub_category?.sub_category_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase">
                    {sub_category?.sub_category_serial}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {sub_category?.sub_category_status}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {formatDate(sub_category?.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {sub_category?.category_id?.category_name}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 flex justify-center mt-3 gap-4">
                    <FaTrashAlt
                      onClick={() => {
                        setOpenDeleteSub_CategoryModal(
                          !openDeleteSub_CategoryModal
                        );
                        setOpenDeleteSub_CategoryModalValue(sub_category);
                      }}
                      className="cursor-pointer text-red-500 hover:text-red-400"
                      size={25}
                    />
                    <FiEdit
                      onClick={() => {
                        setOpenUpdateSub_CategoryModal(
                          !openUpdateSub_CategoryModal
                        );
                        setOpenUpdateSub_CategoryModalValue(sub_category);
                      }}
                      className="cursor-pointer text-successColor hover:text-successColor"
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
        totalData={Sub_categories?.totalData}
      />

      {/* Handle open addSub_Category */}
      {openAddSub_CategoryModal && (
        <AddSub_Category
          refetch={refetch}
          setOpenAddSub_CategoryModal={setOpenAddSub_CategoryModal}
        />
      )}

      {/* Handle open delete modal */}
      {openDeleteSub_CategoryModal && (
        <DeleteSub_Category
          refetch={refetch}
          setOpenDeleteSub_CategoryModal={setOpenDeleteSub_CategoryModal}
          openDeleteSub_CategoryModalValue={openDeleteSub_CategoryModalValue}
        />
      )}

      {/* Handle open Update modal */}
      {openUpdateSub_CategoryModal && (
        <UpdateSub_Category
          refetch={refetch}
          setOpenUpdateSub_CategoryModal={setOpenUpdateSub_CategoryModal}
          openUpdateSub_CategoryModalValue={openUpdateSub_CategoryModalValue}
        />
      )}
    </div>
  );
};

export default Sub_CategoryTable;
