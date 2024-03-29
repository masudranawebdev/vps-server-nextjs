import { getFromLocalStorage } from "@/utils/local-storage";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";
import { authKey } from "@/contants/storageKey";

const token = getFromLocalStorage(authKey);

export const couponApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get Coupon
    checkCoupon: build.mutation({
      query: (data) => ({
        url: `/coupon/check_coupon`,
        method: "POST",
        body: data,
      }),
      providesTags: [tagTypes.coupon],
    }),

    //add Coupon
    addCoupon: build.mutation({
      query: (data) => ({
        url: `/coupon`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.coupon],
    }),

    //update Coupon
    updateCoupon: build.mutation({
      query: (data) => ({
        url: `/coupon`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.coupon],
    }),

    //delete Coupon
    deleteCoupon: build.mutation({
      query: (data) => ({
        url: `/coupon`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.coupon],
    }),
  }),
});

export const {
  useAddCouponMutation,
  useDeleteCouponMutation,
  useUpdateCouponMutation,
  useCheckCouponMutation,
} = couponApi;
