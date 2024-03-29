"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useDeleteCouponMutation } from "@/redux/feature/coupon/couponApi";

const DeleteCoupon = ({
  refetch,
  setOpenDeleteCouponModal,
  openDeleteCouponModalId,
}) => {
  const [deleteCoupon, { isLoading }] = useDeleteCouponMutation(); //delete banner
  const [loading, setLoading] = useState(false);

  const handleDeleteCategory = async () => {
    setLoading(true);
    const sendData = {
      _id: openDeleteCouponModalId,
    };
    const res = await deleteCoupon(sendData);
    if (res?.data?.statusCode == 200 && res?.data?.success == true) {
      toast.success(
        res?.data?.message
          ? res?.data?.message
          : "Coupon Delete successfully !",
        {
          autoClose: 1000,
        }
      );
      refetch();
      setOpenDeleteCouponModal(false);
      setLoading(false);
    } else {
      toast.error(res?.error?.data?.message, {
        autoClose: 1000,
      });
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
            Delete Coupon
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => setOpenDeleteCouponModal(false)}
              size={25}
            ></RxCross1>
          </button>
        </div>

        <h2 className="text-red-500 text-center mt-8 text-xl">
          Are you sure you want to delete this Coupon?
        </h2>

        <div className="flex justify-end mt-6 gap-4">
          <button
            type="button"
            onClick={() => setOpenDeleteCouponModal(false)}
            className="btn px-6 py-2.5 transition-colors duration-300 transform bg-white rounded border hover:bg-primaryColor hover:text-white"
          >
            Cancel
          </button>
          {loading || isLoading ? (
            <button
              type="button"
              disabled
              className="px-6 py-2 text-white transition-colors duration-300 transform bg-red-500 rounded hover:bg-red-400"
            >
              <MiniSpinner />
            </button>
          ) : (
            <button
              onClick={() => handleDeleteCategory()}
              type="button"
              className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-red-500 rounded hover:bg-red-400"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteCoupon;
