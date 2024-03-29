import { getFromLocalStorage } from "@/utils/local-storage";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";
import { authKey } from "@/contants/storageKey";

const token = getFromLocalStorage(authKey);

export const questionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get to Question
    getQuestion: build.query({
      query: (id) => ({
        url: `/question/${id}`,
      }),
      providesTags: [tagTypes.question],
    }),

    //add Question
    addQuestion: build.mutation({
      query: (data) => ({
        url: `/question`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.question],
    }),

    //update Question
    updateQuestion: build.mutation({
      query: (data) => ({
        url: `/question`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.question],
    }),

    //delete Question
    deleteQuestion: build.mutation({
      query: (data) => ({
        url: `/question`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.question],
    }),
  }),
});

export const {
  useAddQuestionMutation,
  useDeleteQuestionMutation,
  useUpdateQuestionMutation,
  useGetQuestionQuery,
} = questionApi;
