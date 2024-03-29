"use client";

import DashboardTabs from "@/components/admin/dashboard/DashboardTabs";
import MonthSell from "@/components/admin/dashboard/MonthSell";
import ThisWeekSell from "@/components/admin/dashboard/ThisWeekSell";
import YearSell from "@/components/admin/dashboard/YearSell";
import BigSpinner from "@/components/common/loader/BigSpinner";
import { authKey } from "@/contants/storageKey";
import { BASE_URL } from "@/utils/baseURL";
import { getFromLocalStorage } from "@/utils/local-storage";
import { useQuery } from "@tanstack/react-query";
import { PiHouseBold } from "react-icons/pi";
import { Link } from "react-scroll";

const Admin = () => {
  // get token from local storage
  const token = getFromLocalStorage(authKey);
  
  const { data: dashboardData = [], isLoading } = useQuery({
    queryKey: [`/api/v1/dashboard`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/dashboard`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    },
  }); // get all Child_category
  if (isLoading) {
    return <BigSpinner />;
  }
  return (
    <>
      <div className="flex items-center justify-between bg-white p-4 rounded-xl">
        <h3 className="text-[20px] font-semibold">Dashboard</h3>
        <Link href="/admin">
          <p>
            <PiHouseBold size={25} color="#000F24" />
          </p>
        </Link>
      </div>

      {/* show all data  */}
      <DashboardTabs tabs={dashboardData?.data} />

      {/* Week sell chart and month sell chart */}
      <div className="grid md:grid-cols-12 grid-cols-1 gap-5 mt-4">
        <div className="md:col-span-7 bg-white border border-gray-300 rounded-lg">
          <YearSell thisYearSellData={dashboardData?.data?.thisYearSellData} />
        </div>
        <div className="md:col-span-5 bg-white border border-gray-300 rounded-lg">
          <ThisWeekSell
            thisWeekSellData={dashboardData?.data?.thisWeekSellData}
          />
        </div>
      </div>

      {/* Week sell chart and year sell chart */}
      <div className=" bg-white border border-gray-300 rounded-lg mt-6">
        <MonthSell thisMonthSellData={dashboardData?.data?.thisMonthSellData} />
      </div>
    </>
  );
};

export default Admin;
