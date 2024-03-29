"use client";
import { useSelector } from "react-redux";
import Breadcrumb from "@/components/common/BreadCrum";
import ComparisonTable from "../comparison/ComparisonTable";

const MainCompare = () => {
  const compareProducts = useSelector((state) => state.compare.products);
  const crumbs = [
    {
      label: "Compare",
      path: "/compare",
    },
  ];
  return (
    <div className="mt-2 mb-5 rounded">
      <div className="bg-white py-2.5 px-4 my-2 rounded-md shadow">
        <Breadcrumb crumbs={crumbs} />
      </div>
      <ComparisonTable selectedProducts={compareProducts} />
    </div>
  );
};

export default MainCompare;
