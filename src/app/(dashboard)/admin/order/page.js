
"use client"
import OrderTable from "@/components/admin/order/OrderTable";
import Link from "next/link";
import { PiHouseBold } from "react-icons/pi";

const OrderPage = () => {
    return (
      <>
        <div className="flex items-center justify-between bg-white p-4 rounded-xl">
          <h3 className="text-[20px] font-semibold">Order</h3>
          <div className="flex items-center gap-2">
            <Link href="/admin">
              <p>
                <PiHouseBold size={25} color="#000F24" />
              </p>
            </Link>
            <p className="font-semibold text-xl">/</p>
            <Link href="/admin/order">
              <p className="font-semibold">Order</p>
            </Link>
          </div>
        </div>

        {/* delete and update And Show In Table  */}
        <OrderTable />
      </>
    );
};

export default OrderPage;