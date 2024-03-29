"use client";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "@/context/context";
import { useAddReviewMutation } from "@/redux/feature/review/reviewApi";

const ReviewModal = ({ product, setOpenReviewModal }) => {
  const [loading, setLoading] = useState(false);
  const [addReview, { isLoading }] = useAddReviewMutation();
  const [rating, setRating] = useState(0);

  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleDataPost = async (data) => {
    try {
      setLoading(true);
      if (rating < 1) {
        return toast.error("Rating must be provide !");
      }
      data["review_user_phone"] = user?.user_phone;
      data["review_user_id"] = user?._id;
      data["review_product_id"] = product?._id;
      data["review_ratting"] = rating;
      data["review_status"] = "active";
      const res = await addReview(data);
      if (res?.data?.statusCode === 200 && res?.data?.success === true) {
        toast.success(res?.data?.message);
        setOpenReviewModal(false);
      } else {
        toast.error(res?.error?.data?.message);
        setOpenReviewModal(false);
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
            Write your opinion
          </h5>
          <button className="bg-white border p-1 hover:bg-primaryColor hover:text-white rounded">
            <RxCross1
              onClick={() => {
                setOpenReviewModal(false);
              }}
              size={14}
            ></RxCross1>
          </button>
        </div>

        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <label htmlFor="review_rating" className="font-medium mb-3">
            Rating
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((index) => (
              <FaStar
                key={index}
                className={`cursor-pointer ${
                  index <= rating
                    ? "fill-current text-yellow-400"
                    : "text-primary"
                }`}
                onClick={() => handleRatingClick(index)}
              />
            ))}
          </div>
          <div className="mt-4 w-full">
            <label htmlFor="review_description" className="font-medium">
              Review
            </label>
            <textarea
              rows={3}
              placeholder="Write your opinion"
              {...register("review_description", {
                required: "Review is required",
              })}
              id="review_description"
              className="w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded mt-2"
            />
            {errors.review_description && (
              <p className="text-red-600">
                {errors.review_description?.message}
              </p>
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

export default ReviewModal;
