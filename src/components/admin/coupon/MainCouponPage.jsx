"use client";
import { PiHouseBold } from "react-icons/pi";
import CouponTable from "./CouponTable";
import Link from "next/link";

const MainCouponPage = () => {
  return (
    <div>
      <section className="flex items-center justify-between bg-white p-4 rounded">
        <h3 className="text-[20px] font-semibold">Coupons</h3>
        <div className="flex items-center gap-2">
          <Link href="/admin">
            <span>
              <PiHouseBold size={25} color="#000F24" />
            </span>
          </Link>
          <p className="font-semibold text-xl">/</p>
          <Link href="/admin/coupon">
            <span className="font-semibold">Coupon</span>
          </Link>
        </div>
      </section>
      <section>
        <CouponTable />
      </section>
    </div>
  );
};

export default MainCouponPage;
