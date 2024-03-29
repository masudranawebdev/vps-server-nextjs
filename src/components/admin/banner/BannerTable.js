"use client";
import NoDataFound from "@/components/common/noDataFound/NoDataFound";
import Pagination from "@/components/common/pagination/Pagination";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import AddBanner from "./AddBanner";
import DeleteBanner from "./DeleteBanner";
import UpdateBanner from "./UpdateBanner";

const BannerTable = ({ banners, refetch, rows, setRows, page, setPage }) => {
  const [openAddBannerModal, setOpenAddBannerModal] = useState(false);
  const [openDeleteBannerModal, setOpenDeleteBannerModal] = useState(false);
  const [openDeleteBannerModalId, setOpenDeleteBannerModalId] = useState(false);
  const [openDeleteBannerModalPublic_Id, setOpenDeleteBannerModalPublic_Id] = useState(false);
  const [openUpdateBannerModal, setOpenUpdateBannerModal] = useState(false);
  const [openUpdateBannerModalValue, setOpenUpdateBannerModalValue] =
    useState();

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

  return (
    <div className="bg-white p-2 rounded-md mt-5">
      {/* Search and create */}
      <div className="flex items-center justify-end my-5 gap-2">
        <div>
          <button
            onClick={() => setOpenAddBannerModal(true)}
            className="btn bg-secondary hover:bg-secondary px-5 py-2 text-white border border-gray-300 rounded-lg flex items-center gap-2"
          >
            Add <CiSquarePlus className="text-white" size={25} />{" "}
          </button>
        </div>
      </div>
      {/* Table for showing data */}
      {banners?.data?.length > 0 ? (
        <div className="overflow-x-auto capitalize">
          {/* Show all user */}
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  #
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Image
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Serial
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Status
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Path
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
              {banners?.data?.map((banner, i) => (
                <tr key={banner?._id}>
                  <td className="whitespace-nowrap px-4 py-2">
                    {serialNumber + i + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <Image
                      src={banner?.banner_image}
                      alt=""
                      height={50}
                      width={50}
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase">
                    {banner?.banner_serial}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {banner?.banner_status}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {banner?.banner_path}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {formatDate(banner?.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 flex justify-center mt-3 gap-4">
                    <FaTrashAlt
                      onClick={() => {
                        setOpenDeleteBannerModal(true);
                        setOpenDeleteBannerModalId(banner?._id);
                        setOpenDeleteBannerModalPublic_Id(banner?.public_id);
                      }}
                      className="cursor-pointer text-red-500 hover:text-red-400"
                      size={25}
                    />
                    <FiEdit
                      onClick={() => {
                        setOpenUpdateBannerModal(!openUpdateBannerModal);
                        setOpenUpdateBannerModalValue(banner);
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
        totalData={banners?.totalData}
      />

      {/* Handle open addBanner */}
      {openAddBannerModal && (
        <AddBanner
          refetch={refetch}
          setOpenAddBannerModal={setOpenAddBannerModal}
        />
      )}

      {/* Handle open delete modal */}
      {openDeleteBannerModal && (
        <DeleteBanner
          refetch={refetch}
          setOpenDeleteBannerModal={setOpenDeleteBannerModal}
          openDeleteBannerModalId={openDeleteBannerModalId}
          openDeleteBannerModalPublic_Id={openDeleteBannerModalPublic_Id}
        />
      )}

      {/* Handle open Update modal */}
      {openUpdateBannerModal && (
        <UpdateBanner
          refetch={refetch}
          setOpenUpdateBannerModal={setOpenUpdateBannerModal}
          openUpdateBannerModalValue={openUpdateBannerModalValue}
        />
      )}
    </div>
  );
};

export default BannerTable;
