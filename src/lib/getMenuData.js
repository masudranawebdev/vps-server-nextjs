import { BASE_URL } from "@/utils/baseURL";

export async function getMenuData() {
  const res = await fetch(`${BASE_URL}/category/bannerMatchCategory`, {
    next: {
      revalidate: 30,
    },
  });
  if (!res.ok) {
    throw new Error("menu data fetching error!");
  }

  return res.json();
}
