
import SpecificationTable from "@/components/admin/specification/SpecificationTable";
import Link from "next/link";
import { PiHouseBold } from "react-icons/pi";

const SpecificationPage = () => {
  return (
    <>
      <div className="flex items-center justify-between bg-white p-4 rounded-xl">
        <h3 className="text-[20px] font-semibold">Specification</h3>
        <div className="flex items-center gap-2">
          <Link href="/admin">
            <p>
              <PiHouseBold size={25} color="#000F24" />
            </p>
          </Link>
          <p className="font-semibold text-xl">/</p>
          <Link href="/admin/specification">
            <p className="font-semibold">Specification</p>
          </Link>
        </div>
      </div>

      {/* delete and update And Show In Table  */}
      <SpecificationTable />
    </>
  );
};

export default SpecificationPage;
