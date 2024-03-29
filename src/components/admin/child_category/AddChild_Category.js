"use client";
import BigSpinner from "@/components/common/loader/BigSpinner";
/* eslint-disable react/prop-types */
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { authKey } from "@/contants/storageKey";
import { useAddChild_CategoryMutation } from "@/redux/feature/child_category/child_categoryApi";
import { BASE_URL } from "@/utils/baseURL";
import { getFromLocalStorage } from "@/utils/local-storage";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import Select from "react-select";
import { toast } from "react-toastify";
import slugify from "slugify";

const AddChild_Category = ({ refetch, setOpenAddChild_CategoryModal }) => {
  const [loading, setLoading] = useState(false);
  const [category_id, setCategory_id] = useState("");
  const [category_name, setCategory_name] = useState("");
  const [isSub_CategoryOpen, setIsSub_CategoryOpen] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [sub_category_id, setSub_Category_id] = useState("");
  const [sub_category_name, setSub_Category_name] = useState("");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const { data: categories = [], isLoading } = useQuery({
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

  const { data: sub_categories = [] } = useQuery({
    queryKey: [`/api/v1/sub_category/dashboard`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/sub_category/dashboard`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    },
  }); // get all Sub category for select

  useEffect(() => {
    const getSubCategoryData = sub_categories?.data?.filter(
      (sub_category) => sub_category?.category_id?._id === category_id
    );
    setSubCategoryData(getSubCategoryData);
  }, [sub_categories?.data, category_id]);

  const [postChild_CategoryType] = useAddChild_CategoryMutation(); //post Child_category

  // post a Child_Category
  const handleDataPost = (data) => {
    setLoading(true);
    const setSlug =
      category_name + " " + sub_category_name + " " + data.child_category_name;
    const child_category_slug = slugify(setSlug, {
      lower: true,
      replacement: "-",
    });
    const sendData = {
      category_id: category_id,
      sub_category_id: sub_category_id,
      child_category_name: data?.child_category_name,
      child_category_serial: data?.child_category_serial,
      child_category_status: data?.child_category_status,
      child_category_slug: child_category_slug,
    };
    postChild_CategoryType(sendData).then((result) => {
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
        refetch();
        setIsSub_CategoryOpen(false);
        setOpenAddChild_CategoryModal(false);
        setLoading(false);
      } else {
        toast.error(result?.error?.data?.message, {
          autoClose: 1000,
        });
        setLoading(false);
      }
    });
  };

  if (isLoading) {
    <BigSpinner />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-full lg:w-10/12 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3
            className="text-[26px] font-bold text-[#0A0A0A] capitalize"
            id="modal-title"
          >
            {" "}
            Add Child Category{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                setOpenAddChild_CategoryModal(false);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>

        {/* Add A Child Category Type */}

        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div>
            <label htmlFor="child_category_name" className="font-medium">
              Child Category Name
            </label>
            <input
              placeholder="Child Category Name"
              {...register("child_category_name", {
                required: "Child Category Name is required",
              })}
              id="child_category_name"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.child_category_name && (
              <p className="text-red-600">
                {errors.child_category_name?.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <label className="font-medium" htmlFor="child_category_status">
              {" "}
              Child Category Status{" "}
            </label>
            <select
              {...register("child_category_status", {
                required: "Child Category Status is required",
                validate: (value) => value !== "--None--",
              })}
              id="child_category_status"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            >
              <option disabled selected>
                {" "}
                --None--{" "}
              </option>
              <option value="active">Active</option>
              <option value="in-active">In-Active</option>
            </select>
            {errors.child_category_status && (
              <p className="text-red-600">
                {errors.child_category_status?.message}
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
                setIsSub_CategoryOpen(false);
                setCategory_id(selectedOption?._id);
                setCategory_name(selectedOption?.category_name);
                setTimeout(() => {
                  setIsSub_CategoryOpen(true);
                }, 100);
              }}
            ></Select>
          </div>

          {isSub_CategoryOpen && (
            <div className="mt-4">
              <p className="font-medium"> Sub Category Name </p>
              <Select
                id="sub_category_id"
                name="sub_category_id"
                isClearable
                required
                aria-label="Select a Sub Category"
                options={subCategoryData}
                getOptionLabel={(x) => x?.sub_category_name}
                getOptionValue={(x) => x?._id}
                onChange={(selectedOption) => {
                  setSub_Category_id(selectedOption?._id);
                  setSub_Category_name(selectedOption?.sub_category_name);
                }}
              ></Select>
            </div>
          )}

          <div className="mt-4">
            <label htmlFor="child_category_serial" className="font-medium">
              Child Category Serial
            </label>
            <input
              placeholder="Child Category Serial"
              {...register("child_category_serial", {
                required: "Child Category Name is required",
              })}
              id="child_category_serial"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.child_category_serial && (
              <p className="text-red-600">
                {errors.child_category_serial?.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end mt-4">
            {loading ? (
              <button
                type="button"
                disabled
                className="px-6 py-2 text-white transition-colors duration-300 transform bg-primaryColor rounded-xl hover:bg-primaryColor"
              >
                <MiniSpinner /> :
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

export default AddChild_Category;
