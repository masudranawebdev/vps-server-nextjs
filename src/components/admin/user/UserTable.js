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
import { useChangeStatusMutation } from "@/redux/feature/auth/authApi";
import { toast } from "react-toastify";
import DeleteUser from './DeleteUser';
import ViewUser from "./ViewUser";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const UserTable = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState();

  const [openViewUserModal, setOpenViewUserModal] = useState(false);
  const [openViewUserModalValue, setOpenViewUserModalValue] = useState();
  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
  const [openDeleteUserModalValue, setOpenDeleteUserModalValue] = useState();

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/userReg?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/userReg?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setUsers(data);
      return data;
    },
  }); // get all users

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

  const [updateUserStatus] = useChangeStatusMutation(); //Update users status

  const updateUserStatusActiveHandle = (user_phone, user_status) => {
    const sendData = {
      user_phone,
      user_status,
    };
    updateUserStatus(sendData).then((result) => {
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

  const updateUserStatusInActive = (user_phone, user_status) => {
    const sendData = {
      user_phone,
      user_status,
    };
    updateUserStatus(sendData).then((result) => {
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
      {users?.data?.length > 0 ? (
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
                  User Verify
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  User Role
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  User Status
                </th>
                <th className="px-4 py-2 text-center font-semibold text-gray-900 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {users?.data?.map((user, i) => (
                <tr key={user?._id}>
                  <td className="whitespace-nowrap px-4 py-2">
                    {serialNumber + i + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {user?.user_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase">
                    {user?.user_email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase">
                    {user?.user_phone}
                  </td>
                  {user?.user_verify == true ? (
                    <td className="whitespace-nowrap px-4 py-2">Verified</td>
                  ) : (
                    <td className="whitespace-nowrap px-4 py-2">Un-Verified</td>
                  )}
                  <td className="whitespace-nowrap px-4 py-2">
                    {user?.user_role}
                  </td>
                  {user?.user_status == "in-active" ? (
                    <td className="whitespace-nowrap px-4 py-2">
                      <button
                        onClick={() =>
                          updateUserStatusActiveHandle(
                            user?.user_phone,
                            "active"
                          )
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
                          updateUserStatusInActive(
                            user?.user_phone,
                            "in-active"
                          )
                        }
                        className="btn bg-green-500 text-white border rounded-md px-2 py-1"
                      >
                        Active
                      </button>
                    </td>
                  )}

                  <td className="whitespace-nowrap px-4 py-2 flex justify-center mt-3 gap-4">
                    <IoEye
                      onClick={() => {
                        setOpenViewUserModal(!openViewUserModal);
                        setOpenViewUserModalValue(user);
                      }}
                      className="cursor-pointer text-sky-500 hover:text-sky-400"
                      size={25}
                    />
                    <FaTrashAlt
                      onClick={() => {
                        setOpenDeleteUserModal(!openDeleteUserModal);
                        setOpenDeleteUserModalValue(user);
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
        totalData={allUsers?.totalData}
      />
      {/* Handle open revies modal */}
      {openViewUserModal && (
        <ViewUser
          setOpenViewUserModal={setOpenViewUserModal}
          openViewUserModalValue={openViewUserModalValue}
        />
      )}
      {/* Handle open delete modal */}
      {openDeleteUserModal && (
        <DeleteUser
          refetch={refetch}
          setOpenDeleteUserModal={setOpenDeleteUserModal}
          openDeleteUserModalValue={openDeleteUserModalValue}
        />
      )}
    </div>
  );
};

export default UserTable;