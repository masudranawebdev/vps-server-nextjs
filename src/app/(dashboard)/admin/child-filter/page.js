
import Child_FilterTables from "@/components/admin/child_filter/Child_FilterTables";
import Link from "next/link";
import { PiHouseBold } from "react-icons/pi";

const ChildFilterPage = () => {
  return (
    <>
      <div className="flex items-center justify-between bg-white p-4 rounded-xl">
        <h3 className="text-[20px] font-semibold">Child Filter</h3>
        <div className="flex items-center gap-2">
          <Link href="/admin">
            <p>
              <PiHouseBold size={25} color="#000F24" />
            </p>
          </Link>
          <p className="font-semibold text-xl">/</p>
          <Link href="/admin/child-filter">
            <p className="font-semibold">Child Filter</p>
          </Link>
        </div>
      </div>

      {/* delete and update And Show In Table  */}
      <Child_FilterTables />
    </>
  );
};

export default ChildFilterPage;
