"use client";

import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import slugify from "slugify";
import Select from "react-select";
import { useAddBrandMutation } from "@/redux/feature/brand/brandApi";
import BigSpinner from "@/components/common/loader/BigSpinner";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const AddBrand = ({ refetch, setOpenAddBrandModal }) => {
  const [loading, setLoading] = useState(false);
  const [category_id, setCategory_id] = useState("");

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

  const [postBrandType] = useAddBrandMutation(); //post Child_category

  // post a Child_Category
  const handleDataPost = (data) => {
    setLoading(true);
    const brand_slug = slugify(data.brand_name, {
      lower: true,
      replacement: "-",
    });
    const sendData = {
      category_id: category_id,
      brand_name: data?.brand_name,
      brand_slug: brand_slug,
    };
    postBrandType(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Brand Added successfully !",
          {
            autoClose: 1000,
          }
        );
        reset();
        refetch();
        setOpenAddBrandModal(false);
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
            Add Brand{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                setOpenAddBrandModal(false);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>

        {/* Add A Brand Type */}

        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div>
            <label htmlFor="brand_name" className="font-medium">
              Brand Name
            </label>
            <input
              placeholder="Brand Name"
              {...register("brand_name", {
                required: "Brand Name is required",
              })}
              id="brand_name"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.brand_name && (
              <p className="text-red-600">{errors.brand_name?.message}</p>
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

export default AddBrand;
