import { getFromLocalStorage } from "@/utils/local-storage";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";
import { authKey } from "@/contants/storageKey";

// get token from local storage
const token = getFromLocalStorage(authKey);

export const sub_categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //add Sub_Category
    addSub_Category: build.mutation({
      query: (data) => ({
        url: `/sub_category`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.sub_category],
    }),

    //update Sub_Category
    updateSub_Category: build.mutation({
      query: (data) => ({
        url: `/sub_category`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.sub_category],
    }),

    //delete Sub_Category
    deleteSub_Category: build.mutation({
      query: (data) => ({
        url: `/sub_category`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.sub_category],
    }),
  }),
});

export const {
  useAddSub_CategoryMutation,
  useDeleteSub_CategoryMutation,
  useUpdateSub_CategoryMutation
} = sub_categoryApi;
