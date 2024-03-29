import { getFromLocalStorage } from "@/utils/local-storage";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";
import { authKey } from "@/contants/storageKey";

const token = getFromLocalStorage(authKey);

export const seetingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //add setting
    addSiteSetting: build.mutation({
      query: (data) => ({
        url: `/site_setting`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.site_setting],
    }),
  }),
});

export const { useAddSiteSettingMutation } = seetingApi;
