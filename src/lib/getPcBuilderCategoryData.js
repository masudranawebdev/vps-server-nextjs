import { BASE_URL } from "@/utils/baseURL";

export async function getPcBuilderCategoryData() {
  const res = await fetch(`${BASE_URL}/pc_builder`, {
    next: {
      revalidate: 30,
    },
  });

  if (!res.ok) {
    throw new Error("Pc builder category data fetching error!");
  }

  return res.json();
}
