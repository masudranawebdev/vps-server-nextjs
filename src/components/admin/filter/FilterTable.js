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
import AddFilter from "./AddFilter";
import DeleteFilter from "./DeleteFilter";
import UpdateFilter from "./UpdateFilter";
import { toast } from "react-toastify";
import { useUpdateFilterStatusMutation } from "@/redux/feature/filter/filterApi";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";


const FilterTable = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [allFilters, setAllFilters] = useState();

  const [openAddFilterModal, setOpenAddFilterModal] = useState(false);
  const [openDeleteFilterModal, setOpenDeleteFilterModal] = useState(false);
  const [openDeleteFilterModalValue, setOpenDeleteFilterModalValue] =
    useState();
  const [openUpdateFilterModal, setOpenUpdateFilterModal] = useState(false);
  const [openUpdateFilterModalValue, setOpenUpdateFilterModalValue] =
    useState();

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const {
    data: filters = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/filter?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/filter?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setAllFilters(data);
      return data;
    },
  }); // get all Child_category

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

  const [updateFilterStatusForFilterPage] = useUpdateFilterStatusMutation(); //Update filter status for filter page

  const updateFilterStatusForFilterPageTrue = (_id, filter_status) => {
    const sendData = {
      _id,
      filter_status,
    };
    updateFilterStatusForFilterPage(sendData).then((result) => {
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

  const updateFilterStatusForFilterPageFalse = (_id, filter_status) => {
    const sendData = {
      _id,
      filter_status,
    };
    updateFilterStatusForFilterPage(sendData).then((result) => {
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
            onClick={() => setOpenAddFilterModal(!openAddFilterModal)}
            className="btn bg-secondary hover:bg-secondary px-5 py-2 text-white border border-gray-300 rounded-lg flex items-center gap-2"
          >
            Add <CiSquarePlus className="text-white" size={25} />{" "}
          </button>
        </div>
      </div>
      {/* Table for showing data */}
      {allFilters?.data?.length > 0 ? (
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
                  Serial
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Create-Date
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
              {allFilters?.data?.map((filter, i) => (
                <tr key={filter?._id}>
                  <td className="whitespace-nowrap px-4 py-2">
                    {serialNumber + i + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {filter?.filter_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {filter?.filter_serial}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {formatDate(filter?.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {filter?.category_id?.category_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {filter?.filter_status == "in-active" ? (
                      <td className="whitespace-nowrap px-4 py-2">
                        <button
                          onClick={() =>
                            updateFilterStatusForFilterPageTrue(
                              filter?._id,
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
                            updateFilterStatusForFilterPageFalse(
                              filter?._id,
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
                        setOpenDeleteFilterModal(!openDeleteFilterModal);
                        setOpenDeleteFilterModalValue(filter);
                      }}
                      className="cursor-pointer text-red-500 hover:text-red-400"
                      size={25}
                    />
                    <FiEdit
                      onClick={() => {
                        setOpenUpdateFilterModal(!openUpdateFilterModal);
                        setOpenUpdateFilterModalValue(filter);
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
        totalData={filters?.totalData}
      />

      {/* Handle open add filter */}
      {openAddFilterModal && (
        <AddFilter
          refetch={refetch}
          setOpenAddFilterModal={setOpenAddFilterModal}
        />
      )}

      {/* Handle open delete modal */}
      {openDeleteFilterModal && (
        <DeleteFilter
          refetch={refetch}
          setOpenDeleteFilterModal={setOpenDeleteFilterModal}
          openDeleteFilterModalValue={openDeleteFilterModalValue}
        />
      )}

      {/* Handle open Update modal */}
      {openUpdateFilterModal && (
        <UpdateFilter
          refetch={refetch}
          setOpenUpdateFilterModal={setOpenUpdateFilterModal}
          openUpdateFilterModalValue={openUpdateFilterModalValue}
        />
      )}
    </div>
  );
};

export default FilterTable;
