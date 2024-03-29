"use client";

import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useUpdateChild_FilterMutation } from "@/redux/feature/child_filter/child_filterApi";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import slugify from "slugify";
import Select from "react-select";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const UpdateChild_Filter = ({
  refetch,
  setOpenUpdateChild_FilterModal,
  openUpdateChild_FilterModalValue,
}) => {
  const [loading, setLoading] = useState(false);
  const [category_id, setCategory_id] = useState(
    openUpdateChild_FilterModalValue?.category_id?._id
  );

  const [child_filter_status, setChild_Filter_status] = useState(
    openUpdateChild_FilterModalValue?.child_filter_status
  );

  // set default value
  const categoryNameValue =
    openUpdateChild_FilterModalValue?.category_id?.category_name;
  const categoryNameId = openUpdateChild_FilterModalValue?.category_id?._id;

  const filterNameId = openUpdateChild_FilterModalValue?.filter_id?._id;
  const filterNameValue =
    openUpdateChild_FilterModalValue?.filter_id?.filter_name;

  // set change value state
  const [isChangeCategory, setIsChangeCategory] = useState(false);

  const [filterData, setFilterData] = useState([]);
  const [filter_id, setFilter_id] = useState(
    openUpdateChild_FilterModalValue?.filter_id?._id
  );
  const [isFilterOpen, setIsFilterOpen] = useState(true);

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

  const { data: filters = [] } = useQuery({
    queryKey: [`/api/v1/filter`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/filter`);
      const data = await res.json();
      return data;
    },
  }); // get all Filters for select

  //   set filter data
  useEffect(() => {
    const getFilterData = filters?.data?.filter(
      (filter) => filter?.category_id?._id === category_id
    );
    setFilterData(getFilterData);
  }, [filters?.data, category_id]);

  const [updateChild_Filter] = useUpdateChild_FilterMutation(); //Update Child Filter

  // post a Child Filter
  const handleDataPost = (data) => {
    setLoading(true);
    const sendData = {
      _id: openUpdateChild_FilterModalValue?._id,
      child_filter_name: data?.child_filter_name
        ? data?.child_filter_name
        : openUpdateChild_FilterModalValue?.child_filter_name,
      child_filter_status: data?.child_filter_status
        ? data?.child_filter_status
        : openUpdateChild_FilterModalValue?.child_filter_status,
      category_id: category_id
        ? category_id
        : openUpdateChild_FilterModalValue?.category_id,
      filter_id: filter_id
        ? filter_id
        : openUpdateChild_FilterModalValue?.filter_id,
      child_filter_slug: slugify(
        data?.child_filter_name
          ? data?.child_filter_name
          : openUpdateChild_FilterModalValue?.child_filter_name,
        {
          lower: true,
          replacement: "-",
        }
      ),
    };
    updateChild_Filter(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Child Filter update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
        reset();
        setOpenUpdateChild_FilterModal(false);
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
            Update Child Filter{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                reset();
                refetch();
                setOpenUpdateChild_FilterModal(false);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>

        {/* Update A Child Filter Type */}

        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div>
            <label htmlFor="child_filter_name" className="font-medium">
              Child Filter Name
            </label>
            <input
              defaultValue={openUpdateChild_FilterModalValue?.child_filter_name}
              {...register("child_filter_name")}
              id="child_filter_name"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>

          <div className="mt-4">
            <label className="font-medium" htmlFor="child_filter_status">
              {" "}
              Child Filter Status{" "}
            </label>
            <select
              {...register("child_filter_status")}
              id="child_filter_status"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            >
              <option
                selected
                value={
                  child_filter_status
                    ? child_filter_status
                    : openUpdateChild_FilterModalValue?.child_filter_status
                }
              >
                {child_filter_status
                  ? child_filter_status
                  : openUpdateChild_FilterModalValue?.child_filter_status}
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
                setIsFilterOpen(false);
                setIsChangeCategory(true);
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
              {isChangeCategory == true ? (
                <Select
                  id="filter_id"
                  name="filter_id"
                  isClearable
                  required
                  aria-label="Select a Filter"
                  options={filterData}
                  getOptionLabel={(x) => x?.filter_name}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) => {
                    setFilter_id(selectedOption?._id);
                  }}
                ></Select>
              ) : (
                <Select
                  id="filter_id"
                  name="filter_id"
                  isClearable
                  defaultValue={{
                    _id: filterNameId,
                    filter_name: filterNameValue,
                  }}
                  required
                  aria-label="Select a Filter"
                  options={filterData}
                  getOptionLabel={(x) => x?.filter_name}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) => {
                    setFilter_id(selectedOption?._id);
                  }}
                ></Select>
              )}
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
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateChild_Filter;
