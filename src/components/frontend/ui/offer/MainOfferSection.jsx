"use client";
import Breadcrumb from "@/components/common/BreadCrum";
import MainOfferSectionCard from "./MainOfferSectionCard";

const MainOfferSection = ({offerData}) => {
  const crumbs = [{ label: "Offer", path: "offer" }];
  return (
    <div className="mb-7">
      <div className="bg-white py-2.5 px-4 my-2 rounded-md shadow">
        <Breadcrumb crumbs={crumbs} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {offerData?.map((offer) => (
          <MainOfferSectionCard key={offer?.id} offer={offer} />
        ))}
      </div>
    </div>
  );
};

export default MainOfferSection;
