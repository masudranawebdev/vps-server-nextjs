
"use client";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
/* eslint-disable react/prop-types */
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useDeleteQuestionMutation } from "../../../redux/feature/question/questionApi";

const DeleteQuestion = ({
    refetch,
    setOpenDeleteQuestionModal,
    openDeleteQuestionModalValue,
}) => {
    const [deleteAQuestion] = useDeleteQuestionMutation(); //delete A Question
    const [loading, setLoading] = useState(false);

    const handleDeleteSub_Category = () => {
        setLoading(true)
        const sendData = {
            _id: openDeleteQuestionModalValue?._id,
        };
        deleteAQuestion(sendData).then((result) => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(
                    result?.data?.message
                        ? result?.data?.message
                        : "Question Delete Successfully !",
                    {
                        autoClose: 1000,
                    }
                );
                refetch();
                setOpenDeleteQuestionModal(false);
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
              Delete Question{" "}
            </h3>
            <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
              <RxCross1
                onClick={() => setOpenDeleteQuestionModal(false)}
                size={25}
              ></RxCross1>
            </button>
          </div>

          <h2 className="text-red-500 mt-8 text-xl">
            Are you sure you want to delete this Question ?
          </h2>

          <p className="text-gray-500 mt-4 text-xl">
            <strong className="text-black">Question Name:</strong>{" "}
            {openDeleteQuestionModalValue?.question_name}
          </p>
          <p className="text-gray-500 mt-4 text-xl">
            <strong className="text-black">Answer Name:</strong>{" "}
            {openDeleteQuestionModalValue?.question_answer}
          </p>

          <div className="flex justify-end mt-6 gap-4">
            <button
              type="button"
              onClick={() => setOpenDeleteQuestionModal(false)}
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

export default DeleteQuestion;
