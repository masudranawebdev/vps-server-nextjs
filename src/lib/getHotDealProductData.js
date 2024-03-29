import { BASE_URL } from "@/utils/baseURL";

export async function getHotDealProductsData() {
  const res = await fetch(`${BASE_URL}/product/handle_hotDeal_product`, {
    next: {
      revalidate: 30,
    },
  });

  if (!res.ok) {
    throw new Error("Hot deal product fetching error!");
  }
  return res.json();
}
