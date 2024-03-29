import { getFromLocalStorage } from "@/utils/local-storage";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";
import { authKey } from "@/contants/storageKey";

const AUTH_URL = "/userReg";
const LOGIN_URL = "/userLog";
const token = getFromLocalStorage(authKey);

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //use registration
    userRegistration: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    // user login
    userLogin: build.mutation({
      query: (data) => ({
        url: `${LOGIN_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    //verify account
    verify: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    //resend otp
    resendOtp: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/resend_otp`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    //forget password
    forgetPassword: build.mutation({
      query: (data) => ({
        url: `${LOGIN_URL}/forgetPassword`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    //forget password
    changePassword: build.mutation({
      query: (data) => ({
        url: `${LOGIN_URL}/setNewPassword`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    //change user password
    changeUserPassword: build.mutation({
      query: (data) => ({
        url: `${LOGIN_URL}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    //account status change
    changeStatus: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/update_user_status`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    //delete a user
    deleteUser: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
  }),
});

export const {
  useUserRegistrationMutation,
  useUserLoginMutation,
  useResendOtpMutation,
  useVerifyMutation,
  useForgetPasswordMutation,
  useChangePasswordMutation,
  useChangeStatusMutation,
  useDeleteUserMutation,
  useChangeUserPasswordMutation,
} = authApi;
