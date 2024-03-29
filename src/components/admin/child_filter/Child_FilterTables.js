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
import AddChild_Filter from "./AddChild_Filter";
import DeleteChild_Filter from "./DeleteChild_Filter";
import UpdateChild_Filter from "./UpdateChild_Filter";
import { toast } from "react-toastify";
import { useUpdateChild_FilterStatusMutation } from "@/redux/feature/child_filter/child_filterApi";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const Child_FilterTables = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [allChild_Filters, setAllChild_Filters] = useState();

  const [openAddChild_FilterModal, setOpenAddChild_FilterModal] =
    useState(false);
  const [openDeleteChild_FilterModal, setOpenDeleteChild_FilterModal] =
    useState(false);
  const [
    openDeleteChild_FilterModalValue,
    setOpenDeleteChild_FilterModalValue,
  ] = useState();
  const [openUpdateChild_FilterModal, setOpenUpdateChild_FilterModal] =
    useState(false);
  const [
    openUpdateChild_FilterModalValue,
    setOpenUpdateChild_FilterModalValue,
  ] = useState();

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const {
    data: child_filters = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/child_filter?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/child_filter?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setAllChild_Filters(data);
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

  const [updateChildFilterStatusForFilterPage] =
    useUpdateChild_FilterStatusMutation(); //Update child filter status for filter page

  const updateFilterStatusForChildFilterPageTrue = (
    _id,
    child_filter_status
  ) => {
    const sendData = {
      _id,
      child_filter_status,
    };
    updateChildFilterStatusForFilterPage(sendData).then((result) => {
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

  const updateChildFilterStatusForFilterPageFalse = (
    _id,
    child_filter_status
  ) => {
    const sendData = {
      _id,
      child_filter_status,
    };
    updateChildFilterStatusForFilterPage(sendData).then((result) => {
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
            onClick={() => setOpenAddChild_FilterModal(true)}
            className="btn bg-secondary hover:bg-secondary px-5 py-2 text-white border border-gray-300 rounded-lg flex items-center gap-2"
          >
            Add <CiSquarePlus className="text-white" size={25} />{" "}
          </button>
        </div>
      </div>
      {/* Table for showing data */}
      {allChild_Filters?.data?.length > 0 ? (
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
                  Filter Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Category Name
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
              {allChild_Filters?.data?.map((child_filter, i) => (
                <tr key={child_filter?._id}>
                  <td className="whitespace-nowrap px-4 py-2">
                    {serialNumber + i + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {child_filter?.child_filter_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {child_filter?.filter_id?.filter_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {child_filter?.category_id?.category_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {child_filter?.child_filter_status == "in-active" ? (
                      <td className="whitespace-nowrap px-4 py-2">
                        <button
                          onClick={() =>
                            updateFilterStatusForChildFilterPageTrue(
                              child_filter?._id,
                              "active"
                            )
                          }
                          className="btn bg-red-500 text-white border rounded-md px-2 py-1"
                        >
                          Selected ?
                        </button>
                      </td>
                    ) : (
                      <td className="whitespace-nowrap px-4 py-2">
                        <button
                          onClick={() =>
                            updateChildFilterStatusForFilterPageFalse(
                              child_filter?._id,
                              "in-active"
                            )
                          }
                          className="btn bg-green-500 text-white border rounded-md px-2 py-1"
                        >
                          Select
                        </button>
                      </td>
                    )}
                  </td>

                  <td className="whitespace-nowrap px-4 py-2 flex justify-center mt-3 gap-4">
                    <FaTrashAlt
                      onClick={() => {
                        setOpenDeleteChild_FilterModal(
                          !openDeleteChild_FilterModal
                        );
                        setOpenDeleteChild_FilterModalValue(child_filter);
                      }}
                      className="cursor-pointer text-red-500 hover:text-red-400"
                      size={25}
                    />
                    <FiEdit
                      onClick={() => {
                        setOpenUpdateChild_FilterModal(
                          !openUpdateChild_FilterModal
                        );
                        setOpenUpdateChild_FilterModalValue(child_filter);
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
        totalData={child_filters?.totalData}
      />

      {/* Handle open add filter */}
      {openAddChild_FilterModal && (
        <AddChild_Filter
          refetch={refetch}
          setOpenAddChild_FilterModal={setOpenAddChild_FilterModal}
        />
      )}

      {/* Handle open delete modal */}
      {openDeleteChild_FilterModal && (
        <DeleteChild_Filter
          refetch={refetch}
          setOpenDeleteChild_FilterModal={setOpenDeleteChild_FilterModal}
          openDeleteChild_FilterModalValue={openDeleteChild_FilterModalValue}
        />
      )}

      {/* Handle open Update modal */}
      {openUpdateChild_FilterModal && (
        <UpdateChild_Filter
          refetch={refetch}
          setOpenUpdateChild_FilterModal={setOpenUpdateChild_FilterModal}
          openUpdateChild_FilterModalValue={openUpdateChild_FilterModalValue}
        />
      )}
    </div>
  );
};

export default Child_FilterTables;
