import { getFromLocalStorage } from "@/utils/local-storage";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";
import { authKey } from "@/contants/storageKey";

const token = getFromLocalStorage(authKey);

export const bannerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //add Banner
    addBanner: build.mutation({
      query: (data) => ({
        url: `/banner`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.banner],
    }),

    //update Banner
    updateBanner: build.mutation({
      query: (data) => ({
        url: `/banner`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.banner],
    }),

    //delete Banner
    deleteBanner: build.mutation({
      query: (data) => ({
        url: `/banner`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.banner],
    }),
  }),
});

export const {
    useAddBannerMutation,
    useDeleteBannerMutation,
    useUpdateBannerMutation
} = bannerApi;
