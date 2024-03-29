"use client";
/* eslint-disable react/prop-types */
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useAddCategoryMutation } from "@/redux/feature/category/categoryApi";
import { ImageValidate } from "@/utils/ImageValidate";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import slugify from "slugify";

const  AddCategory = ({
  refetch,
  openAddCategoryModal,
  setOpenAddCategoryModal,
}) => {
  const [loading, setLoading] = useState(false);
  const [isCategoryLogo, setIsCategoryLogo] = useState(null);

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

  const [postCategoryType] = useAddCategoryMutation(); //post category

  // post a Category
  const handleDataPost = (data) => {
    setLoading(true);
    const formData = new FormData();
    let errorEncountered = false;

    if (data?.category_logo[0]) {
      const category_logo = data?.category_logo[0];
      const result = ImageValidate(category_logo, "category_logo"); //check image type
      if (result == true) {
        formData.append("category_logo", category_logo);
      } else {
        toast.error(`Must be a png/jpg/webp/jpeg image In Logo`, {
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
      if (key !== "category_logo") {
        formData.append(key, value);
      }
    });
    const slug = slugify(data.category_name, {
      lower: true,
      replacement: "-",
    });
    formData.append("category_slug", slug);
    postCategoryType(formData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Category Added successfully !",
          {
            autoClose: 1000,
          }
        );
        reset();
        setIsCategoryLogo(null);
        refetch();
        setOpenAddCategoryModal(false);
        setLoading(false);
      } else {
        setLoading(false);
        setIsCategoryLogo(null);
        toast.error(result?.error?.data?.message, {
          autoClose: 1000,
        });
      }
    });
  };

  return (
    <div
      className={`${
        openAddCategoryModal
          ? "top-1/2 transition-all duration-500"
          : " -top-full"
      } transition-all duration-500 fixed left-1/2 transform -translate-x-1/2 -translate-y-1/2 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 min-w-full min-h-full`}
    >
      <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-full lg:w-10/12 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3
            className="text-[26px] font-bold text-[#0A0A0A] capitalize"
            id="modal-title"
          >
            {" "}
            Add Category{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                setOpenAddCategoryModal(false);
                setIsCategoryLogo(null);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>

        {/* Add A Category Type */}

        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div>
            <label htmlFor="category_name" className="font-medium">
              Category Name
            </label>
            <input
              placeholder="Category Name"
              {...register("category_name", {
                required: "Category Name is required",
              })}
              id="category_name"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.category_name && (
              <p className="text-red-600">{errors.category_name?.message}</p>
            )}
          </div>

          <div className="mt-4">
            {isCategoryLogo && (
              <div className="flex items-center justify-center">
                <Image src={isCategoryLogo} alt="" height={200} width={200} />
              </div>
            )}
            <label htmlFor="category_logo" className="font-medium">
              Category Logo
            </label>
            <input
              onInput={(e) => handleCategoryLogoChange(e)}
              {...register("category_logo", {
                required: "Category Logo is required",
              })}
              id="category_logo"
              type="file"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.category_logo && (
              <p className="text-red-600">{errors.category_logo?.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="font-medium" htmlFor="category_status">
              {" "}
              Category Status{" "}
            </label>
            <select
              {...register("category_status", {
                required: "Category Status is required",
                validate: (value) => value !== "--None--",
              })}
              id="category_status"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            >
              <option disabled selected>
                {" "}
                --None--{" "}
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
              placeholder="Category Serial"
              {...register(
                "category_serial",
                { min: 1 },
                {
                  required: "Category Serial is required",
                }
              )}
              id="category_serial"
              type="number"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.category_serial && (
              <p className="text-red-600">{errors.category_serial?.message}</p>
            )}
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

export default AddCategory;
