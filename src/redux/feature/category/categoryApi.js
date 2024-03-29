import { getFromLocalStorage } from "@/utils/local-storage";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";
import { authKey } from "@/contants/storageKey";

// get token from local storage
const token = getFromLocalStorage(authKey);

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get Category
    getCategory: build.query({
      query: () => ({
        url: `/category`,
      }),
      providesTags: [tagTypes.category],
    }),

    //add Category
    addCategory: build.mutation({
      query: (data) => ({
        url: `/category`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.category],
    }),

    //update Category
    updateCategory: build.mutation({
      query: (data) => ({
        url: `/category`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.category],
    }),

    //update Category
    updateCategoryStatusForExplorePage: build.mutation({
      query: (data) => ({
        url: `/category/updateCategoryStatusForExplorePage`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.category],
    }),

    //delete Category
    deleteCategory: build.mutation({
      query: (data) => ({
        url: `/category`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryStatusForExplorePageMutation,
  useGetCategoryQuery,
} = categoryApi;
