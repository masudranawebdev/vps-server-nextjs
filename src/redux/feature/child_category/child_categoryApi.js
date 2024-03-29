import { getFromLocalStorage } from "@/utils/local-storage";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";
import { authKey } from "@/contants/storageKey";

// get token from local storage
const token = getFromLocalStorage(authKey);

export const child_categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //add Child_Category
    addChild_Category: build.mutation({
      query: (data) => ({
        url: `/child_category`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.child_category],
    }),

    //update Child_Category
    updateChild_Category: build.mutation({
      query: (data) => ({
        url: `/child_category`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.child_category],
    }),

    //delete Child_Category
    deleteChild_Category: build.mutation({
      query: (data) => ({
        url: `/child_category`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.child_category],
    }),
  }),
});

export const {
    useAddChild_CategoryMutation,
    useDeleteChild_CategoryMutation,
    useUpdateChild_CategoryMutation
} = child_categoryApi;
