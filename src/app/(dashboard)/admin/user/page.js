"use client"
import {PiHouseBold} from "react-icons/pi";
import UserTable from "@/components/admin/user/UserTable";
import Link from "next/link";

const UserPage = () => {
    return (
        <>
        <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Users</h3>
                <div className="flex items-center gap-2">
                    <Link href='/admin'><p><PiHouseBold size={25} color="#000F24" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link href='/admin/user'><p className="font-semibold">Users</p></Link>
                </div>
            </div>

            {/* delete and update And Show In Table  */}
            <UserTable />
        </>
    );
};

export default UserPage;