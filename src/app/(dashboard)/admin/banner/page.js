"use client";
import Link from "next/link";
import { PiHouseBold } from "react-icons/pi";
import BannerShow from "@/components/admin/banner/BannerShow";
import BannerTable from "@/components/admin/banner/BannerTable";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/baseURL";
import BigSpinner from "@/components/common/loader/BigSpinner";
import { useState } from "react";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const BannerPage = () => {
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  // get token from local storage
  const token = getFromLocalStorage(authKey);
  const {
    data: banners = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`/api/v1/banner/dashboard?page=${page}&limit=${rows}`],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/banner/dashboard?page=${page}&limit=${rows}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  }); // get all Banner

  if (isLoading) {
    return <BigSpinner />;
  }

  return (
    <>
      <div className="flex items-center justify-between bg-white p-4 rounded-xl">
        <h3 className="text-[20px] font-semibold">Banner</h3>
        <div className="flex items-center gap-2">
          <Link href="/admin">
            <p>
              <PiHouseBold size={25} color="#000F24" />
            </p>
          </Link>
          <p className="font-semibold text-xl">/</p>
          <Link href="/admin/banner">
            <p className="font-semibold">Banner</p>
          </Link>
        </div>
      </div>

      {/* Show banner like front end */}
      <div className="my-6">
        <BannerShow banners={banners} />
      </div>

      {/* delete and update And Show In Table  */}
      <BannerTable
        banners={banners}
        refetch={refetch}
        rows={rows}
        setRows={setRows}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default BannerPage;
