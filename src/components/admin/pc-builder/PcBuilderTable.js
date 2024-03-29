/* eslint-disable react/prop-types */
"use client";

import BigSpinner from "@/components/common/loader/BigSpinner";
import NoDataFound from "@/components/common/noDataFound/NoDataFound";
import Pagination from "@/components/common/pagination/Pagination";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { CiSquarePlus } from "react-icons/ci";
import Image from "next/image";
import AddPC_Builder from "./AddPC_Builder";
import DeletePC_Builder from "./DeletePC_Builder";
import UpdatePC_Builder from "./UpdatePC_Builder";
import { IoEye } from "react-icons/io5";
import ViewPC_Builder from "./ViewPC_Builder";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const PcBuilderTable = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [allPc_Builder, setAllPc_Builder] = useState();

  const [openAddPC_BuilderModal, setOpenAddPC_BuilderModal] = useState(false);
  const [openDeletePC_BuilderModal, setOpenDeletePC_BuilderModal] =
    useState(false);
  const [openDeletePC_BuilderModalValue, setOpenDeletePC_BuilderModalValue] =
    useState();
  const [openUpdatePC_BuilderModal, setOpenUpdatePC_BuilderModal] =
    useState(false);
  const [openUpdatePC_BuilderModalValue, setOpenUpdatePC_BuilderModalValue] =
    useState();
  const [openViewPC_BuilderModal, setOpenViewPC_BuilderModal] = useState(false);
  const [openViewPC_BuilderModalValue, setOpenViewPC_BuilderModalValue] =
    useState();

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const {
    data: pc_builders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/pc_builder/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/pc_builder/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setAllPc_Builder(data);
      return data;
    },
  }); // get all pc builder

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
            onClick={() => setOpenAddPC_BuilderModal(!openAddPC_BuilderModal)}
            className="btn bg-secondary hover:bg-secondary px-5 py-2 text-white border border-gray-300 rounded-lg flex items-center gap-2"
          >
            Add <CiSquarePlus className="text-white" size={25} />{" "}
          </button>
        </div>
      </div>
      {/* Table for showing data */}
      {allPc_Builder?.data?.length > 0 ? (
        <div className="overflow-x-auto capitalize">
          {/* Show all data */}
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
                  Slug
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Serial
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Status
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Required
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Category Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Create-Date
                </th>
                <th className="px-4 py-2 text-center font-semibold text-gray-900 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {allPc_Builder?.data?.map((pc_builder, i) => (
                <tr key={pc_builder?._id}>
                  <td className="whitespace-nowrap px-4 py-2">
                    {serialNumber + i + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <Image
                      src={pc_builder?.pc_builder_logo}
                      alt=""
                      height={50}
                      width={50}
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {pc_builder?.pc_builder_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase">
                    {pc_builder?.pc_builder_slug}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {pc_builder?.pc_builder_serial}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {pc_builder?.pc_builder_status}
                  </td>
                  {pc_builder?.pc_builder_required == true ? (
                    <td className="whitespace-nowrap px-4 py-2">True</td>
                  ) : (
                    <td className="whitespace-nowrap px-4 py-2">False</td>
                  )}
                  <td className="whitespace-nowrap px-4 py-2">
                    {pc_builder?.category_id?.category_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {formatDate(pc_builder?.createdAt)}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 flex justify-center mt-3 gap-4">
                    <IoEye
                      onClick={() => {
                        setOpenViewPC_BuilderModal(!openViewPC_BuilderModal);
                        setOpenViewPC_BuilderModalValue(pc_builder);
                      }}
                      className="cursor-pointer text-sky-500 hover:text-sky-400"
                      size={20}
                    />
                    <FiEdit
                      onClick={() => {
                        setOpenUpdatePC_BuilderModal(
                          !openUpdatePC_BuilderModal
                        );
                        setOpenUpdatePC_BuilderModalValue(pc_builder);
                      }}
                      className="cursor-pointer text-successColor hover:text-successColor"
                      size={25}
                    />
                    <FaTrashAlt
                      onClick={() => {
                        setOpenDeletePC_BuilderModal(
                          !openDeletePC_BuilderModal
                        );
                        setOpenDeletePC_BuilderModalValue(pc_builder);
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
        totalData={pc_builders?.totalData}
      />

      {/* Handle view open modal */}
      {openViewPC_BuilderModal && (
        <ViewPC_Builder
          refetch={refetch}
          setOpenViewPC_BuilderModal={setOpenViewPC_BuilderModal}
          openViewPC_BuilderModalValue={openViewPC_BuilderModalValue}
        />
      )}

      {/* Handle open modal */}
      {openAddPC_BuilderModal && (
        <AddPC_Builder
          refetch={refetch}
          setOpenAddPC_BuilderModal={setOpenAddPC_BuilderModal}
        />
      )}

      {/* Handle open delete modal */}
      {openDeletePC_BuilderModal && (
        <DeletePC_Builder
          refetch={refetch}
          setOpenDeletePC_BuilderModal={setOpenDeletePC_BuilderModal}
          openDeletePC_BuilderModalValue={openDeletePC_BuilderModalValue}
        />
      )}

      {/* Handle open Update modal */}
      {openUpdatePC_BuilderModal && (
        <UpdatePC_Builder
          refetch={refetch}
          setOpenUpdatePC_BuilderModal={setOpenUpdatePC_BuilderModal}
          openUpdatePC_BuilderModalValue={openUpdatePC_BuilderModalValue}
          setOpenUpdatePC_BuilderModalValue={setOpenUpdatePC_BuilderModalValue}
        />
      )}
    </div>
  );
};

export default PcBuilderTable;
