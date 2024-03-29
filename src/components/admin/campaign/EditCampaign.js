"use client";

import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useUpdateCampaignMutation } from "@/redux/feature/campaign/campaignApi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import EditCampaignProduct from "./EditCampaignProduct";

const EditCampaign = ({
  refetch,
  setOpenUpdateCampaignModal,
  openUpdateCampaignModalValue,
}) => {
  // store selected product
  const [addProduct, setAddProduct] = useState(
    openUpdateCampaignModalValue?.campaign_products
  );
  const [loading, setLoading] = useState(false);
  const [isCampaign_status, setIsCampaign_status] = useState(
    openUpdateCampaignModalValue?.campaign_status
  );
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [updateCampaign] = useUpdateCampaignMutation(); //post campaign
  const handleDataPost = (data) => {
    const sendData = {
      _id: openUpdateCampaignModalValue?._id,
      campaign_title: data?.campaign_title
        ? data?.campaign_title
        : openUpdateCampaignModalValue?.campaign_title,
      campaign_description: data?.campaign_description
        ? data?.campaign_description
        : openUpdateCampaignModalValue?.campaign_description,
      campaign_start_date: data?.campaign_start_date
        ? data?.campaign_start_date
        : openUpdateCampaignModalValue?.campaign_start_date,
      campaign_end_date: data?.campaign_end_date
        ? data?.campaign_end_date
        : openUpdateCampaignModalValue?.campaign_end_date,
      campaign_status: data?.campaign_status
        ? data?.campaign_status
        : openUpdateCampaignModalValue?.campaign_status,
      campaign_products: addProduct?.map((item) => ({
        campaign_product_id: item?.campaign_product_id?._id,
      })),
    };
    updateCampaign(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Campaign Update successfully !",
          {
            autoClose: 1000,
          }
        );
        reset();
        refetch();
        setLoading(false);
        setOpenUpdateCampaignModal(false);
      } else {
        setLoading(false);
        toast.error(result?.error?.data?.message, {
          autoClose: 1000,
        });
      }
    });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-full lg:w-10/12 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3
            className="text-[26px] font-bold text-[#0A0A0A] capitalize"
            id="modal-title"
          >
            {" "}
            Update Campaign{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                setOpenUpdateCampaignModal(false);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>
        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div>
            <label htmlFor="campaign_title" className="font-medium">
              Campaign Title
            </label>
            <input
              defaultValue={openUpdateCampaignModalValue?.campaign_title}
              {...register("campaign_title", {
                required: "Campaign Title is required",
              })}
              id="campaign_title"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.campaign_title && (
              <p className="text-red-600">{errors.campaign_title?.message}</p>
            )}
          </div>
          <div className="mt-4">
            <label htmlFor="campaign_description" className="font-medium">
              Campaign Description
            </label>
            <textarea
              rows={4}
              defaultValue={openUpdateCampaignModalValue?.campaign_description}
              {...register("campaign_description")}
              id="campaign_description"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>
          <div className="mt-4">
            <label className="font-medium" htmlFor="campaign_status">
              {" "}
              Campaign Status{" "}
            </label>
            <select
              {...register("campaign_status")}
              id="campaign_status"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            >
              <option
                className="capitalize"
                disabled
                selected
                value={
                  isCampaign_status
                    ? isCampaign_status
                    : openUpdateCampaignModalValue?.campaign_status
                }
              >
                {isCampaign_status
                  ? isCampaign_status
                  : openUpdateCampaignModalValue?.campaign_status}
              </option>
              <option value="active">Active</option>
              <option value="in-active">In-Active</option>
            </select>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="campaign_start_date" className="font-medium">
                Campaign Start Date
              </label>
              <input
                defaultValue={openUpdateCampaignModalValue?.campaign_start_date}
                {...register("campaign_start_date")}
                id="campaign_start_date"
                type="date"
                className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
              />
            </div>
            <div>
              <label htmlFor="campaign_end_date" className="font-medium">
                Campaign End Date
              </label>
              <input
                defaultValue={openUpdateCampaignModalValue?.campaign_end_date}
                {...register("campaign_end_date")}
                id="campaign_end_date"
                type="date"
                className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
              />
            </div>
          </div>
          <div>
            <EditCampaignProduct
              setAddProduct={setAddProduct}
              addProduct={addProduct}
            />
          </div>
          <div className="flex items-center justify-end mt-4">
            {loading ? (
              <button
                type="button"
                disabled
                className="px-6 py-2 text-white transition-colors duration-300 transform bg-primaryColor rounded-xl hover:bg-primaryColor"
              >
                <MiniSpinner />
              </button>
            ) : (
              <button
                type="Submit"
                className="px-6 py-2 text-white transition-colors duration-300 transform bg-primaryColor rounded-xl hover:bg-primaryColor"
              >
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCampaign;
