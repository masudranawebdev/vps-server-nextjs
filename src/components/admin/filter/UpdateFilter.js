"use client";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useUpdateFilterMutation } from "@/redux/feature/filter/filterApi";
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

const UpdateFilter = ({
  refetch,
  setOpenUpdateFilterModal,
  openUpdateFilterModalValue,
}) => {
  const [loading, setLoading] = useState(false);
  const [category_id, setCategory_id] = useState(
    openUpdateFilterModalValue?.category_id?._id
  );
  const [filter_status, setFilter_status] = useState(
    openUpdateFilterModalValue?.filter_status
  );

  // set default value
  const categoryNameValue =
    openUpdateFilterModalValue?.category_id?.category_name;
  const categoryNameId = openUpdateFilterModalValue?.category_id?._id;

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

  const [updateFilter] = useUpdateFilterMutation(); //Update Sub Category

  // post a Sub Category
  const handleDataPost = (data) => {
    setLoading(true);
    const sendData = {
      _id: openUpdateFilterModalValue?._id,
      filter_name: data?.filter_name
        ? data?.filter_name
        : openUpdateFilterModalValue?.filter_name,
      filter_status: data?.filter_status
        ? data?.filter_status
        : openUpdateFilterModalValue?.filter_status,
      filter_serial: data?.filter_serial
        ? data?.filter_serial
        : openUpdateFilterModalValue?.filter_serial,
      category_id: category_id
        ? category_id
        : openUpdateFilterModalValue?.category_id,
      filter_slug: slugify(
        data?.filter_name
          ? data?.filter_name
          : openUpdateFilterModalValue?.filter_name,
        {
          lower: true,
          replacement: "-",
        }
      ),
    };
    updateFilter(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Filter update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
        reset();
        setLoading(false);
        setOpenUpdateFilterModal(false);
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
            Update Filter{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                reset();
                refetch();
                setOpenUpdateFilterModal(false);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>

        {/* Update A Filter Type */}

        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div>
            <label htmlFor="filter_name" className="font-medium">
              Filter Name
            </label>
            <input
              defaultValue={openUpdateFilterModalValue?.filter_name}
              {...register("filter_name")}
              id="filter_name"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="filter_serial" className="font-medium">
              Filter Serial
            </label>
            <input
              defaultValue={openUpdateFilterModalValue?.filter_serial}
              {...register("filter_serial")}
              id="filter_serial"
              type="number"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>

          <div className="mt-4">
            <label className="font-medium" htmlFor="filter_status">
              {" "}
              Filter Status{" "}
            </label>
            <select
              {...register("filter_status")}
              id="filter_status"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            >
              <option
                selected
                value={
                  filter_status
                    ? filter_status
                    : openUpdateFilterModalValue?.filter_status
                }
              >
                {filter_status
                  ? filter_status
                  : openUpdateFilterModalValue?.filter_status}
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

export default UpdateFilter;
