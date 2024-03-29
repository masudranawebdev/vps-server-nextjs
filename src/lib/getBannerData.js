import { BASE_URL } from "@/utils/baseURL";

export async function getBannerData() {
  const res = await fetch(`${BASE_URL}/banner`, {
    next: {
      revalidate: 30,
    },
  });
  if (!res.ok) {
    throw new Error("Banner fetching error!");
  }
  return res.json();
}
