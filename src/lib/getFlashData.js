import { BASE_URL } from "@/utils/baseURL";

export async function getFlashData() {
  const res = await fetch(`${BASE_URL}/campaign`, {
    next: {
      revalidate: 30,
    },
  });
  if (!res.ok) {
    throw new Error("Campaign data fetching error!");
  }

  return res.json();
}
