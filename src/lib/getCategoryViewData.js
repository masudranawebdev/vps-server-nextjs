import { BASE_URL } from "@/utils/baseURL";

export async function getCategoryViewData(arg) {
  const queryString = encodeURIComponent(JSON.stringify(arg?.query));
  const res = await fetch(
    `${BASE_URL}/product/filtered_product/${arg?.slug}?sub_categoryType=${arg?.slug2}&child_categoryType=${arg?.slug3}&filterDatas=${queryString}`
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
