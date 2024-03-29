import { BASE_URL } from "@/utils/baseURL";

export async function getSettingData() {
  const res = await fetch(`${BASE_URL}/site_setting`, {
    next: {
      revalidate: 30,
    },
  });

  if (!res.ok) {
    throw new Error("Setting data fetching error!");
  }

  return res.json();
}
