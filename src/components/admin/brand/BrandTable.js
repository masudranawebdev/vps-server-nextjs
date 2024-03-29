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
import AddBrand from "./AddBrand";
import DeleteBrand from "./DeleteBrand";
import UpdateBrand from "./UpdateBrand";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const BrandTable = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [allBrands, setAllBrands] = useState();

  const [openAddBrandModal, setOpenAddBrandModal] = useState(false);
  const [openDeleteBrandModal, setOpenDeleteBrandModal] = useState(false);
  const [openDeleteBrandModalValue, setOpenDeleteBrandModalValue] = useState();
  const [openUpdateBrandModal, setOpenUpdateBrandModal] = useState(false);
  const [openUpdateBrandModalValue, setOpenUpdateBrandModalValue] = useState();

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const {
    data: brands = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/brand?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/brand?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setAllBrands(data);
      return data;
    },
  }); // get all brands

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
            onClick={() => setOpenAddBrandModal(true)}
            className="btn bg-secondary hover:bg-secondary px-5 py-2 text-white border border-gray-300 rounded-lg flex items-center gap-2"
          >
            Add <CiSquarePlus className="text-white" size={25} />{" "}
          </button>
        </div>
      </div>
      {/* Table for showing data */}
      {allBrands?.data?.length > 0 ? (
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
              {allBrands?.data?.map((brand, i) => (
                <tr key={brand?._id}>
                  <td className="whitespace-nowrap px-4 py-2">
                    {serialNumber + i + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {brand?.brand_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {formatDate(brand?.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {brand?.category_id?.category_name}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 flex justify-center mt-3 gap-4">
                    <FaTrashAlt
                      onClick={() => {
                        setOpenDeleteBrandModal(!openDeleteBrandModal);
                        setOpenDeleteBrandModalValue(brand);
                      }}
                      className="cursor-pointer text-red-500 hover:text-red-400"
                      size={25}
                    />
                    <FiEdit
                      onClick={() => {
                        setOpenUpdateBrandModal(true);
                        setOpenUpdateBrandModalValue(brand);
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
        totalData={brands?.totalData}
      />

      {/* Handle open add filter */}
      {openAddBrandModal && (
        <AddBrand
          refetch={refetch}
          setOpenAddBrandModal={setOpenAddBrandModal}
        />
      )}

      {/* Handle open delete modal */}
      {openDeleteBrandModal && (
        <DeleteBrand
          refetch={refetch}
          setOpenDeleteBrandModal={setOpenDeleteBrandModal}
          openDeleteBrandModalValue={openDeleteBrandModalValue}
        />
      )}

      {/* Handle open Update modal */}
      {openUpdateBrandModal && (
        <UpdateBrand
          refetch={refetch}
          setOpenUpdateBrandModal={setOpenUpdateBrandModal}
          openUpdateBrandModalValue={openUpdateBrandModalValue}
        />
      )}
    </div>
  );
};

export default BrandTable;
