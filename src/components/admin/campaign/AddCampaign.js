"use client";

import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import AddCampaignProduct from "./AddCampaignProduct";
import { useState } from "react";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useAddCampaignMutation } from "@/redux/feature/campaign/campaignApi";
import { toast } from "react-toastify";

const AddCampaign = ({ refetch, setOpenAddCampaignModal }) => {
  // store selected product
  const [addProduct, setAddProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [postCampaign] = useAddCampaignMutation(); //post campaign

  const handleDataPost = (data) => {
    const sendData = {
      campaign_title: data?.campaign_title,
      campaign_description: data?.campaign_description,
      campaign_start_date: data?.campaign_start_date,
      campaign_end_date: data?.campaign_end_date,
      campaign_products: addProduct?.map((item) => ({
        campaign_product_id: item?._id,
      })),
    };
    postCampaign(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Campaign Added successfully !",
          {
            autoClose: 1000,
          }
        );
        reset();
        refetch();
        setLoading(false);
        setOpenAddCampaignModal(false)
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
            Add Campaign{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                setOpenAddCampaignModal(false);
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
              placeholder="Campaign Title"
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
              placeholder="Campaign Description"
              {...register("campaign_description")}
              id="campaign_description"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="campaign_start_date" className="font-medium">
                Campaign Start Date
              </label>
              <input
                placeholder="Campaign Start Date"
                {...register("campaign_start_date", {
                  required: "Campaign start date is required",
                })}
                id="campaign_start_date"
                type="date"
                className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
              />
              {errors.campaign_start_date && (
                <p className="text-red-600">
                  {errors.campaign_start_date?.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="campaign_end_date" className="font-medium">
                Campaign End Date
              </label>
              <input
                placeholder="Campaign End Date"
                {...register("campaign_end_date", {
                  required: "Campaign end date is required",
                })}
                id="campaign_end_date"
                type="date"
                className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
              />
              {errors.campaign_end_date && (
                <p className="text-red-600">
                  {errors.campaign_end_date?.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <AddCampaignProduct
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
                Create
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCampaign;
