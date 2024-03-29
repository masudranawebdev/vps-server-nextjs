import { authKey } from "@/contants/storageKey";
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { getFromLocalStorage } from "@/utils/local-storage";

const ORDER_URL = "/order";
// get token from local storage
const token = getFromLocalStorage(authKey);

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get specific user order
    getOrder: build.query({
      query: (phone) => ({
        url: `${ORDER_URL}/${phone}`,
      }),
      providesTags: [tagTypes.order],
    }),
    // order post for this route
    order: build.mutation({
      query: (data) => ({
        url: `${ORDER_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.order],
    }),

    // order tracking for get specific order
    orderTracking: build.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/order_tracking`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.order],
    }),

    // order status update for this route
    orderStatusUpdate: build.mutation({
      query: (data) => ({
        url: `${ORDER_URL}`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.order],
    }),
    // order type update for this route
    orderTypeUpdate: build.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/update_order_type`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.order],
    }),
    // order delete for this route
    orderDelete: build.mutation({
      query: (data) => ({
        url: `${ORDER_URL}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.order],
    }),
  }),
});

export const {
  useOrderMutation,
  useOrderStatusUpdateMutation,
  useGetOrderQuery,
  useOrderDeleteMutation,
  useOrderTypeUpdateMutation,
  useOrderTrackingMutation,
} = orderApi;
