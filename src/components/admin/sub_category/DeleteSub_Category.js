"use client";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
/* eslint-disable react/prop-types */
import { useDeleteSub_CategoryMutation } from "@/redux/feature/sub_category/sub_categoryApi";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";

const DeleteSub_Category = ({
  refetch,
  setOpenDeleteSub_CategoryModal,
  openDeleteSub_CategoryModalValue,
}) => {
  const [deleteSub_CategoryType] = useDeleteSub_CategoryMutation(); //delete sub category
  const [loading, setLoading] = useState(false);

  const handleDeleteSub_Category = () => {
    setLoading(true);
    const sendData = {
      _id: openDeleteSub_CategoryModalValue?._id,
      public_id: openDeleteSub_CategoryModalValue?.public_id,
    };
    deleteSub_CategoryType(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Sub Category Delete successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setOpenDeleteSub_CategoryModal(false);
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
            Delete Sub Category{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => setOpenDeleteSub_CategoryModal(false)}
              size={25}
            ></RxCross1>
          </button>
        </div>

        <h2 className="text-red-500 text-center mt-8 text-xl">
          Are you sure you want to delete this sub category name:{" "}
          {openDeleteSub_CategoryModalValue?.sub_category_name} ?
        </h2>

        <div className="flex justify-end mt-6 gap-4">
          <button
            type="button"
            onClick={() => setOpenDeleteSub_CategoryModal(false)}
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

export default DeleteSub_Category;
