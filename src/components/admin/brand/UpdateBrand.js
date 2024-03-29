"use client";

import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { authKey } from "@/contants/storageKey";
import { useUpdateBrandMutation } from "@/redux/feature/brand/brandApi";
import { BASE_URL } from "@/utils/baseURL";
import { getFromLocalStorage } from "@/utils/local-storage";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import Select from "react-select";
import { toast } from "react-toastify";
import slugify from "slugify";

const UpdateBrand = ({
  refetch,
  setOpenUpdateBrandModal,
  openUpdateBrandModalValue,
}) => {
  const [loading, setLoading] = useState(false);
  const [category_id, setCategory_id] = useState(
    openUpdateBrandModalValue?.category_id?._id
  );

  // set default state
  const categoryNameValue =
    openUpdateBrandModalValue?.category_id?.category_name;
  const categoryNameId = openUpdateBrandModalValue?.category_id?._id;

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

  const [updateBrand] = useUpdateBrandMutation(); //Update Sub Category

  // post a Sub Category
  const handleDataPost = (data) => {
    setLoading(true);
    const sendData = {
      _id: openUpdateBrandModalValue?._id,
      brand_name: data?.brand_name
        ? data?.brand_name
        : openUpdateBrandModalValue?.brand_name,
      category_id: category_id
        ? category_id
        : openUpdateBrandModalValue?.category_id,
      brand_slug: slugify(
        data?.brand_name
          ? data?.brand_name
          : openUpdateBrandModalValue?.brand_name,
        {
          lower: true,
          replacement: "-",
        }
      ),
    };
    updateBrand(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Brand update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
        reset();
        setOpenUpdateBrandModal(false);
        setLoading(false);
      } else {
        toast.error(result?.error?.data?.message, {
          autoClose: 1000,
        });
        setLoading(false);
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
            Update Filter{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                reset();
                refetch();
                setOpenUpdateBrandModal(false);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>

        {/* Update A Brand Type */}

        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div>
            <label htmlFor="brand_name" className="font-medium">
              Brand Name
            </label>
            <input
              defaultValue={openUpdateBrandModalValue?.brand_name}
              {...register("brand_name")}
              id="brand_name"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
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
                setCategory_id(selectedOption?._id);
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
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBrand;
