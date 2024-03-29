"use client";

import BigSpinner from "@/components/common/loader/BigSpinner";
import NoDataFound from "@/components/common/noDataFound/NoDataFound";
import Pagination from "@/components/common/pagination/Pagination";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { CiSquarePlus } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import AddSpecification from "./AddSpecification";
import DeleteSpecification from "./DeleteSpecification";
import UpdateSpecification from "./UpdateSpecification";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const SpecificationTable = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [allSpecifications, setAllSpecifications] = useState();

  const [openAddSpecificationModal, setOpenAddSpecificationModal] =
    useState(false);
  const [openDeleteSpecificationModal, setOpenDeleteSpecificationModal] =
    useState(false);
  const [
    openDeleteSpecificationModalValue,
    setOpenDeleteSpecificationModalValue,
  ] = useState();
  const [openUpdateSpecificationModal, setOpenUpdateSpecificationModal] =
    useState(false);
  const [
    openUpdateSpecificationModalValue,
    setOpenUpdateSpecificationModalValue,
  ] = useState();

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const {
    data: specifications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/specification?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/specification?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setAllSpecifications(data);
      return data;
    },
  }); // get all specification

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
              setOpenAddSpecificationModal(!openAddSpecificationModal)
            }
            className="btn bg-secondary hover:bg-secondary px-5 py-2 text-white border border-gray-300 rounded-lg flex items-center gap-2"
          >
            Add <CiSquarePlus className="text-white" size={25} />{" "}
          </button>
        </div>
      </div>
      {/* Table for showing data */}
      {allSpecifications?.data?.length > 0 ? (
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
                  Slug
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Serial
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
              {allSpecifications?.data?.map((specification, i) => (
                <tr key={specification?._id}>
                  <td className="whitespace-nowrap px-4 py-2">
                    {serialNumber + i + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {specification?.specification_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase">
                    {specification?.specification_slug}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase">
                    {specification?.specification_serial}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {formatDate(specification?.createdAt)}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 flex justify-center mt-3 gap-4">
                    <FaTrashAlt
                      onClick={() => {
                        setOpenDeleteSpecificationModal(
                          !openDeleteSpecificationModal
                        );
                        setOpenDeleteSpecificationModalValue(specification);
                      }}
                      className="cursor-pointer text-red-500 hover:text-red-400"
                      size={25}
                    />
                    <FiEdit
                      onClick={() => {
                        setOpenUpdateSpecificationModal(
                          !openUpdateSpecificationModal
                        );
                        setOpenUpdateSpecificationModalValue(specification);
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
        totalData={specifications?.totalData}
      />

      {/* Handle open addSpecification */}
      {openAddSpecificationModal && (
        <AddSpecification
          refetch={refetch}
          setOpenAddSpecificationModal={setOpenAddSpecificationModal}
        />
      )}

      {/* Handle open delete modal */}
      {openDeleteSpecificationModal && (
        <DeleteSpecification
          refetch={refetch}
          setOpenDeleteSpecificationModal={setOpenDeleteSpecificationModal}
          openDeleteSpecificationModalValue={openDeleteSpecificationModalValue}
        />
      )}

      {/* Handle open Update modal */}
      {openUpdateSpecificationModal && (
        <UpdateSpecification
          refetch={refetch}
          setOpenUpdateSpecificationModal={setOpenUpdateSpecificationModal}
          openUpdateSpecificationModalValue={openUpdateSpecificationModalValue}
        />
      )}
    </div>
  );
};

export default SpecificationTable;
