"use client";

import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useUpdateBannerMutation } from "@/redux/feature/banner/bannerApi";
import { ImageValidate } from "@/utils/ImageValidate";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";

const UpdateBanner = ({
  refetch,
  setOpenUpdateBannerModal,
  openUpdateBannerModalValue,
}) => {
  const [loading, setLoading] = useState(false);
  const [isBannerImage, setIsBannerImage] = useState(null);
  const [isBanner_status, setIsBanner_status] = useState(
    openUpdateBannerModalValue?.banner_status
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setIsBannerImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [updateBanner] = useUpdateBannerMutation(); //Update Banner

  // update a Banner
  const handleDataPost = (data) => {
    if (data?.banner_image[0]) {
      setLoading(true);
      const formData = new FormData();
      let errorEncountered = false;

      const banner_image = data?.banner_image[0];
      const result = ImageValidate(banner_image, "banner_image"); //check image type
      if (result == true) {
        formData.append("banner_image", banner_image);
      } else {
        toast.error(`Must be a png/jpg/webp/jpeg image In Image`);
        errorEncountered = true;
      }

      if (errorEncountered == true) {
        setLoading(false);
        return;
      }
      formData.append(
        "banner_status",
        data?.banner_status
          ? data?.banner_status
          : openUpdateBannerModalValue?.banner_status
      );
      formData.append(
        "banner_serial",
        data?.banner_serial
          ? data?.banner_serial
          : openUpdateBannerModalValue?.banner_serial
      );
      formData.append("public_id", openUpdateBannerModalValue?.public_id);
      formData.append(
        "banner_path",
        data?.banner_path
          ? data?.banner_path
          : openUpdateBannerModalValue?.banner_path
      );
      formData.append("_id", openUpdateBannerModalValue?._id);
      updateBanner(formData).then((result) => {
        if (result?.data?.statusCode == 200 && result?.data?.success == true) {
          toast.success(
            result?.data?.message
              ? result?.data?.message
              : "Banner update successfully !",
            {
              autoClose: 1000,
            }
          );
          refetch();
          reset();
          setLoading(false);
          setOpenUpdateBannerModal(false);
        } else {
          setLoading(false);
          toast.error(result?.error?.data?.message);
        }
      });
    } else {
      setLoading(true);
      const sendData = {
        _id: openUpdateBannerModalValue?._id,
        public_id: openUpdateBannerModalValue?.public_id,
        banner_serial: data?.banner_serial
          ? data?.banner_serial
          : openUpdateBannerModalValue?.banner_serial,
        banner_image: openUpdateBannerModalValue?.banner_image,
        banner_status: data?.banner_status
          ? data?.banner_status
          : openUpdateBannerModalValue?.banner_status,
        banner_path: data?.banner_path
          ? data?.banner_path
          : openUpdateBannerModalValue?.banner_path,
      };
      updateBanner(sendData).then((result) => {
        if (result?.data?.statusCode == 200 && result?.data?.success == true) {
          toast.success(
            result?.data?.message
              ? result?.data?.message
              : "Banner update successfully !",
            {
              autoClose: 1000,
            }
          );
          refetch();
          reset();
          setOpenUpdateBannerModal(false);
          setLoading(false);
        } else {
          toast.error(result?.error?.data?.message, {
            autoClose: 1000,
          });
          setLoading(false);
        }
      });
    }
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
            Update Banner{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                reset();
                setIsBanner_status(openUpdateBannerModalValue?.banner_status);
                refetch();
                setOpenUpdateBannerModal(false);
                setIsBannerImage(null);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>

        {/* Update A Banner Type */}

        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div className="mt-4">
            {isBannerImage ? (
              <div className="flex items-center justify-center">
                <Image src={isBannerImage} alt="" height={200} width={200} />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Image
                  src={openUpdateBannerModalValue?.banner_image}
                  alt=""
                  height={200}
                  width={200}
                />
              </div>
            )}
            <label htmlFor="banner_image" className="font-medium">
              Banner Image
            </label>
            <input
              onInput={(e) => handleBannerImageChange(e)}
              {...register("banner_image")}
              id="banner_image"
              type="file"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>

          <div className="mt-4">
            <label className="font-medium" htmlFor="banner_status">
              {" "}
              Banner Status{" "}
            </label>
            <select
              {...register("banner_status")}
              id="banner_status"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            >
              <option
                selected
                value={
                  isBanner_status
                    ? isBanner_status
                    : openUpdateBannerModalValue?.banner_status
                }
              >
                {isBanner_status
                  ? isBanner_status
                  : openUpdateBannerModalValue?.banner_status}
              </option>
              <option value="active">Active</option>
              <option value="in-active">In-Active</option>
            </select>
            {errors.banner_status && (
              <p className="text-red-600">{errors.banner_status?.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="banner_serial" className="font-medium">
              Banner Serial
            </label>
            <input
              defaultValue={openUpdateBannerModalValue?.banner_serial}
              {...register("banner_serial")}
              id="banner_serial"
              type="number"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>

          <div>
            <label htmlFor="banner_path" className="font-medium">
              Banner Path
            </label>
            <input
              defaultValue={openUpdateBannerModalValue?.banner_path}
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
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBanner;
