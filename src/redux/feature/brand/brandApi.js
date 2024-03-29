import { getFromLocalStorage } from "@/utils/local-storage";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";
import { authKey } from "@/contants/storageKey";

// get token from local storage
const token = getFromLocalStorage(authKey);

export const brandApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //add Brand
    addBrand: build.mutation({
      query: (data) => ({
        url: `/brand`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.brand],
    }),

    //update Brand
    updateBrand: build.mutation({
      query: (data) => ({
        url: `/brand`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.brand],
    }),

    //delete Brand
    deleteBrand: build.mutation({
      query: (data) => ({
        url: `/brand`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.brand],
    }),
  }),
});

export const {
    useAddBrandMutation,
    useDeleteBrandMutation,
    useUpdateBrandMutation
} = brandApi;
