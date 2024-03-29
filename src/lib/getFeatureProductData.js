import { BASE_URL } from "@/utils/baseURL";

export async function getFeatureProductsData() {
  const res = await fetch(`${BASE_URL}/product`, {
    next: {
      revalidate: 30,
    },
  });

  if (!res.ok) {
    throw new Error("feature product fetching error!");
  }

  return res.json();
}
