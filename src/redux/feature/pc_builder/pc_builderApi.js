import { getFromLocalStorage } from "@/utils/local-storage";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";
import { authKey } from "@/contants/storageKey";

const token = getFromLocalStorage(authKey);


export const pc_builderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //add Pc_Builder
    addPc_Builder: build.mutation({
      query: (data) => ({
        url: `/pc_builder`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.pc_builder],
    }),

    //update Pc_Builder
    updatePc_Builder: build.mutation({
      query: (data) => ({
        url: `/pc_builder`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.pc_builder],
    }),

    //delete Pc_Builder
    deletePc_Builder: build.mutation({
      query: (data) => ({
        url: `/pc_builder`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.pc_builder],
    }),
  }),
});

export const {
  useAddPc_BuilderMutation,
  useDeletePc_BuilderMutation,
  useUpdatePc_BuilderMutation,
} = pc_builderApi;
