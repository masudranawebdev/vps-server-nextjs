"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { CiLock } from "react-icons/ci";
import { LuPhone } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AiOutlineMail } from "react-icons/ai";
import { FaEye, FaEyeSlash, FaRegUser } from "react-icons/fa";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useUserRegistrationMutation } from "@/redux/feature/auth/authApi";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [isConfirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [userRegistration, { isLoading }] = useUserRegistrationMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const router = useRouter();
  const submitForm = async (data) => {
    try {
      setLoading(true);
      const user_name = data?.first_name + " " + data?.last_name;
      data["user_name"] = user_name;
      if (data.user_password !== data.confirm_password) {
        return toast.error("password does not match!");
      }
      delete data.first_name;
      delete data.last_name;
      delete data.confirm_password;
      delete data.agree;

      const res = await userRegistration(data);
      console.log(res);

      if (res.data?.statusCode === 200 && res.data?.success === true) {
        localStorage.setItem(
          "user",
          JSON.stringify(res?.data?.data?.user_phone)
        );
        toast.info(res?.data?.message, {
          autoClose: 2000,
        });
        router.push("/verify");
        reset();
      } else {
        toast.error(res.error.data?.message, {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(loading);

  return (
    <form className="space-y-5" onSubmit={handleSubmit(submitForm)}>
      <div className="flex gap-3 flex-col lg:flex-row">
        <div>
          <label htmlFor="first_name">First Name</label>
          <span className="text-xs text-danger">*</span>
          <div className="relative text-white-dark">
            <input
              id="first_name"
              name="first_name"
              type="text"
              placeholder="Enter Name"
              className="form-input ps-10 placeholder:text-white-dark"
              {...register("first_name", {
                required: "First Name is Required!",
              })}
            />
            <span className="absolute start-4 top-1/2 -translate-y-1/2">
              <FaRegUser />
            </span>
          </div>
          {errors.first_name && (
            <span className="text-xs text-danger">
              {errors?.first_name?.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <span className="text-xs text-danger">*</span>
          <div className="relative text-white-dark">
            <input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Enter Name"
              className="form-input ps-10 placeholder:text-white-dark"
              {...register("last_name", {
                required: "Last Name is Required!",
              })}
            />
            <span className="absolute start-4 top-1/2 -translate-y-1/2">
              <FaRegUser />
            </span>
          </div>
          {errors.last_name && (
            <span className="text-xs text-danger">
              {errors?.last_name?.message}
            </span>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <span className="text-xs text-danger">*</span>
        <div className="relative text-white-dark">
          <input
            id="phone"
            name="user_phone"
            type="text"
            minLength={11}
            maxLength={11}
            placeholder="Enter Number"
            className="w-full rounded-md border border-white-light bg-white px-4 py-2 text-sm text-black !outline-none ps-10 placeholder:text-white-dark"
            {...register("user_phone", {
              required: "Phone Number is Required!",
            })}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <LuPhone />
          </span>
        </div>
        {errors.user_phone && (
          <span className="text-xs text-danger">
            {errors?.user_phone?.message}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="Email">Email</label>
        <span className="text-xs text-danger">*</span>
        <div className="relative text-white-dark">
          <input
            id="Email"
            name="user_email"
            type="email"
            placeholder="Enter Email"
            className="w-full rounded-md border border-white-light bg-white px-4 py-2 text-sm text-black !outline-none ps-10 placeholder:text-white-dark"
            {...register("user_email", {
              required: "Email is Required!",
            })}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <AiOutlineMail />
          </span>
        </div>
        {errors.user_email && (
          <span className="text-xs text-danger">
            {errors?.user_email?.message}
          </span>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-3">
        <div>
          <label htmlFor="Password">Password</label>
          <span className="text-xs text-danger">*</span>
          <div className="relative text-white-dark">
            <input
              id="Password"
              name="user_password"
              type={isPasswordShow ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full rounded-md border border-white-light bg-white px-4 py-2 text-sm text-black !outline-none ps-10 placeholder:text-white-dark"
              {...register("user_password", {
                required: "Password is Required!",
              })}
            />
            <span className="absolute start-4 top-1/2 -translate-y-1/2">
              <CiLock />
            </span>
            <span
              onClick={() => setPasswordShow(!isPasswordShow)}
              className="absolute end-4 top-1 translate-y-1/2 cursor-pointer"
            >
              {isPasswordShow ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.user_password && (
            <span className="text-xs text-danger">
              {errors?.user_password?.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <span className="text-xs text-danger">*</span>
          <div className="relative text-white-dark">
            <input
              id="confirmPassword"
              name="confirm_password"
              type={isConfirmPasswordShow ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full rounded-md border border-white-light bg-white px-4 py-2 text-sm text-black !outline-none ps-10 placeholder:text-white-dark"
              {...register("confirm_password", {
                required: "Confirm Password is Required!",
              })}
            />
            <span className="absolute start-4 top-1/2 -translate-y-1/2">
              <CiLock />
            </span>
            <span
              onClick={() => setConfirmPasswordShow(!isConfirmPasswordShow)}
              className="absolute end-4 top-1 translate-y-1/2 cursor-pointer"
            >
              {isConfirmPasswordShow ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.confirm_password && (
            <span className="text-xs text-danger">
              {errors?.confirm_password?.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        <label className="flex cursor-pointer items-center">
          <input
            {...register("agree", {
              required: "You must agree to the terms and conditions.",
            })}
            type="checkbox"
            className="form-checkbox bg-white"
          />
          <span className="text-white-dark ml-2">Do you have agree with? </span>
        </label>
        <Link
          href="/term-&-condition"
          className="flex cursor-pointer items-center"
        >
          <span className="underline ml-2">Term & Condition</span>
        </Link>
      </div>
      <button
        type="submit"
        disabled={isSubmitting || Object.keys(errors).length > 0}
        className="bg-primaryColor text-white py-[6px] rounded-full !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
      >
        {isLoading ? <MiniSpinner /> : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;
