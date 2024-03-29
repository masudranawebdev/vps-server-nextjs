"use client";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useUpdateProductPriceStatusMutation } from "@/redux/feature/product/productApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";

const UpdatePrice = ({ refetch, setIsUpdatePrice, updatePriceValue }) => {
  const [updateProductpriceQuantity] = useUpdateProductPriceStatusMutation(); //update product price quantity
  const [loading, setLoading] = useState(false);

  const isProduct_status = updatePriceValue?.product_status;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDataPost = (data) => {
    setLoading(true);
    const sendData = {
      _id: updatePriceValue?._id,
      product_price: data?.product_price,
      product_ecommerce_price: data?.product_ecommerce_price,
      product_discount_price: data?.product_discount_price,
      product_quantity: data?.product_quantity,
      product_status: data?.product_status,
    };
    updateProductpriceQuantity(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Brand Delete successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setIsUpdatePrice(false);
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
      <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-full lg:w-5/12 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3
            className="text-[26px] font-bold text-[#0A0A0A] capitalize"
            id="modal-title"
          >
            {" "}
            Update Price{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => setIsUpdatePrice(false)}
              size={25}
            ></RxCross1>
          </button>
        </div>

        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div>
            <label htmlFor="product_price" className="font-medium">
              Price
            </label>
            <input
              defaultValue={updatePriceValue?.product_price}
              {...register("product_price", {
                required: "Price is required",
              })}
              id="product_price"
              type="number"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.product_price && (
              <p className="text-red-600">{errors.product_price?.message}</p>
            )}
          </div>
          <div className="mt-4">
            <label htmlFor="product_ecommerce_price" className="font-medium">
              E-Commerce Price
            </label>
            <input
              defaultValue={updatePriceValue?.product_ecommerce_price}
              {...register("product_ecommerce_price")}
              id="product_ecommerce_price"
              type="number"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="product_discount_price" className="font-medium">
              Discount Price
            </label>
            <input
              defaultValue={updatePriceValue?.product_discount_price}
              {...register("product_discount_price")}
              id="product_discount_price"
              type="number"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="product_quantity" className="font-medium">
              Quantity
            </label>
            <input
              defaultValue={updatePriceValue?.product_quantity}
              {...register("product_quantity", {
                required: "Quantity is required",
              })}
              id="product_quantity"
              type="number"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.product_quantity && (
              <p className="text-red-600">{errors.product_quantity?.message}</p>
            )}
          </div>
          <div className="mt-4">
            <label className="font-medium" htmlFor="product_status">
              {" "}
              Product Status{" "}
            </label>
            <select
              {...register("product_status")}
              id="product_status"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            >
              <option
                className="uppercase"
                disabled
                selected
                value={
                  isProduct_status
                    ? isProduct_status
                    : updatePriceValue?.product_status
                }
              >
                {isProduct_status
                  ? isProduct_status
                  : updatePriceValue?.product_status}
              </option>
              <option value="active">Active</option>
              <option value="in-active">In-Active</option>
            </select>
            {errors.product_status && (
              <p className="text-red-600">{errors.product_status?.message}</p>
            )}
          </div>
          <div className="flex justify-end mt-6 gap-4">
            <button
              type="button"
              onClick={() => setIsUpdatePrice(false)}
              className="btn px-6 py-2.5 transition-colors duration-300 transform bg-white rounded-xl border hover:bg-primaryColor hover:text-white"
            >
              Cancel
            </button>
            {loading ? (
              <button
                type="button"
                disabled
                className="px-6 py-2 text-white transition-colors duration-300 transform bg-red-500 rounded-xl hover:bg-red-400"
              >
                <MiniSpinner />
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-red-500 rounded-xl hover:bg-red-400"
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

export default UpdatePrice;
