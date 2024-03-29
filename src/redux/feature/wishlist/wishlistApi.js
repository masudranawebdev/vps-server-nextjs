import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";

const WISHLIST_URL = "/wishlist";

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get to wishlist
    getWishlist: build.query({
      query: (user_phone) => ({
        url: `${WISHLIST_URL}/${user_phone}`,
      }),
      providesTags: [tagTypes.wishlist],
    }),

    //add to wishlist
    addToWishlist: build.mutation({
      query: (data) => ({
        url: `${WISHLIST_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.wishlist],
    }),

    //add to wishlist
    deleteToWishlist: build.mutation({
      query: (data) => {
        return {
          url: `${WISHLIST_URL}`,
          method: "DELETE",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.wishlist],
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useDeleteToWishlistMutation,
} = wishlistApi;
