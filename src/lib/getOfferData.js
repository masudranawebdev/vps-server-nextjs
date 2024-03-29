import { BASE_URL } from "@/utils/baseURL";

export async function getOfferData() {
  const res = await fetch(`${BASE_URL}/offer`, {
    next: {
      revalidate: 30,
    },
  });
  if (!res.ok) {
    throw new Error("Offer data fetching error!");
  }

  return res.json();
}
