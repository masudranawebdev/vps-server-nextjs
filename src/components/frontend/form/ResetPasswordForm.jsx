"use client";
import { AiOutlineMail } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useForgetPasswordMutation } from "@/redux/feature/auth/authApi";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { toast } from "react-toastify";

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const submitForm = async (data) => {
    try {
      setLoading(true);
      const res = await forgetPassword(data);
      if (res?.data?.statusCode === 200 && res?.data?.success === true) {
        localStorage.setItem(
          "user_phone",
          JSON.stringify(res?.data?.data?.user_phone)
        );
        toast.info(res?.data?.message);
        router.push("/change-password");
        reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(submitForm)}>
      <div>
        <label htmlFor="phone">Phone</label>
        <div className="relative text-white-dark">
          <input
            id="phone"
            type="phone"
            placeholder="Enter Phone number"
            className="form-input ps-10 placeholder:text-white-dark"
            {...register("user_phone", { required: "user phone is required!" })}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <AiOutlineMail />
          </span>
        </div>
        {errors?.user_phone && (
          <span className="text-danger text-xs">
            {errors?.user_phone?.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="bg-primaryColor text-white py-[6px] rounded-full !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
      >
        {loading || isLoading ? <MiniSpinner /> : "RECOVER"}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
