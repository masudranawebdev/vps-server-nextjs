"use client";

import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { CiSquarePlus } from "react-icons/ci";
import AddCampaign from "./AddCampaign";
import BigSpinner from "@/components/common/loader/BigSpinner";
import NoDataFound from "@/components/common/noDataFound/NoDataFound";
import Pagination from "@/components/common/pagination/Pagination";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdRemoveRedEye } from "react-icons/md";
import ViewCampaign from "./ViewCampaign";
import DeleteCampaign from "./DeleteCampaign";
import EditCampaign from "./EditCampaign";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const CampaignTable = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [allCampaign, setAllCampaign] = useState();

  const [openAddCampaignModal, setOpenAddCampaignModal] = useState(false);
  const [openViewCampaignModal, setOpenViewCampaignModal] = useState(false);
  const [openViewCampaignModalValue, setOpenViewCampaignModalValue] =
    useState();
  const [openDeleteCampaignModal, setOpenDeleteCampaignModal] = useState(false);
  const [openDeleteCampaignModalValue, setOpenDeleteCampaignModalValue] =
    useState();
  const [openUpdateCampaignModal, setOpenUpdateCampaignModal] = useState(false);
  const [openUpdateCampaignModalValue, setOpenUpdateCampaignModalValue] =
    useState();

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const {
    data: campaigns = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/campaign/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/campaign/dashboard?page=${page}&limit=${rows}&searchTerm=${searchTerm}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setAllCampaign(data);
      return data;
    },
  }); // get all campaign]

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
            onClick={() => setOpenAddCampaignModal(!openAddCampaignModal)}
            className="btn bg-secondary hover:bg-secondary px-5 py-2 text-white border border-gray-300 rounded-lg flex items-center gap-2"
          >
            Add <CiSquarePlus className="text-white" size={25} />{" "}
          </button>
        </div>
      </div>

      {/* Table for showing data */}
      {allCampaign?.data?.length > 0 ? (
        <div className="overflow-x-auto capitalize">
          {/* Show all user */}
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  #
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Title
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  Start Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-left">
                  End Date
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
              {allCampaign?.data?.map((campaign, i) => (
                <tr key={campaign?._id}>
                  <td className="whitespace-nowrap px-4 py-2">
                    {serialNumber + i + 1}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 lowercase">
                    {campaign?.campaign_title}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {campaign?.campaign_start_date}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {campaign?.campaign_end_date}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    {campaign?.campaign_status}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 flex justify-center mt-3 gap-4">
                    <MdRemoveRedEye
                      onClick={() => {
                        setOpenViewCampaignModal(!openViewCampaignModal);
                        setOpenViewCampaignModalValue(campaign);
                      }}
                      className="cursor-pointer text-gray-700 hover:text-gray-600"
                      size={25}
                    />
                    <FiEdit
                      onClick={() => {
                        setOpenUpdateCampaignModal(!openUpdateCampaignModal);
                        setOpenUpdateCampaignModalValue(campaign);
                      }}
                      className="cursor-pointer text-successColor hover:text-successColor"
                      size={25}
                    />
                    <FaTrashAlt
                      onClick={() => {
                        setOpenDeleteCampaignModal(true);
                        setOpenDeleteCampaignModalValue(campaign);
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
        totalData={campaigns?.totalData}
      />

      {/* Handle open add Campaign*/}
      {openAddCampaignModal && (
        <AddCampaign
          refetch={refetch}
          setOpenAddCampaignModal={setOpenAddCampaignModal}
        />
      )}

      {/* Handle open view Campaign*/}
      {openViewCampaignModal && (
        <ViewCampaign
          setOpenViewCampaignModal={setOpenViewCampaignModal}
          openViewCampaignModalValue={openViewCampaignModalValue}
        />
      )}

      {/* Handle open delete modal */}
      {openDeleteCampaignModal && (
        <DeleteCampaign
          refetch={refetch}
          setOpenDeleteCampaignModal={setOpenDeleteCampaignModal}
          openDeleteCampaignModalValue={openDeleteCampaignModalValue}
        />
      )}

      {/* Handle open Update modal */}
      {openUpdateCampaignModal && (
        <EditCampaign
          refetch={refetch}
          setOpenUpdateCampaignModal={setOpenUpdateCampaignModal}
          openUpdateCampaignModalValue={openUpdateCampaignModalValue}
        />
      )}
    </div>
  );
};

export default CampaignTable;
