
import FilterTable from "@/components/admin/filter/FilterTable";
import Link from "next/link";
import { PiHouseBold } from "react-icons/pi";

const FilterPage = () => {
  return (
    <>
      <div className="flex items-center justify-between bg-white p-4 rounded-xl">
        <h3 className="text-[20px] font-semibold">Filter</h3>
        <div className="flex items-center gap-2">
          <Link href="/admin">
            <p>
              <PiHouseBold size={25} color="#000F24" />
            </p>
          </Link>
          <p className="font-semibold text-xl">/</p>
          <Link href="/admin/filter">
            <p className="font-semibold">Filter</p>
          </Link>
        </div>
      </div>

      {/* delete and update And Show In Table  */}
      <FilterTable />
    </>
  );
};

export default FilterPage;
