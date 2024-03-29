import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const GETME_URL = "/getMe";

export const getmeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //account is update
    updateAccount: build.mutation({
      query: (data) => ({
        url: `${GETME_URL}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.getme],
    }),
  }),
});

export const { useUpdateAccountMutation } = getmeApi;
