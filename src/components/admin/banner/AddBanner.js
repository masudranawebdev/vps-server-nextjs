"use client";
/* eslint-disable react/prop-types */
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { ImageValidate } from "@/utils/ImageValidate";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useAddBannerMutation } from "@/redux/feature/banner/bannerApi";
import Image from "next/image";

const AddBanner = ({ refetch, setOpenAddBannerModal }) => {
  const [loading, setLoading] = useState(false);
  const [isBannerLogo, setIsBannerLogo] = useState(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleBannerLogoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setIsBannerLogo(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [postBannerType] = useAddBannerMutation(); //post Banner

  // post a Banner
  const handleDataPost = (data) => {
    setLoading(true);
    const formData = new FormData();
    let errorEncountered = false;

    if (data?.banner_image[0]) {
      const banner_image = data?.banner_image[0];
      const result = ImageValidate(banner_image, "banner_image"); //check image type
      if (result == true) {
        formData.append("banner_image", banner_image);
      } else {
        toast.error(`Must be a png/jpg/webp/jpeg image`, {
          autoClose: 1000,
        });
        errorEncountered = true;
      }
    }

    if (errorEncountered == true) {
      setLoading(false);
      return;
    }

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "banner_image") {
        formData.append(key, value);
      }
    });
    postBannerType(formData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Banner Added successfully !",
          {
            autoClose: 1000,
          }
        );
        reset();
        setIsBannerLogo(null);
        refetch();
        setOpenAddBannerModal(false);
        setLoading(false);
      } else {
        setLoading(false);
        setIsBannerLogo(null);
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
            Add Banner{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                setOpenAddBannerModal(false);
                setIsBannerLogo(null);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>

        {/* Add A Banner Type */}

        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div className="mt-4">
            {isBannerLogo && (
              <div className="flex items-center justify-center">
                <Image src={isBannerLogo} alt="" height={200} width={200} />
              </div>
            )}
            <label htmlFor="banner_image" className="font-medium">
              Banner Image
            </label>
            <input
              onInput={(e) => handleBannerLogoChange(e)}
              {...register("banner_image", {
                required: "Banner Image is required",
              })}
              id="banner_image"
              type="file"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.banner_image && (
              <p className="text-red-600">{errors.banner_image?.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="font-medium" htmlFor="banner_status">
              {" "}
              Banner Status{" "}
            </label>
            <select
              {...register("banner_status", {
                required: "Banner Status is required",
                validate: (value) => value !== "--None--",
              })}
              id="banner_status"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            >
              <option disabled selected>
                {" "}
                --None--{" "}
              </option>
              <option value="active">Active</option>
              <option value="in-active">In-Active</option>
            </select>
            {errors.banner_status && (
              <p className="text-red-600">{errors.banner_status?.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="banner_serial" className="font-medium">
              Banner Serial
            </label>
            <input
              placeholder="Banner Serial"
              {...register(
                "banner_serial",
                { min: 1 },
                {
                  required: "Banner Serial is required",
                }
              )}
              id="banner_serial"
              type="number"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.banner_serial && (
              <p className="text-red-600">{errors.banner_serial?.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="banner_path" className="font-medium">
              Banner Path
            </label>
            <input
              placeholder="Banner Path"
              {...register("banner_path")}
              id="banner_path"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
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

export default AddBanner;
