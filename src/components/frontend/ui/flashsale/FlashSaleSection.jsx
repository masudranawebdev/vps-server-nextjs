"use client";
import FlashProductCard from "./FlashProductCard";
import { MdOutlineFlashOff } from "react-icons/md";
import Countdown from "@/components/common/CountDown";
import Breadcrumb from "@/components/common/BreadCrum";

const FlashSaleSection = ({ campaign }) => {
  const crumbs = [{ label: "Flash Deal", path: "flash-deal" }];
  return (
    <div>
      <div className="bg-white py-2.5 px-4 my-2 rounded-md shadow">
        <Breadcrumb crumbs={crumbs} />
      </div>
      {!campaign?.campaign_start_date && !campaign?.campaign_end_date ? (
        <div className="flex flex-col h-[70vh] justify-center items-center">
          <MdOutlineFlashOff className="text-5xl mb-5" />
          <h1 className="text-secondary text-center leading-9 tracking-wide">
            There are no flash sales <br /> going on right now
          </h1>
        </div>
      ) : (
        <div>
          <div className="bg-white py-5 px-4 my-2 rounded-md shadow">
            <div className="">
              <h5 className="text-center font-semibold">
                {campaign?.campaign_title}
              </h5>
              <p className="text-center text-sm font-medium mt-3">
                {campaign?.campaign_description}
              </p>
              <div className="flex justify-center my-7">
                <Countdown
                  startDate={campaign?.campaign_start_date}
                  endDate={campaign?.campaign_end_date}
                />
              </div>
            </div>
          </div>
          <div className="mt-14 mb-7">
            <h5 className="text-center font-semibold mb-5 lg:mb-10">
              {campaign?.campaign_title}
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 mt-5">
              {campaign?.campaign_products?.map((product) => (
                <FlashProductCard key={product?._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashSaleSection;
