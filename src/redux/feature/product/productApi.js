import { getFromLocalStorage } from "@/utils/local-storage";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";
import { authKey } from "@/contants/storageKey";

const PRODUCT_URL = "/product";
// get token from local storage
const token = getFromLocalStorage(authKey);

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRelatedProducts: build.query({
      query: (slug) => {
        return {
          url: `${PRODUCT_URL}/get_related_product/${slug}`,
        };
      },
      providesTags: [tagTypes.product],
    }),

    //check product sku and id is unique?
    checkIdAndSku: build.mutation({
      query: (data) => ({
        url: `/product/check_product_sku_id`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.product],
    }),

    //check product sku and id is unique when update?
    checkIdAndSkuUpdate: build.mutation({
      query: (data) => ({
        url: `/product/check_product_sku_id_update`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.product],
    }),

    // add Product
    addProduct: build.mutation({
      query: (data) => ({
        url: `/product`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.product],
    }),

    // update Product
    updateProduct: build.mutation({
      query: (data) => ({
        url: `/product`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.product],
    }),
    // update Product Price E-Price D-Price Quantity
    updateProductPriceStatus: build.mutation({
      query: (data) => ({
        url: `/product/price_quantity`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.product],
    }),
    // remove Product from hot deal
    removeProductHotDeal: build.mutation({
      query: (data) => ({
        url: `/product`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.product],
    }),
    //delete Product
    deleteProduct: build.mutation({
      query: (data) => ({
        url: `/product`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.product],
    }),
  }),
});

export const {
  useCheckIdAndSkuMutation,
  useAddProductMutation,
  useCheckIdAndSkuUpdateMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useRemoveProductHotDealMutation,
  useGetRelatedProductsQuery,
  useUpdateProductPriceStatusMutation
} = productApi;
