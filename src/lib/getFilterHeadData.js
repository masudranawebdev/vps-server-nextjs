import { BASE_URL } from "@/utils/baseURL";

export async function getFilterHeadData(slug) {
  const res = await fetch(
    `${BASE_URL}/product/heading_sub_child_category_data/${slug?.category}?sub_categoryType=${slug?.subCategory}&child_categoryType=${slug?.childCategory}`,
    {
      next: {
        revalidate: 10,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Filter Heading data Failed to fetch!");
  }

  return res.json();
}
