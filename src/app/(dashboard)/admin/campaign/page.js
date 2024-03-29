
import Link from "next/link";
import { PiHouseBold } from "react-icons/pi";
import CampaignTable from "../../../../components/admin/campaign/CampaignTable";

const CampaignPage = () => {

    return (
        <>
        <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <h3 className="text-[20px] font-semibold">Campaign</h3>
                <div className="flex items-center gap-2">
                    <Link href='/admin'><p><PiHouseBold size={25} color="#000F24" /></p></Link>
                    <p className="font-semibold text-xl">/</p>
                    <Link href='/admin/campaign'><p className="font-semibold">Campaign</p></Link>
                </div>
            </div>

            {/* delete and update And Show In Table  */}
            <CampaignTable />
        </>
    );
};

export default CampaignPage;