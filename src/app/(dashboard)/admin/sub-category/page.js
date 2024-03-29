
import Sub_CategoryTable from "@/components/admin/sub_category/Sub_CategoryTable";
import Link from "next/link";
import { PiHouseBold } from "react-icons/pi";

const SubCategoryPage = () => {
  return (
    <>
      <div className="flex items-center justify-between bg-white p-4 rounded-xl">
        <h3 className="text-[20px] font-semibold">Sub Category</h3> 
        <div className="flex items-center gap-2">
          <Link href="/admin">
            <p>
              <PiHouseBold size={25} color="#000F24" />
            </p>
          </Link>
          <p className="font-semibold text-xl">/</p>
          <Link href="/admin/sub-category">
            <p className="font-semibold">Sub Category</p>
          </Link>
        </div>
      </div>

      {/* delete and update And Show In Table  */}
      <Sub_CategoryTable />
    </>
  );
};

export default SubCategoryPage;
