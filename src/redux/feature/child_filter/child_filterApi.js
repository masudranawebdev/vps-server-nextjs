import { getFromLocalStorage } from "@/utils/local-storage";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";
import { authKey } from "@/contants/storageKey";

// get token from local storage
const token = getFromLocalStorage(authKey);

export const child_filterApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //add Child_Filter
    addChild_Filter: build.mutation({
      query: (data) => ({
        url: `/child_filter`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.child_filter],
    }),

    //update Child_Filter
    updateChild_Filter: build.mutation({
      query: (data) => ({
        url: `/child_filter`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.child_filter],
    }),

    //update Child_FilterStatus
    updateChild_FilterStatus: build.mutation({
      query: (data) => ({
        url: `/child_filter/uppdate_status`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.child_filter],
    }),

    //delete Child_Filter
    deleteChild_Filter: build.mutation({
      query: (data) => ({
        url: `/child_filter`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.child_filter],
    }),
  }),
});

export const {
  useAddChild_FilterMutation,
  useDeleteChild_FilterMutation,
  useUpdateChild_FilterMutation,
  useUpdateChild_FilterStatusMutation
} = child_filterApi;
