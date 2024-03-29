"use client";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { CiLock } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useChangePasswordMutation } from "@/redux/feature/auth/authApi";
import { toast } from "react-toastify";

const ChangePasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const submitForm = async (data) => {
    try {
      setLoading(true);
      data["user_phone"] = phone;
      if (data.user_password !== data.confirm_password) {
        return toast.error("Password does not match!");
      }
      delete data.confirm_password;
      parseInt(data?.user_otp);

      const res = await changePassword(data);
      if (res?.data?.statusCode === 200 && res?.data?.success === true) {
        localStorage.removeItem("user_phone");
        toast.success(res?.data?.message);
        router.push("/signin");
        reset();
      } else {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userPhone = JSON.parse(localStorage.getItem("user_phone"));
    setPhone(userPhone);
  }, []);
  return (
    <form className="space-y-5" onSubmit={handleSubmit(submitForm)}>
      <div>
        <label htmlFor="otp">Otp</label>
        <div className="relative text-white-dark">
          <input
            id="otp"
            type="text"
            maxLength={4}
            minLength={4}
            pattern="\d*"
            placeholder="Enter otp"
            className="form-input ps-10 placeholder:text-white-dark appearance-none"
            {...register("user_otp", {
              required: "User Otp is Required!",
              pattern: {
                value: /^\d{4}$/, // Use a regular expression to enforce exactly 4 digits
                message: "Otp must be a 4-digit number.",
              },
            })}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <CiLock />
          </span>
        </div>
        {errors?.user_otp && (
          <span className="text-xs text-danger">
            {errors?.user_otp?.message}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="new_password" className="">
          New Password
        </label>
        <div className="relative text-white-dark">
          <input
            id="new_password"
            type="password"
            placeholder="Enter New Password"
            className="form-input ps-10 placeholder:text-white-dark"
            {...register("user_password", {
              required: "New Password is required!",
            })}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <CiLock />
          </span>
        </div>
        {errors?.user_password && (
          <span className="text-xs text-danger">
            {errors?.user_password?.message}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="confirm_password" className="">
          Confirm Password
        </label>
        <div className="relative text-white-dark">
          <input
            id="confirm_password"
            type="password"
            placeholder="Enter New Password"
            className="form-input ps-10 placeholder:text-white-dark"
            {...register("confirm_password", {
              required: "Confirm Password is required!",
            })}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <CiLock />
          </span>
        </div>
        {errors?.confirm_password && (
          <span className="text-xs text-danger">
            {errors?.confirm_password?.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="bg-primaryColor text-white py-[6px] rounded-full !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
      >
        {loading || isLoading ? <MiniSpinner /> : "UNLOCK"}
      </button>
    </form>
  );
};

export default ChangePasswordForm;
