"use client"
import {PiHouseBold} from "react-icons/pi";
import Link from "next/link";
import QuestionTable from "../../../../components/admin/question/QuestionTable";

const QuestionPage = () => {
    return (
        <>
        <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Questions</h3>
                <div className="flex items-center gap-2">
                    <Link href='/admin'><p><PiHouseBold size={25} color="#000F24" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link href='/admin/question'><p className="font-semibold">Questions</p></Link>
                </div>
            </div>

            {/* delete and update And Show In Table  */}
            <QuestionTable />
        </>
    );
};

export default QuestionPage;