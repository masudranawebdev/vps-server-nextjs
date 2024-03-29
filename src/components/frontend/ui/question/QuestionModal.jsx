"use client";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/context";
import { useAddQuestionMutation } from "@/redux/feature/question/questionApi";

const QuestionModal = ({ product, setOpenQuestionModal }) => {
  const [loading, setLoading] = useState(false);
  const [addQuestion, { isLoading }] = useAddQuestionMutation();

  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDataPost = async (data) => {
    try {
      setLoading(true);
      data["question_user_phone"] = user?.user_phone;
      data["question_user_id"] = user?._id;
      data["question_product_id"] = product?._id;
      const res = await addQuestion(data);
      if (res?.data?.statusCode === 200 && res?.data?.success === true) {
        toast.success(res?.data?.message);
        setOpenQuestionModal(false);
      } else {
        toast.error(res?.error?.data?.message);
        setOpenQuestionModal(false);
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
                setOpenQuestionModal(false);
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
              placeholder="Write your opinion"
              {...register("question_name", {
                required: "Question is required",
              })}
              id="question_name"
              className="w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded mt-2"
            />
            {errors.question_name && (
              <p className="text-red-600">{errors.question_name?.message}</p>
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

export default QuestionModal;
