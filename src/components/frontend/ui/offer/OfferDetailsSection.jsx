"use client";
import Countdown from "@/components/common/CountDown";
import OfferProductCard from "./OfferProductCard";
import { useEffect, useState } from "react";
import CommonBreadcrumb from "@/components/common/CommonBreadCrum";

const OfferDetailsSection = ({ offerSingleData }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const crumbs = [
    { label: "Offer", path: "offer" },
    { label: "Win Offer", path: "win-offer" },
  ];
  useEffect(() => {
    const startDateData = `${offerSingleData?.offer_start_date}T00:00:00`;
    const endDateData = `${offerSingleData?.offer_end_date}T23:59:59`;

    setStartDate(startDateData);
    setEndDate(endDateData);
  }, [offerSingleData]);

  if (!startDate && !endDate) {
    return null;
  }

  return (
    <div>
      <div className="bg-white py-2.5 px-4 my-2 rounded-md shadow">
        <CommonBreadcrumb crumbs={crumbs} />
      </div>
      <div className="bg-white py-5 px-4 my-2 rounded-md shadow">
        <div className="">
          <h5 className="text-center font-semibold">
            {offerSingleData?.offer_title}
          </h5>
          <div
            dangerouslySetInnerHTML={{
              __html: offerSingleData?.offer_description,
            }}
            className="text-center text-sm font-medium mt-3"
          ></div>
          <div className="flex justify-center my-7">
            <Countdown startDate={startDate} endDate={endDate} />
          </div>
        </div>
      </div>
      <div className="mt-14 mb-7">
        <h5 className="text-center font-semibold">
          {offerSingleData?.offer_title}
        </h5>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 mt-5">
          {offerSingleData?.offer_products?.map((product) => (
            <OfferProductCard key={product?.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferDetailsSection;
