import { BASE_URL } from "@/utils/baseURL";

export async function getFilterData(slug) {
  const res = await fetch(`${BASE_URL}/product/side_filtered_data/${slug}`, {
    next: {
      revalidate: 10,
    },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
