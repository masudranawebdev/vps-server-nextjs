"use client"
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { PiHouseBold } from "react-icons/pi";
import BigSpinner from "@/components/common/loader/BigSpinner";
import LogoContact from "@/components/admin/setting/LogoContact";
import CardInformation from "@/components/admin/setting/CardInformation";
import AboutSite from "@/components/admin/setting/AboutSite";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const SettingPage = () => {
  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const {
    data: settings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`/api/v1/site_setting`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/site_setting`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    },
  }); // get Site Settings

  if (isLoading) {
    return <BigSpinner />;
  }

  const initialData = settings?.data[0];

  return (
    <>
      <div className="flex items-center justify-between bg-white p-4 rounded-xl">
        <h3 className="text-[20px] font-semibold">Setting</h3>
        <div className="flex items-center gap-2">
          <Link href="/admin">
            <p>
              <PiHouseBold size={25} color="#000F24" />
            </p>
          </Link>
          <p className="font-semibold text-xl">/</p>
          <Link href="/admin/setting">
            <p className="font-semibold">Setting</p>
          </Link>
        </div>
      </div>

      <div className="md:mt-10 mt-8 bg-white">
        <div className="p-5">
          <h4 className="font-semibold text-[20px] mt-2">
            Software Information
          </h4>
          <hr className="mt-2 mb-4" />
          <LogoContact refetch={refetch} initialData={initialData} />
        </div>
      </div>

      <div className="md:mt-10 mt-8 bg-white">
        <div className="p-5">
          <h4 className="font-semibold text-[20px] mt-2">
            Benefits Information
          </h4>
          <hr className="mt-2 mb-4" />
          <CardInformation refetch={refetch} initialData={initialData} />
        </div>
      </div>

      <div className="md:mt-10 mt-8 bg-white mb-8">
        <div className="p-5">
          <AboutSite refetch={refetch} initialData={initialData} />
        </div>
      </div>
    </>
  );
};

export default SettingPage;