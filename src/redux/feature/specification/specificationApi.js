import { getFromLocalStorage } from "@/utils/local-storage";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";
import { authKey } from "@/contants/storageKey";

// get token from local storage
const token = getFromLocalStorage(authKey);

export const specificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //add Specification
    addSpecification: build.mutation({
      query: (data) => ({
        url: `/specification`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.specification],
    }),

    //update Specification
    updateSpecification: build.mutation({
      query: (data) => ({
        url: `/specification`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.specification],
    }),

    //delete Specification
    deleteSpecification: build.mutation({
      query: (data) => ({
        url: `/specification`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.specification],
    }),
  }),
});

export const {
    useAddSpecificationMutation,
    useDeleteSpecificationMutation,
    useUpdateSpecificationMutation
} = specificationApi;
