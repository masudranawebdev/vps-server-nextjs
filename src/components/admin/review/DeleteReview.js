"use client";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
/* eslint-disable react/prop-types */
import { useDeleteReviewMutation } from "@/redux/feature/review/reviewApi";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";

const DeleteReview = ({
    refetch,
    setOpenDeleteReviewModal,
    openDeleteReviewModalValue,
}) => {
    const [deleteAReview] = useDeleteReviewMutation(); //delete A Review
    const [loading, setLoading] = useState(false);

    const handleDeleteSub_Category = () => {
        setLoading(true)
        const sendData = {
            _id: openDeleteReviewModalValue?._id,
        };
        deleteAReview(sendData).then((result) => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(
                    result?.data?.message
                        ? result?.data?.message
                        : "Review Delete successfully !",
                    {
                        autoClose: 1000,
                    }
                );
                refetch();
                setOpenDeleteReviewModal(false);
                setLoading(false)
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
              Delete Review{" "}
            </h3>
            <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
              <RxCross1
                onClick={() => setOpenDeleteReviewModal(false)}
                size={25}
              ></RxCross1>
            </button>
          </div>

          <h2 className="text-red-500 text-center mt-8 text-xl">
            Are you sure you want to delete this Review ?
          </h2>

          <div className="flex justify-end mt-6 gap-4">
            <button
              type="button"
              onClick={() => setOpenDeleteReviewModal(false)}
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
                onClick={() => handleDeleteSub_Category()}
                type="button"
                className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-red-500 rounded-xl hover:bg-red-400"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    );
};

export default DeleteReview;
