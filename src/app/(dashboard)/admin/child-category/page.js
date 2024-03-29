import Child_CategoryTable from "@/components/admin/child_category/Child_CategoryTable";
import Link from "next/link";
import { PiHouseBold } from "react-icons/pi";

const ChildCategoryPage = () => {
  return (
    <>
      <div className="flex items-center justify-between bg-white p-4 rounded-xl">
        <h3 className="text-[20px] font-semibold">Child Category</h3>
        <div className="flex items-center gap-2">
          <Link href="/admin">
            <p>
              <PiHouseBold size={25} color="#000F24" />
            </p>
          </Link>
          <p className="font-semibold text-xl">/</p>
          <Link href="/admin/child-category">
            <p className="font-semibold">Child Category</p>
          </Link>
        </div>
      </div>

      {/* delete and update And Show In Table  */}
      <Child_CategoryTable />
    </>
  );
};

export default ChildCategoryPage;
