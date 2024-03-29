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
import AddCategory from "./AddCategory";
import DeleteCategory from "./DeleteCategory";
import UpdateCategory from "./UpdateCategory";
import Image from "next/image";
import { useUpdateCategoryStatusForExplorePageMutation } from "@/redux/feature/category/categoryApi";
import { toast } from "react-toastify";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const CategoryTables = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [allCategories, setAllCategories] = useState();

  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openDeleteCategoryModal, setOpenDeleteCategoryModal] = useState(false);
  const [openDeleteCategoryModalValue, setOpenDeleteCategoryModalValue] =
    useState();
  const [openUpdateCategoryModal, setOpenUpdateCategoryModal] = useState(false);
  const [openUpdateCategoryModalValue, setOpenUpdateCategoryModalValue] =
    useState();

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const {
    data: categories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/category/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/category/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setAllCategories(data);
      return data;
    },
  }); // get all category

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

  const [updateCategoryStatusForExplore] =
    useUpdateCategoryStatusForExplorePageMutation(); //Update Category status for explore

  const updateCategoryStatusForExplorePageTrue = (_id, explore_page) => {
    const sendData = {
      _id,
      explore_page,
    };
    updateCategoryStatusForExplore(sendData).then((result) => {
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

  const updateCategoryStatusForExplorePageFalse = (_id, explore_page) => {
    const sendData = {
      _id,
      explore_page,
    };
    updateCategoryStatusForExplore(sendData).then((result) => {
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
            onClick={() => setOpenAddCategoryModal(!openAddCategoryModal)}
            className="btn bg-secondary hover:bg-secondary px-5 py-2 text-white border border-gray-300 rounded-lg flex items-center gap-2"
          >
            Add <CiSquarePlus className="text-white" size={25} />{" "}
          </button>
        </div>
      </div>
      {/* Table for showing data */}
      {allCategories?.data?.length > 0 ? (
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
                  Slug
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
                  Explore-Page
                </th>
                <th className="px-4 py-2 text-center font-semibold text-gray-900 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {allCategories?.data?.map((category, i) => (
                <tr key={category?._id}>
                  <td className="whitespace-nowrap px-4 py-2">
                    {serialNumber + i + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <Image
                      src={category?.category_logo}
                      alt=""
                      height={50}
                      width={50}
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {category?.category_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase">
                    {category?.category_slug}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase">
                    {category?.category_serial}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {category?.category_status}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {formatDate(category?.createdAt)}
                  </td>
                  {category?.explore_page == "in-active" ? (
                    <td className="whitespace-nowrap px-4 py-2">
                      <button
                        onClick={() =>
                          updateCategoryStatusForExplorePageTrue(
                            category?._id,
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
                          updateCategoryStatusForExplorePageFalse(
                            category?._id,
                            "in-active"
                          )
                        }
                        className="btn bg-green-500 text-white border rounded-md px-2 py-1"
                      >
                        Select
                      </button>
                    </td>
                  )}

                  <td className="whitespace-nowrap px-4 py-2 flex justify-center mt-3 gap-4">
                    <FaTrashAlt
                      onClick={() => {
                        setOpenDeleteCategoryModal(!openDeleteCategoryModal);
                        setOpenDeleteCategoryModalValue(category);
                      }}
                      className="cursor-pointer text-red-500 hover:text-red-400"
                      size={25}
                    />
                    <FiEdit
                      onClick={() => {
                        setOpenUpdateCategoryModal(!openUpdateCategoryModal);
                        setOpenUpdateCategoryModalValue(category);
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
        totalData={categories?.totalData}
      />

      {/* Handle open addCategory */}
      <AddCategory
        refetch={refetch}
        openAddCategoryModal={openAddCategoryModal}
        setOpenAddCategoryModal={setOpenAddCategoryModal}
      />

      {/* Handle open delete modal */}
      <DeleteCategory
        refetch={refetch}
        openDeleteCategoryModal={openDeleteCategoryModal}
        setOpenDeleteCategoryModal={setOpenDeleteCategoryModal}
        openDeleteCategoryModalValue={openDeleteCategoryModalValue}
      />

      {/* Handle open Update modal */}
      {openUpdateCategoryModal && (
        <UpdateCategory
          refetch={refetch}
          setOpenUpdateCategoryModal={setOpenUpdateCategoryModal}
          openUpdateCategoryModalValue={openUpdateCategoryModalValue}
        />
      )}
    </div>
  );
};

export default CategoryTables;
