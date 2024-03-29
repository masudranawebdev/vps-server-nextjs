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
import AddChild_Category from "./AddChild_Category";
import DeleteChild_Category from "./DeleteChild_Category";
import UpdateChild_Category from "./UpdateChild_Category";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const Child_CategoryTable = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [allChild_Categories, setAllChild_Categories] = useState();

  const [openAddChild_CategoryModal, setOpenAddChild_CategoryModal] =
    useState(false);
  const [openDeleteChild_CategoryModal, setOpenDeleteChild_CategoryModal] =
    useState(false);
  const [
    openDeleteChild_CategoryModalValue,
    setOpenDeleteChild_CategoryModalValue,
  ] = useState();
  const [openUpdateChild_CategoryModal, setOpenUpdateChild_CategoryModal] =
    useState(false);
  const [
    openUpdateChild_CategoryModalValue,
    setOpenUpdateChild_CategoryModalValue,
  ] = useState();

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const {
    data: child_categories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/child_category/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/child_category/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setAllChild_Categories(data);
      return data;
    },
  }); // get all Child_category

  const [serialNumber, setSerialNumber] = useState();
  useEffect(() => {
    const newSerialNumber = (page - 1) * rows;
    setSerialNumber(newSerialNumber);
  }, [page, rows]);

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
            onClick={() => setOpenAddChild_CategoryModal(true)}
            className="btn bg-secondary hover:bg-secondary px-5 py-2 text-white border border-gray-300 rounded-lg flex items-center gap-2"
          >
            Add <CiSquarePlus className="text-white" size={25} />{" "}
          </button>
        </div>
      </div>
      {/* Table for showing data */}
      {allChild_Categories?.data?.length > 0 ? (
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
                  Status
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Serial
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Category Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Sub Category Name
                </th>
                <th className="px-4 py-2 text-center font-semibold text-gray-900 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {allChild_Categories?.data?.map((child_category, i) => (
                <tr key={child_category?._id}>
                  <td className="whitespace-nowrap px-4 py-2">
                    {serialNumber + i + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {child_category?.child_category_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {child_category?.child_category_status}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {child_category?.child_category_serial}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {child_category?.category_id?.category_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {child_category?.sub_category_id?.sub_category_name}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 flex justify-center mt-3 gap-4">
                    <FaTrashAlt
                      onClick={() => {
                        setOpenDeleteChild_CategoryModal(
                          !openDeleteChild_CategoryModal
                        );
                        setOpenDeleteChild_CategoryModalValue(child_category);
                      }}
                      className="cursor-pointer text-red-500 hover:text-red-400"
                      size={25}
                    />
                    <FiEdit
                      onClick={() => {
                        setOpenUpdateChild_CategoryModal(true);
                        setOpenUpdateChild_CategoryModalValue(child_category);
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
        totalData={child_categories?.totalData}
      />

      {/* Handle open addChild_Category */}
      {openAddChild_CategoryModal && (
        <AddChild_Category
          refetch={refetch}
          setOpenAddChild_CategoryModal={setOpenAddChild_CategoryModal}
        />
      )}

      {/* Handle open delete modal */}
      {openDeleteChild_CategoryModal && (
        <DeleteChild_Category
          refetch={refetch}
          setOpenDeleteChild_CategoryModal={setOpenDeleteChild_CategoryModal}
          openDeleteChild_CategoryModalValue={
            openDeleteChild_CategoryModalValue
          }
        />
      )}

      {/* Handle open Update modal */}
      {openUpdateChild_CategoryModal && (
        <UpdateChild_Category
          refetch={refetch}
          setOpenUpdateChild_CategoryModal={setOpenUpdateChild_CategoryModal}
          openUpdateChild_CategoryModalValue={
            openUpdateChild_CategoryModalValue
          }
        />
      )}
    </div>
  );
};

export default Child_CategoryTable;
