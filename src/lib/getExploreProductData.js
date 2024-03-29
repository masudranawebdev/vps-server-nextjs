import { BASE_URL } from "@/utils/baseURL";

export async function getExploreProductsData() {
  const res = await fetch(`${BASE_URL}/product/explore_match_category`, {
    next: {
      revalidate: 30,
    },
  });

  if (!res.ok) {
    throw new Error("explore category product fetching error!");
  }
  return res.json();
}
