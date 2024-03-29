import { getFromLocalStorage } from "@/utils/local-storage";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";
import { authKey } from "@/contants/storageKey";

// get token from local storage
const token = getFromLocalStorage(authKey);

export const filterApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //add Filter
    addFilter: build.mutation({
      query: (data) => ({
        url: `/filter`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.filter],
    }),

    //update Filter
    updateFilter: build.mutation({
      query: (data) => ({
        url: `/filter`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.filter],
    }),

    //update Filter Status
    updateFilterStatus: build.mutation({
      query: (data) => ({
        url: `/filter/uppdate_status`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.filter],
    }),

    //delete Filter
    deleteFilter: build.mutation({
      query: (data) => ({
        url: `/filter`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.filter],
    }),
  }),
});

export const {
    useAddFilterMutation,
    useDeleteFilterMutation,
    useUpdateFilterMutation,
    useUpdateFilterStatusMutation
} = filterApi;
