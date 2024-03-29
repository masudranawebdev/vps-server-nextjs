
import CategoryTables from "@/components/admin/category/CategoryTables";
import Link from "next/link";
import { PiHouseBold } from "react-icons/pi";

const CategoryPage = () => {

    return (
        <>
        <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Category</h3>
                <div className="flex items-center gap-2">
                    <Link href='/admin'><p><PiHouseBold size={25} color="#000F24" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link href='/admin/category'><p className="font-semibold">Category</p></Link>
                </div>
            </div>

            {/* delete and update And Show In Table  */}
            <CategoryTables />
        </>
    );
};

export default CategoryPage;