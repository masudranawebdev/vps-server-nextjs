"use client";

import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { AuthContext } from "@/context/context";
import { useChangeUserPasswordMutation } from "@/redux/feature/auth/authApi";
import withAuth from "@/utils/withAuth";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SettingSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user, loading } = useContext(AuthContext);
  const [chaneUserPassword, { isLoading }] = useChangeUserPasswordMutation();
  const handleOnSubmit = async (data) => {
    try {
      data["user_phone"] = user?.user_phone;
      if (data?.new_password !== data?.confirm_password) {
        return toast.error("Password does not match!");
      }
      delete data?.confirm_password;
      const res = await chaneUserPassword(data);
      if (res.data?.statusCode === 200 && res.data?.success === true) {
        toast.success(res?.data?.message, {
          autoClose: 1500,
        });
        reset();
      } else {
        toast.error(res.error.data?.message, {
          autoClose: 1500,
        });
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!user || loading) {
    return "Loading...";
  }
  return (
    <div className="p-1">
      <section className="p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 capitalize">
          Change Password
        </h2>

        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
            <div>
              <label className="text-gray-700" htmlFor="current_password">
                Current Password
              </label>
              <input
                id="current_password"
                placeholder="Current password"
                type="password"
                {...register("current_password", {
                  required: "Current Password is required!",
                })}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
              {errors.current_password && (
                <span className="text-danger">
                  {errors.current_password?.message}
                </span>
              )}
            </div>

            <div>
              <label className="text-gray-700" htmlFor="new_password">
                New Password
              </label>
              <input
                id="new_password"
                placeholder="new password"
                type="password"
                {...register("new_password", {
                  required: "New Password is required!",
                })}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              {errors.new_password && (
                <span className="text-danger">
                  {errors.new_password?.message}
                </span>
              )}
            </div>
            <div>
              <label className="text-gray-700" htmlFor="confirm_password">
                Confirm Password
              </label>
              <input
                minLength={6}
                placeholder="confirm password"
                id="confirm_password"
                type="password"
                {...register("confirm_password", {
                  required: "Confirm Password is required!",
                })}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              {errors.confirm_password && (
                <span className="text-danger">
                  {errors.confirm_password?.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              {isLoading ? <MiniSpinner /> : "Change"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default withAuth(SettingSection);
