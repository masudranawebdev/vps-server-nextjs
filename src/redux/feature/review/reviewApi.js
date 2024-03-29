import { getFromLocalStorage } from "@/utils/local-storage";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";
import { authKey } from "@/contants/storageKey";

const token = getFromLocalStorage(authKey);

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get to review
    getReview: build.query({
      query: (id) => ({
        url: `/review/${id}`,
      }),
      providesTags: [tagTypes.review],
    }),

    //add Review
    addReview: build.mutation({
      query: (data) => ({
        url: `/review`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.review],
    }),

    //update Review
    updateReview: build.mutation({
      query: (data) => ({
        url: `/review`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.review],
    }),

    //delete Review
    deleteReview: build.mutation({
      query: (data) => ({
        url: `/review`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.review],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetReviewQuery,
} = reviewApi;
