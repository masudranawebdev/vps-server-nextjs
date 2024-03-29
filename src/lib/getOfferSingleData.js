import { BASE_URL } from "@/utils/baseURL";

export async function getOfferSingleData(id) {
  const res = await fetch(`${BASE_URL}/offer/${id}`, {
    next: {
      revalidate: 30,
    },
  });

  if (!res.ok) {
    throw new Error("Offer Single data fetching error!");
  }

  return res.json();
}
