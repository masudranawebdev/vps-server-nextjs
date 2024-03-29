import { BASE_URL } from "@/utils/baseURL";

export async function getFeatureCategoryData() {
  const res = await fetch(`${BASE_URL}/category`, {
    next: {
      revalidate: 30,
    },
  });

  if (!res.ok) {
    throw new Error("get feature category data fetching error!");
  }

  return res.json();
}
