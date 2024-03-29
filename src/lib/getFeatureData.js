import { BASE_URL } from "@/utils/baseURL";

export async function getFeatureData() {
  const res = await fetch(`${BASE_URL}/site_setting`, {
    next: {
      revalidate: 30,
    },
  });

  if (!res.ok) {
    throw new Error("get feature data fetching error!");
  }

  return res.json();
}
