"use client";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
// import AddCouponProduct from "./AddCouponProduct";
import { useAddCouponMutation } from "@/redux/feature/coupon/couponApi";
import { toast } from "react-toastify";

const AddCoupon = ({ refetch, setOpenAddCouponModal }) => {
  const [loading, setLoading] = useState(false);
  // const [customerProductType, setCustomerProductType] = useState("");
  // const [addProduct, setAddProduct] = useState([]);
  const [addCoupon, { isLoading }] = useAddCouponMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDataPost = async (data) => {
    try {
      setLoading(true);
      data["coupon_customer_type"] = "all";
      data["coupon_status"] = "in-active";
      const res = await addCoupon(data);
      if (res?.data?.statusCode === 200 && res?.data?.success === true) {
        toast.success(res?.data?.message);
        refetch();
        setOpenAddCouponModal(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative overflow-hidden bg-white w-full lg:w-10/12 p-6  max-h-[90vh] rounded overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-[24px] font-semibold text-[#0A0A0A] capitalize">
            Add Coupon
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                setOpenAddCouponModal(false);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>

        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div className="mt-4 w-full lg:w-1/2">
            <label htmlFor="coupon_code" className="font-medium">
              Coupon Code
            </label>
            <input
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
            {errors.coupon_code && (
              <p className="text-red-600">{errors.coupon_code?.message}</p>
            )}
          </div>

          <div className="flex gap-3 mt-5">
            <div className="mt-4 w-1/2">
              <label htmlFor="coupon_amount" className="font-medium">
                Coupon Amount
              </label>
              <input
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
                className="w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded mt-2"
              >
                <option disabled selected>
                  --None--
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
                placeholder="Coupon end date"
                {...register("coupon_end_date")}
                id="coupon_end_date"
                type="date"
                className="w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded mt-2"
              />
            </div>
          </div>
          {/* <div className="flex flex-col lg:flex-row gap-3 mt-5">
            <div className="mt-4 w-full lg:w-1/2">
              <label className="font-medium" htmlFor="coupon_products_type">
                Coupon Product Type
              </label>
              <select
                onClick={(e) => setCustomerProductType(e.target.value)}
                {...register("coupon_products_type", {
                  required: "Coupon products type is required",
                  validate: (value) => value !== "--None--",
                })}
                id="coupon_products_type"
                className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded mt-2"
              >
                <option disabled selected>
                  --None--
                </option>
                <option value="all">All</option>
                <option value="specific">Specific</option>
              </select>
              {errors.coupon_product_type && (
                <p className="text-red-600">
                  {errors.coupon_product_type?.message}
                </p>
              )}
            </div>
          </div> */}
          {/* {customerProductType === "specific" && (
            <div>
              <AddCouponProduct
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
                Create
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
