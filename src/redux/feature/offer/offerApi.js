import { getFromLocalStorage } from "@/utils/local-storage";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";
import { authKey } from "@/contants/storageKey";

const token = getFromLocalStorage(authKey);

export const offerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //add Offer
    addOffer: build.mutation({
      query: (data) => ({
        url: `/offer`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.offer],
    }),

    //update Offer
    updateOffer: build.mutation({
      query: (data) => ({
        url: `/offer`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.offer],
    }),

    //delete Offer
    deleteOffer: build.mutation({
      query: (data) => ({
        url: `/offer`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.offer],
    }),
  }),
});

export const {
  useAddOfferMutation,
  useDeleteOfferMutation,
  useUpdateOfferMutation
} = offerApi;
