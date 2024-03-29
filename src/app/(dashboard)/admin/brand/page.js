
import BrandTable from "@/components/admin/brand/BrandTable";
import Link from "next/link";
import { PiHouseBold } from "react-icons/pi";

const BrandPage = () => {
  return (
    <>
      <div className="flex items-center justify-between bg-white p-4 rounded-xl">
        <h3 className="text-[20px] font-semibold">Brand</h3>
        <div className="flex items-center gap-2">
          <Link href="/admin">
            <p>
              <PiHouseBold size={25} color="#000F24" />
            </p>
          </Link>
          <p className="font-semibold text-xl">/</p>
          <Link href="/admin/brand">
            <p className="font-semibold">Brand</p>
          </Link>
        </div>
      </div>

      {/* delete and update And Show In Table  */}
      <BrandTable />
    </>
  );
};

export default BrandPage;
