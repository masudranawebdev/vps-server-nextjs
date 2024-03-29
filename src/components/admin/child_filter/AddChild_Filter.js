"use client";

import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import slugify from "slugify";
import Select from "react-select";
import { useAddChild_FilterMutation } from "@/redux/feature/child_filter/child_filterApi";
import BigSpinner from "@/components/common/loader/BigSpinner";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const AddChild_Filter = ({ refetch, setOpenAddChild_FilterModal }) => {
  const [loading, setLoading] = useState(false);
  const [category_id, setCategory_id] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [filter_id, setFilter_id] = useState("");

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

  const { data: filters = [] } = useQuery({
    queryKey: [`/api/v1/filter`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/filter`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    },
  }); // get all Filter for select

  //   set filter data
  useEffect(() => {
    const getFilterData = filters?.data?.filter(
      (filter) => filter?.category_id?._id === category_id
    );
    setFilterData(getFilterData);
  }, [filters?.data, category_id]);

  const [postChild_FilterType] = useAddChild_FilterMutation(); //post Child_category

  // post a Child_Category
  const handleDataPost = (data) => {
    setLoading(true);
    const child_filter_slug = slugify(data.child_filter_name, {
      lower: true,
      replacement: "-",
    });
    const sendData = {
      filter_id: filter_id,
      category_id: category_id,
      child_filter_name: data?.child_filter_name,
      child_filter_slug: child_filter_slug,
      child_filter_status: data?.child_filter_status,
    };
    postChild_FilterType(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Child Filter Added successfully !",
          {
            autoClose: 1000,
          }
        );
        reset();
        refetch();
        setIsFilterOpen(false);
        setOpenAddChild_FilterModal(false);
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
            Add Child Filter{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                setOpenAddChild_FilterModal(false);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>

        {/* Add A Child Filter Type */}

        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div>
            <label htmlFor="child_filter_name" className="font-medium">
              Child Filter Name
            </label>
            <input
              placeholder="Child Filter Name"
              {...register("child_filter_name", {
                required: "Child Filter Name is required",
              })}
              id="child_filter_name"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.child_filter_name && (
              <p className="text-red-600">
                {errors.child_filter_name?.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <label className="font-medium" htmlFor="child_filter_status">
              {" "}
              Child Filter Status{" "}
            </label>
            <select
              {...register("child_filter_status", {
                required: "Child Filter Status is required",
                validate: (value) => value !== "--None--",
              })}
              id="child_filter_status"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            >
              <option disabled selected>
                {" "}
                --None--{" "}
              </option>
              <option value="active">Active</option>
              <option value="in-active">In-Active</option>
            </select>
            {errors.child_filter_status && (
              <p className="text-red-600">
                {errors.child_filter_status?.message}
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
                setIsFilterOpen(false);
                setCategory_id(selectedOption?._id);
                setTimeout(() => {
                  setIsFilterOpen(true);
                }, 100);
              }}
            ></Select>
          </div>

          {isFilterOpen && (
            <div className="mt-4">
              <p className="font-medium"> Filter Name </p>
              <Select
                id="filter_id"
                name="filter_id"
                isClearable
                required
                aria-label="Select a Filter"
                options={filterData}
                getOptionLabel={(x) => x?.filter_name}
                getOptionValue={(x) => x?._id}
                onChange={(selectedOption) => setFilter_id(selectedOption?._id)}
              ></Select>
            </div>
          )}

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

export default AddChild_Filter;
