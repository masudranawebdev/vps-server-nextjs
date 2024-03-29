"use client";

import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useAddSpecificationMutation } from "@/redux/feature/specification/specificationApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import slugify from "slugify";

const AddSpecification = ({ refetch, setOpenAddSpecificationModal }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [postSpecificationType] = useAddSpecificationMutation(); //post Specification

  // post a Specification
  const handleDataPost = (data) => {
    setLoading(true);
    const specification_slug = slugify(data?.specification_name, {
      lower: true,
      replacement: "-",
    });
    const sendData = {
      specification_slug,
      specification_name: data?.specification_name,
      specification_serial: data?.specification_serial,
    };
    postSpecificationType(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Specification Added successfully !",
          {
            autoClose: 1000,
          }
        );
        reset();
        refetch();
        setOpenAddSpecificationModal(false);
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
            Add Specification{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                setOpenAddSpecificationModal(false);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>

        {/* Add A Specification Type */}

        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div>
            <label htmlFor="specification_name" className="font-medium">
              Specification Name
            </label>
            <input
              placeholder="Specification Name"
              {...register("specification_name", {
                required: "Specification Name is required",
              })}
              id="specification_name"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.specification_name && (
              <p className="text-red-600">
                {errors.specification_name?.message}
              </p>
            )}
          </div>
          <div className="mt-4">
            <label htmlFor="specification_serial" className="font-medium">
              Specification Serial
            </label>
            <input
              placeholder="Specification Serial"
              {...register("specification_serial", {
                required: "Specification Serial is required",
              })}
              id="specification_serial"
              type="number"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.specification_serial && (
              <p className="text-red-600">
                {errors.specification_serial?.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end mt-4">
            {loading ? (
              <button
                type="button"
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

export default AddSpecification;
