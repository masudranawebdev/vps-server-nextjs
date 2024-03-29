"use client"

import Link from "next/link";
import { PiHouseBold } from "react-icons/pi";
import HotDealTable from "../../../../components/admin/hot-deal/HotDealTable";

const HotDealPage = () => {
    return (
        <>
        <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Hot Deal</h3>
                <div className="flex items-center gap-2">
                    <Link href='/admin'><p><PiHouseBold size={25} color="#000F24" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link href='/admin/hot-deal'><p className="font-semibold">Hot Deal</p></Link>
                </div>
            </div>

            {/* add And Show In Table  */}
            <HotDealTable />
        </>
    );
};

export default HotDealPage;