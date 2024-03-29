"use client";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useUpdateCategoryMutation } from "@/redux/feature/category/categoryApi";
import { ImageValidate } from "@/utils/ImageValidate";
import Image from "next/image";
import { useState } from "react";
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import slugify from "slugify";

const UpdateCategory = ({
  refetch,
  setOpenUpdateCategoryModal,
  openUpdateCategoryModalValue,
}) => {
  const [loading, setLoading] = useState(false);
  const [isCategoryLogo, setIsCategoryLogo] = useState(null);
  const [isCategory_status, setIsCategory_status] = useState(
    openUpdateCategoryModalValue?.category_status
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCategoryLogoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setIsCategoryLogo(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [updateCategory] = useUpdateCategoryMutation(); //Update Category

  // post a Category
  const handleDataPost = (data) => {
    if (data?.category_logo[0]) {
      setLoading(true);
      const formData = new FormData();
      let errorEncountered = false;

      const category_logo = data?.category_logo[0];
      const result = ImageValidate(category_logo, "category_logo"); //check image type
      if (result == true) {
        formData.append("category_logo", category_logo);
      } else {
        toast.error(`Must be a png/jpg/webp/jpeg image In Image`);
        errorEncountered = true;
      }

      if (errorEncountered == true) {
        setLoading(false);
        return;
      }
      formData.append(
        "category_name",
        data?.category_name
          ? data?.category_name
          : openUpdateCategoryModalValue?.category_name
      );
      formData.append(
        "category_status",
        data?.category_status
          ? data?.category_status
          : openUpdateCategoryModalValue?.category_status
      );
      formData.append(
        "category_serial",
        data?.category_serial
          ? data?.category_serial
          : openUpdateCategoryModalValue?.category_serial
      );
      formData.append("public_id", openUpdateCategoryModalValue?.public_id);

      const category_slug = slugify(
        data?.category_name
          ? data?.category_name
          : openUpdateCategoryModalValue?.category_name,
        {
          lower: true,
          replacement: "-",
        }
      );
      formData.append("category_slug", category_slug);
      formData.append("_id", openUpdateCategoryModalValue?._id);
      updateCategory(formData).then((result) => {
        if (result?.data?.statusCode == 200 && result?.data?.success == true) {
          toast.success(
            result?.data?.message
              ? result?.data?.message
              : "Category update successfully !",
            {
              autoClose: 1000,
            }
          );
          refetch();
          reset();
          setLoading(false);
          setOpenUpdateCategoryModal(false);
        } else {
          setLoading(false);
          toast.error(result?.error?.data?.message);
        }
      });
    } else {
      setLoading(true);
      const sendData = {
        _id: openUpdateCategoryModalValue?._id,
        category_name: data?.category_name
          ? data?.category_name
          : openUpdateCategoryModalValue?.category_name,
        category_serial: data?.category_serial
          ? data?.category_serial
          : openUpdateCategoryModalValue?.category_serial,
        category_logo: openUpdateCategoryModalValue?.category_logo,
        category_status: data?.category_status
          ? data?.category_status
          : openUpdateCategoryModalValue?.category_status,
        public_id: openUpdateCategoryModalValue?.public_id,
        category_slug: slugify(
          data?.category_name
            ? data?.category_name
            : openUpdateCategoryModalValue?.category_name,
          {
            lower: true,
            replacement: "-",
          }
        ),
      };
      updateCategory(sendData).then((result) => {
        if (result?.data?.statusCode == 200 && result?.data?.success == true) {
          toast.success(
            result?.data?.message
              ? result?.data?.message
              : "Category update successfully !",
            {
              autoClose: 1000,
            }
          );
          refetch();
          reset();
          setOpenUpdateCategoryModal(false);
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
            Update Category{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                reset();
                setIsCategory_status(
                  openUpdateCategoryModalValue?.category_status
                );
                refetch();
                setOpenUpdateCategoryModal(false);
                setIsCategoryLogo(null);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>

        {/* Update A Category Type */}

        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div>
            <label htmlFor="category_name" className="font-medium">
              Category Name
            </label>
            <input
              defaultValue={openUpdateCategoryModalValue?.category_name}
              {...register("category_name")}
              id="category_name"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>

          <div className="mt-4">
            {isCategoryLogo ? (
              <div className="flex items-center justify-center">
                <Image src={isCategoryLogo} alt="" height={200} width={200} />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Image
                  src={openUpdateCategoryModalValue?.category_logo}
                  alt=""
                  height={200}
                  width={200}
                />
              </div>
            )}
            <label htmlFor="category_logo" className="font-medium">
              Category Logo
            </label>
            <input
              onInput={(e) => handleCategoryLogoChange(e)}
              {...register("category_logo")}
              id="category_logo"
              type="file"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>

          <div className="mt-4">
            <label className="font-medium" htmlFor="category_status">
              {" "}
              Category Status{" "}
            </label>
            <select
              {...register("category_status")}
              id="category_status"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            >
              <option
                selected
                value={
                  isCategory_status
                    ? isCategory_status
                    : openUpdateCategoryModalValue?.category_status
                }
              >
                {isCategory_status
                  ? isCategory_status
                  : openUpdateCategoryModalValue?.category_status}
              </option>
              <option value="active">Active</option>
              <option value="in-active">In-Active</option>
            </select>
            {errors.category_status && (
              <p className="text-red-600">{errors.category_status?.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="category_serial" className="font-medium">
              Category Serial
            </label>
            <input
              defaultValue={openUpdateCategoryModalValue?.category_serial}
              {...register("category_serial")}
              id="category_serial"
              type="number"
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

export default UpdateCategory;
