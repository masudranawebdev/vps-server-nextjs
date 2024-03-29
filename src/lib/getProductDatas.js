import { BASE_URL } from "@/utils/baseURL";

export async function getProductDatas(slug) {
  const res = await fetch(`${BASE_URL}/product/${slug}`, {
    next: {
      revalidate: 30,
    },
  });

  if (!res.ok) {
    throw new Error("product data fetching error!");
  }

  return res.json();
}
