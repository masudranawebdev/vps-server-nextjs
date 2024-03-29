"use client";
import BigSpinner from "@/components/common/loader/BigSpinner";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { authKey } from "@/contants/storageKey";
import { useAddFilterMutation } from "@/redux/feature/filter/filterApi";
import { BASE_URL } from "@/utils/baseURL";
import { getFromLocalStorage } from "@/utils/local-storage";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import Select from "react-select";
import { toast } from "react-toastify";
import slugify from "slugify";

const AddFilter = ({ refetch, setOpenAddFilterModal }) => {
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

  const [postFilterType] = useAddFilterMutation(); //post Child_category

  // post a Child_Category
  const handleDataPost = (data) => {
    setLoading(true);
    const filter_slug = slugify(data.filter_name, {
      lower: true,
      replacement: "-",
    });
    const sendData = {
      category_id: category_id,
      filter_name: data?.filter_name,
      filter_status: data?.filter_status,
      filter_serial: data?.filter_serial,
      filter_slug: filter_slug,
    };
    postFilterType(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Filter Added successfully !",
          {
            autoClose: 1000,
          }
        );
        reset();
        refetch();
        setOpenAddFilterModal(false);
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
            Add Filter{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                setOpenAddFilterModal(false);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>

        {/* Add A Filter Type */}

        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div>
            <label htmlFor="filter_name" className="font-medium">
              Filter Name
            </label>
            <input
              placeholder="Filter Name"
              {...register("filter_name", {
                required: "Filter Name is required",
              })}
              id="filter_name"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.filter_name && (
              <p className="text-red-600">{errors.filter_name?.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="filter_serial" className="font-medium">
              Filter Serial
            </label>
            <input
              placeholder="Filter Serial"
              {...register("filter_serial", {
                required: "Filter Serial is required",
              })}
              id="filter_serial"
              type="number"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.filter_serial && (
              <p className="text-red-600">{errors.filter_serial?.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="font-medium" htmlFor="filter_status">
              {" "}
              Filter Status{" "}
            </label>
            <select
              {...register("filter_status", {
                required: "Filter Status is required",
                validate: (value) => value !== "--None--",
              })}
              id="filter_status"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            >
              <option disabled selected>
                {" "}
                --None--{" "}
              </option>
              <option value="active">Active</option>
              <option value="in-active">In-Active</option>
            </select>
            {errors.filter_status && (
              <p className="text-red-600">{errors.filter_status?.message}</p>
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

export default AddFilter;
