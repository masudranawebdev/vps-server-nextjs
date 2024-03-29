"use client";
/* eslint-disable react/prop-types */
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useAddSub_CategoryMutation } from "@/redux/feature/sub_category/sub_categoryApi";
import { ImageValidate } from "@/utils/ImageValidate";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import slugify from "slugify";
import Select from "react-select";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";
import Image from "next/image";

const AddSub_Category = ({ refetch, setOpenAddSub_CategoryModal }) => {
  const [loading, setLoading] = useState(false);
  const [isSub_CategoryLogo, setIsSub_CategoryLogo] = useState(null);
  const [category_name, setCategory_name] = useState("");
  const [category_id, setCategory_id] = useState("");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const { data: categories = [] } = useQuery({
    queryKey: [`/api/v1/category/dashboard`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/category/dashboard`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    },
  }); // get all category for select

  const handleSub_CategoryLogoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setIsSub_CategoryLogo(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [postSub_CategoryType] = useAddSub_CategoryMutation(); //post sub_category

  // post a Sub_Category
  const handleDataPost = (data) => {
    setLoading(true);
    if (data?.sub_category_logo[0]) {
      const formData = new FormData();
      let errorEncountered = false;

      if (data?.sub_category_logo[0]) {
        const sub_category_logo = data?.sub_category_logo[0];
        const result = ImageValidate(sub_category_logo, "sub_category_logo"); //check image type
        if (result == true) {
          formData.append("sub_category_logo", sub_category_logo);
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
        if (key !== "sub_category_logo") {
          formData.append(key, value);
        }
      });
      const setSlug = category_name + " " + data.sub_category_name;
      const slug = slugify(setSlug, {
        lower: true,
        replacement: "-",
      });
      formData.append("sub_category_slug", slug);
      formData.append("category_id", category_id);
      postSub_CategoryType(formData).then((result) => {
        if (result?.data?.statusCode == 200 && result?.data?.success == true) {
          toast.success(
            result?.data?.message
              ? result?.data?.message
              : "Sub Category Added successfully !",
            {
              autoClose: 1000,
            }
          );
          reset();
          setIsSub_CategoryLogo(null);
          refetch();
          setOpenAddSub_CategoryModal(false);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(result?.error?.data?.message, {
            autoClose: 1000,
          });
        }
      });
    } else {
      const setSlug = category_name + " " + data?.sub_category_name;
      const sub_category_slug = slugify(setSlug, {
        lower: true,
        replacement: "-",
      });
      const sendData = {
        sub_category_name: data?.sub_category_name,
        sub_category_status: data?.sub_category_status,
        sub_category_serial: data?.sub_category_serial,
        category_id: category_id,
        sub_category_slug: sub_category_slug,
      };
      postSub_CategoryType(sendData).then((result) => {
        if (result?.data?.statusCode == 200 && result?.data?.success == true) {
          toast.success(
            result?.data?.message
              ? result?.data?.message
              : "Sub Category Added successfully !",
            {
              autoClose: 1000,
            }
          );
          reset();
          setIsSub_CategoryLogo(null);
          refetch();
          setOpenAddSub_CategoryModal(false);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(result?.error?.data?.message, {
            autoClose: 1000,
          });
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
            Add Sub Category{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                setOpenAddSub_CategoryModal(false);
                setIsSub_CategoryLogo(null);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>

        {/* Add A Sub Category Type */}

        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div>
            <label htmlFor="sub_category_name" className="font-medium">
              Sub Category Name
            </label>
            <input
              placeholder="Sub Category Name"
              {...register("sub_category_name", {
                required: "Sub Category Name is required",
              })}
              id="sub_category_name"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.sub_category_name && (
              <p className="text-red-600">
                {errors.sub_category_name?.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            {isSub_CategoryLogo && (
              <div className="flex items-center justify-center">
                <Image
                  src={isSub_CategoryLogo}
                  alt=""
                  height={200}
                  width={200}
                />
              </div>
            )}
            <label htmlFor="sub_category_logo" className="font-medium">
              Sub Category Logo
            </label>
            <input
              onInput={(e) => handleSub_CategoryLogoChange(e)}
              {...register("sub_category_logo")}
              id="sub_category_logo"
              type="file"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>

          <div className="mt-4">
            <label className="font-medium" htmlFor="sub_category_status">
              {" "}
              Sub Category Status{" "}
            </label>
            <select
              {...register("sub_category_status", {
                required: "Sub Category Status is required",
                validate: (value) => value !== "--None--",
              })}
              id="sub_category_status"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            >
              <option disabled selected>
                {" "}
                --None--{" "}
              </option>
              <option value="active">Active</option>
              <option value="in-active">In-Active</option>
            </select>
            {errors.sub_category_status && (
              <p className="text-red-600">
                {errors.sub_category_status?.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="sub_category_serial" className="font-medium">
              Sub Category Serial
            </label>
            <input
              placeholder="Sub Category Serial"
              {...register("sub_category_serial", {
                required: "Sub Category Name is required",
              })}
              id="sub_category_serial"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.sub_category_serial && (
              <p className="text-red-600">
                {errors.sub_category_serial?.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <p className="font-medium"> Category Name </p>
            <Select
              id="category_id"
              name="category_id"
              isClearable
              required
              aria-label="Select a Category"
              options={categories?.data}
              getOptionLabel={(x) => x?.category_name}
              getOptionValue={(x) => x?._id}
              onChange={(selectedOption) => {
                setCategory_id(selectedOption?._id);
                setCategory_name(selectedOption?.category_name);
              }}
            ></Select>
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

export default AddSub_Category;
