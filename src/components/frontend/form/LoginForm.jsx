"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { CiLock } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { AiOutlineMail } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useUserLoginMutation } from "@/redux/feature/auth/authApi";
import { AuthContext } from "@/context/context";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const { setUser } = useContext(AuthContext);
  const getQuery = useSearchParams();
  const successRedirect = getQuery.get("success_redirect");
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
      if (!data.agree) {
        return toast.error("Please Click Remember Me");
      }
      delete data.agree;

      const res = await userLogin(data);
      if (res?.data?.statusCode === 200 && res?.data?.success === true) {
        localStorage.setItem("user", res?.data?.data?.token);
        setUser(res?.data?.data?.user);
        toast.success(res?.data?.message, {
          autoClose: 2000,
        });
        reset();
        if (successRedirect) {
          router.push(successRedirect);
        } else {
          router.push("/");
        }
      } else {
        if (res?.error?.data?.data?.otp_page) {
          localStorage.setItem("user", JSON.stringify(data?.user_phone));
          router.push("/verify");
        }
        toast.error(res?.error?.data?.message, {
          autoClose: 2000,
        });
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
            minLength={11}
            maxLength={11}
            placeholder="Enter phone"
            className="w-full rounded-md border border-white-light bg-white px-4 py-2 text-sm text-black !outline-none ps-10 placeholder:text-white-dark"
            {...register("user_phone", {
              required: "Phone is Required!",
            })}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <AiOutlineMail />
          </span>
        </div>
        {errors.user_phone && (
          <span className="text-xs text-danger">
            {errors?.user_phone?.message}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="Password">Password</label>
        <div className="relative text-white-dark">
          <input
            id="Password"
            name="password"
            type={isPasswordShow ? "text" : "password"}
            placeholder="Enter Password"
            className="w-full rounded-md border border-white-light bg-white px-4 py-2 text-sm text-black !outline-none ps-10 placeholder:text-white-dark"
            {...register("password", {
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
      <div className="flex flex-col-reverse lg:flex-row justify-between">
        <label className="flex cursor-pointer items-center">
          <input
            {...register("agree", {
              required: "You must agree to the remember me",
            })}
            type="checkbox"
            className="form-checkbox bg-white"
          />
          <span className="text-white-dark ml-2">Remember me</span>
        </label>
        <Link
          href="/forget-password"
          className="flex cursor-pointer items-center"
        >
          <span className="text-danger underline ml-2">Forget Password</span>
        </Link>
      </div>
      <button
        type="submit"
        disabled={isSubmitting || Object.keys(errors).length > 0}
        className="bg-primaryColor text-white py-[6px] rounded-full !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
      >
        {loading || isLoading ? <MiniSpinner /> : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;
