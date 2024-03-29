"use client";
/* eslint-disable react/prop-types */
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { authKey } from "@/contants/storageKey";
import { useUpdateChild_CategoryMutation } from "@/redux/feature/child_category/child_categoryApi";
import { BASE_URL } from "@/utils/baseURL";
import { getFromLocalStorage } from "@/utils/local-storage";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import Select from "react-select";
import { toast } from "react-toastify";
import slugify from "slugify";

const UpdateChild_Category = ({
  refetch,
  setOpenUpdateChild_CategoryModal,
  openUpdateChild_CategoryModalValue,
}) => {
  const [loading, setLoading] = useState(false);
  const [isChild_Category_status, setIsChild_Category_status] = useState(
    openUpdateChild_CategoryModalValue?.child_category_status
  );
  const [category_id, setCategory_id] = useState(
    openUpdateChild_CategoryModalValue?.category_id?._id
  );
  const [category_name, setCategory_name] = useState(
    openUpdateChild_CategoryModalValue?.category_id?.category_name
  );

  // set default value
  const categoryNameValue =
    openUpdateChild_CategoryModalValue?.category_id?.category_name;
  const categoryNameId = openUpdateChild_CategoryModalValue?.category_id?._id;
  const sub_categoryNameValue =
    openUpdateChild_CategoryModalValue?.sub_category_id?.sub_category_name;
  const sub_categoryNameId =
    openUpdateChild_CategoryModalValue?.sub_category_id?._id;

  const [isChangeCategory, setIsChangeCategory] = useState(false);

  const [subCategoryData, setSubCategoryData] = useState([]);
  const [sub_category_id, setSub_Category_id] = useState(
    openUpdateChild_CategoryModalValue?.sub_category_id?._id
  );
  const [sub_category_name, setSub_Category_name] = useState(
    openUpdateChild_CategoryModalValue?.sub_category_id?.sub_category_name
  );
  const [isSub_CategoryOpen, setIsSub_CategoryOpen] = useState(true);

  const { register, reset, handleSubmit } = useForm();

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

  const [updateChild_Category] = useUpdateChild_CategoryMutation(); //Update Sub Category

  // post a Sub Category
  const handleDataPost = (data) => {
    setLoading(true);
    const setSlug = data?.child_category_name
      ? category_name +
        " " +
        sub_category_name +
        " " +
        data?.child_category_name
      : category_name +
        " " +
        sub_category_name +
        " " +
        openUpdateChild_CategoryModalValue?.child_category_name;
    const sendData = {
      _id: openUpdateChild_CategoryModalValue?._id,
      child_category_name: data?.child_category_name
        ? data?.child_category_name
        : openUpdateChild_CategoryModalValue?.child_category_name,
      child_category_status: data?.child_category_status
        ? data?.child_category_status
        : openUpdateChild_CategoryModalValue?.child_category_status,
      child_category_serial: data?.child_category_serial
        ? data?.child_category_serial
        : openUpdateChild_CategoryModalValue?.child_category_serial,
      category_id: category_id
        ? category_id
        : openUpdateChild_CategoryModalValue?.category_id,
      sub_category_id: sub_category_id
        ? sub_category_id
        : openUpdateChild_CategoryModalValue?.sub_category_id,
      child_category_slug: slugify(setSlug, {
        lower: true,
        replacement: "-",
      }),
    };
    updateChild_Category(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Child Category update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
        reset();
        setLoading(false);
        setOpenUpdateChild_CategoryModal(false);
      } else {
        setLoading(false);
        toast.error(result?.error?.data?.message);
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
            Update Child Category{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                reset();
                setIsChild_Category_status(
                  openUpdateChild_CategoryModalValue?.child_category_status
                );
                refetch();
                setOpenUpdateChild_CategoryModal(false);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>

        {/* Update A child Category Type */}

        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div>
            <label htmlFor="child_category_name" className="font-medium">
              Child Category Name
            </label>
            <input
              defaultValue={
                openUpdateChild_CategoryModalValue?.child_category_name
              }
              {...register("child_category_name")}
              id="child_category_name"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>

          <div className="mt-4">
            <label className="font-medium" htmlFor="child_category_status">
              {" "}
              Child Category Status{" "}
            </label>
            <select
              {...register("child_category_status")}
              id="child_category_status"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            >
              <option
                selected
                value={
                  isChild_Category_status
                    ? isChild_Category_status
                    : openUpdateChild_CategoryModalValue?.child_category_status
                }
              >
                {isChild_Category_status
                  ? isChild_Category_status
                  : openUpdateChild_CategoryModalValue?.child_category_status}
              </option>
              <option value="active">Active</option>
              <option value="in-active">In-Active</option>
            </select>
          </div>

          <div className="mt-4">
            <p className="font-medium"> Category Name: </p>
            <Select
              id="category_id"
              name="category_id"
              isClearable
              defaultValue={{
                _id: categoryNameId,
                category_name: categoryNameValue,
              }}
              required
              aria-label="Please select a data"
              options={categories?.data}
              getOptionLabel={(x) => x?.category_name}
              getOptionValue={(x) => x?._id}
              onChange={(selectedOption) => {
                setIsSub_CategoryOpen(false);
                setIsChangeCategory(true);
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
              {isChangeCategory == true ? (
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
              ) : (
                <Select
                  id="sub_category_id"
                  name="sub_category_id"
                  isClearable
                  defaultValue={{
                    _id: sub_categoryNameId,
                    sub_category_name: sub_categoryNameValue,
                  }}
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
              )}
            </div>
          )}

          <div className="mt-4">
            <label htmlFor="child_category_serial" className="font-medium">
              Child Category Serial
            </label>
            <input
              defaultValue={
                openUpdateChild_CategoryModalValue?.child_category_serial
              }
              {...register("child_category_serial")}
              id="child_category_serial"
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
                <MiniSpinner /> :
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

export default UpdateChild_Category;
