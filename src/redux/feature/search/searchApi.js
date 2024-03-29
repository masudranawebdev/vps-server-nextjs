import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "@/redux/api/baseApi";

const SEARCH_URL = "/search";

export const searchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get to search category & products
    getSearchValue: build.query({
      query: (searchTerm) => ({
        url: `${SEARCH_URL}?searchTerm=${searchTerm}`,
      }),
      providesTags: [tagTypes.searchTerm],
    }),

    // get to review
    getSearchProductForCompare: build.query({
      query: (data) => ({
        url: `${SEARCH_URL}/pc_builder_page_serach_product/${data?.categoryId}?searchTerm=${data?.searchTerm}`,
      }),
      providesTags: [tagTypes.searchTerm],
    }),
  }),
});

export const { useGetSearchValueQuery, useGetSearchProductForCompareQuery } =
  searchApi;
