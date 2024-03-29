"use client";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
// import EditCouponProduct from "./EditCouponProduct";
import { useUpdateCouponMutation } from "@/redux/feature/coupon/couponApi";
import { toast } from "react-toastify";

const UpdateCoupon = ({
  refetch,
  setOpenUpdateCouponModal,
  openUpdateCouponModalValue,
}) => {
  const [loading, setLoading] = useState(false);
  // const [couponProductType, setCouponProductType] = useState(
  //   openUpdateCouponModalValue?.coupon_products_type
  // );
  // const [addProduct, setAddProduct] = useState(
  //   openUpdateCouponModalValue?.coupon_specific_products
  // );
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [updateCoupon, { isLoading }] = useUpdateCouponMutation();

  // update a Banner
  const handleDataPost = async (data) => {
    try {
      setLoading(true);
      data["_id"] = openUpdateCouponModalValue?._id;
      data["coupon_customer_type"] = "all";
      // data["coupon_specific_products"] = addProduct?.map((product) => ({
      //   coupon_product_id: product?.coupon_product_id?._id,
      // }));
      const res = await updateCoupon(data);
      if (res?.data?.statusCode == 200 && res?.data?.success == true) {
        toast.success(
          res?.data?.message
            ? res?.data?.message
            : "Coupon update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
        reset();
        setOpenUpdateCouponModal(false);
        setLoading(false);
      } else {
        toast.error(res?.error?.data?.message, {
          autoClose: 1000,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
            Update Coupon
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                reset();
                refetch();
                setOpenUpdateCouponModal(false);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>

        {/* Update A Banner Type */}

        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div className="mt-4 w-full lg:w-1/2">
            <label htmlFor="coupon_code" className="font-medium">
              Coupon Code
            </label>
            <input
              defaultValue={openUpdateCouponModalValue?.coupon_code}
              placeholder="Coupon Code"
              {...register(
                "coupon_code",
                { min: 1 },
                {
                  required: "Coupon Code is required",
                }
              )}
              id="coupon_code"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded mt-2"
            />
            {errors?.coupon_code && (
              <p className="text-red-600">{errors.coupon_code?.message}</p>
            )}
          </div>

          <div className="flex gap-3 mt-5">
            <div className="mt-4 w-1/2">
              <label htmlFor="coupon_amount" className="font-medium">
                Coupon Amount
              </label>
              <input
                defaultValue={openUpdateCouponModalValue?.coupon_amount}
                placeholder="Coupon Amount"
                {...register("coupon_amount")}
                id="coupon_amount"
                type="text"
                className="w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded mt-2"
              />
            </div>
            <div className="mt-4 w-1/2">
              <label className="font-medium" htmlFor="coupon_type">
                Coupon Type
              </label>
              <select
                {...register("coupon_type", {
                  required: "Coupon Type is required",
                  validate: (value) => value !== "--None--",
                })}
                id="coupon_type"
                defaultValue={openUpdateCouponModalValue?.coupon_type}
                className="w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded mt-2"
              >
                <option
                  className="capitalize"
                  value="--None--"
                  disabled
                  selected
                >
                  {openUpdateCouponModalValue?.coupon_type}
                </option>
                <option value="fixed">fixed</option>
                <option value="percent">percent</option>
              </select>
              {errors.coupon_type && (
                <p className="text-red-600">{errors.coupon_type?.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-3 mt-5">
            <div className="mt-4 w-1/2">
              <label htmlFor="coupon_use_per_person" className="font-medium">
                Coupon use per person
              </label>
              <input
                defaultValue={openUpdateCouponModalValue?.coupon_use_per_person}
                placeholder="Coupon use per person"
                {...register("coupon_use_per_person")}
                id="coupon_use_per_person"
                type="number"
                className="w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded mt-2"
              />
            </div>
            <div className="mt-4 w-1/2">
              <label htmlFor="coupon_use_total_person" className="font-medium">
                Coupon use total person
              </label>
              <input
                placeholder="Coupon use total person"
                defaultValue={
                  openUpdateCouponModalValue?.coupon_use_total_person
                }
                {...register("coupon_use_total_person")}
                id="coupon_use_total_person"
                type="number"
                className="w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded mt-2"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-3 mt-5">
            <div className="mt-4 w-1/2">
              <label htmlFor="coupon_start_date" className="font-medium">
                Start Date
              </label>
              <input
                defaultValue={openUpdateCouponModalValue?.coupon_start_date}
                placeholder="coupon start date"
                {...register("coupon_start_date")}
                id="coupon_start_date"
                type="date"
                className="w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded mt-2"
              />
            </div>
            <div className="mt-4 w-1/2">
              <label htmlFor="coupon_end_date" className="font-medium">
                End Date
              </label>
              <input
                defaultValue={openUpdateCouponModalValue?.coupon_end_date}
                placeholder="Coupon end date"
                {...register("coupon_end_date")}
                id="coupon_end_date"
                type="date"
                className="w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded mt-2"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-3 mt-5">
            <div className="mt-4 w-full lg:w-1/2">
              <label className="font-medium" htmlFor="coupon_status">
                Coupon Status
              </label>
              <select
                {...register("coupon_status", {
                  required: "Coupon status is required",
                  validate: (value) => value !== "--None--",
                })}
                id="coupon_status"
                defaultValue={openUpdateCouponModalValue?.coupon_status}
                className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded mt-2"
              >
                <option disabled value="--None--">
                  {openUpdateCouponModalValue?.coupon_status}
                </option>
                <option value="active">Active</option>
                <option value="in-active">In-Active</option>
              </select>
              {errors.coupon_status && (
                <p className="text-red-600">{errors.coupon_status?.message}</p>
              )}
            </div>
            {/* <div className="mt-4 w-full lg:w-1/2">
              <label className="font-medium" htmlFor="coupon_products_type">
                Coupon Product Type
              </label>
              <select
                onClick={(e) => setCouponProductType(e.target.value)}
                {...register("coupon_products_type", {
                  required: "Coupon products type is required",
                  validate: (value) => value !== "--None--",
                })}
                id="coupon_products_type"
                defaultValue={openUpdateCouponModalValue?.coupon_products_type}
                className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded mt-2"
              >
                <option disabled value="--None--">
                  {openUpdateCouponModalValue?.coupon_products_type}
                </option>
                <option value="all">All</option>
                <option value="specific">Specific</option>
              </select>
              {errors.coupon_product_type && (
                <p className="text-red-600">
                  {errors.coupon_product_type?.message}
                </p>
              )}
            </div> */}
          </div>
          {/* {couponProductType === "specific" && (
            <div>
              <EditCouponProduct
                setAddProduct={setAddProduct}
                addProduct={addProduct}
              />
            </div>
          )} */}

          <div className="flex items-center justify-end mt-4">
            {loading || isLoading ? (
              <button
                type="button"
                disabled
                className="px-6 py-2 text-white transition-colors duration-300 transform bg-primaryColor rounded hover:bg-primaryColor"
              >
                <MiniSpinner />
              </button>
            ) : (
              <button
                type="Submit"
                className="px-6 py-2 text-white transition-colors duration-300 transform bg-primaryColor rounded hover:bg-primaryColor"
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

export default UpdateCoupon;
