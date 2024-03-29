
"use client";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useUpdateQuestionMutation } from "@/redux/feature/question/questionApi";
/* eslint-disable react/prop-types */
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const EditQuestion = ({
    refetch,
    setOpenEditQuestionModal,
    openEditQuestionModalValue,
}) => {
    const [updateAQuestion] = useUpdateQuestionMutation(); //update A Question
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit} = useForm();

    const handleDataPost = (data) => {
        setLoading(true)
        const sendData = {
            _id: openEditQuestionModalValue?._id,
            question_answer: data?.question_answer ? data?.question_answer : openEditQuestionModalValue?.question_answer
        };
        updateAQuestion(sendData).then((result) => {
            if (result?.data?.statusCode == 200 && result?.data?.success == true) {
                toast.success(
                    result?.data?.message
                        ? result?.data?.message
                        : "Question Update Successfully !",
                    {
                        autoClose: 1000,
                    }
                );
                refetch();
                setOpenEditQuestionModal(false);
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
            <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[750px] p-6 max-h-[100vh] overflow-y-auto">
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
                            onClick={() => setOpenEditQuestionModal(false)}
                            size={25}
                        ></RxCross1>
                    </button>
                </div>

                <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
                    <div>
                        <label htmlFor="question_name" className="font-medium">
                            Question Name
                        </label>
                        <input
                            value={openEditQuestionModalValue?.question_name}
                            disabled
                            id="question_name"
                            type="text"
                            className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="question_answer" className="font-medium">
                            Question Answer
                        </label>
                        <input
                            defaultValue={openEditQuestionModalValue?.question_answer}
                            {...register("question_answer")}
                            id="question_answer"
                            type="text"
                            className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
                        />
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
                                Create
                            </button>
                        )}
                    </div>

                </form>

            </div>
        </div>
    );
};

export default EditQuestion;
