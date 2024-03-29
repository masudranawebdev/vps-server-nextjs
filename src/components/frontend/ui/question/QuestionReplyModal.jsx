"use client";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useUpdateQuestionMutation } from "@/redux/feature/question/questionApi";

const QuestionReplyModal = ({ questionValue, setOpenQuestionReplyModal }) => {
  const [loading, setLoading] = useState(false);
  const [updateQuestion, { isLoading }] = useUpdateQuestionMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDataPost = async (data) => {
    try {
      setLoading(true);
      data["_id"] = questionValue?._id;
      data["question_name"] = questionValue?.question_name;
      data["question_user_phone"] = questionValue?.question_user_id?.user_phone;
      data["question_user_id"] = questionValue?.question_user_id?._id;
      data["question_product_id"] = questionValue?.question_product_id?._id;
      //   data["question_name"] = data?.question_answer;
      const res = await updateQuestion(data);
      if (res?.data?.statusCode === 200 && res?.data?.success === true) {
        toast.success(res?.data?.message);
        setOpenQuestionReplyModal(false);
      } else {
        toast.error(res?.error?.data?.message);
        setOpenQuestionReplyModal(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative overflow-hidden bg-white w-full lg:w-[30vw] p-6 rounded overflow-y-auto">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-[#0A0A0A] capitalize">
            Write your Question
          </h5>
          <button className="bg-white border p-1 hover:bg-primaryColor hover:text-white rounded">
            <RxCross1
              onClick={() => {
                setOpenQuestionReplyModal(false);
              }}
              size={14}
            ></RxCross1>
          </button>
        </div>

        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div className="mt-4 w-full">
            <label htmlFor="question_name" className="font-medium">
              Question
            </label>
            <textarea
              rows={2}
              disabled
              defaultValue={questionValue?.question_name}
              placeholder="Write your opinion"
              {...register("question_name")}
              id="question_name"
              className="w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded mt-2"
            />
          </div>
          <div className="mt-4 w-full">
            <label htmlFor="question_answer" className="font-medium">
              Answer
            </label>
            <textarea
              rows={2}
              placeholder="Write your answer"
              defaultValue={questionValue?.question_answer}
              {...register("question_answer", {
                required: "Answer is Required!",
              })}
              id="question_answer"
              className="w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded mt-2"
            />
            {errors.question_answer && (
              <p className="text-red-600">{errors.question_answer?.message}</p>
            )}
          </div>
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
                className="px-4 py-2 text-white transition-colors duration-300 transform bg-primaryColor rounded hover:bg-primaryColor"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionReplyModal;
