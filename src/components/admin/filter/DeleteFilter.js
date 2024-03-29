"use client";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useDeleteFilterMutation } from "@/redux/feature/filter/filterApi";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";

const DeleteFilter = ({
  refetch,
  setOpenDeleteFilterModal,
  openDeleteFilterModalValue,
}) => {
  const [deleteFilterType] = useDeleteFilterMutation(); //delete Filter
  const [loading, setLoading] = useState(false);

  const handleDeleteFilter = () => {
    setLoading(true);
    const sendData = {
      _id: openDeleteFilterModalValue?._id,
    };
    deleteFilterType(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Filter Delete successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setOpenDeleteFilterModal(false);
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
            Delete Filter{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => setOpenDeleteFilterModal(false)}
              size={25}
            ></RxCross1>
          </button>
        </div>

        <h2 className="text-red-500 text-center mt-8 text-xl">
          Are you sure you want to delete this Filter name:{" "}
          {openDeleteFilterModalValue?.filter_name} ?
        </h2>

        <div className="flex justify-end mt-6 gap-4">
          <button
            type="button"
            onClick={() => setOpenDeleteFilterModal(false)}
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
              onClick={() => handleDeleteFilter()}
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

export default DeleteFilter;