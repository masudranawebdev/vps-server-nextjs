"use client";

import dynamic from "next/dynamic";
import PcBuilderCard from "./PcBuilderCard";
import { useDispatch, useSelector } from "react-redux";
import { FaCartArrowDown, FaPrint } from "react-icons/fa";
import { numberWithCommas } from "@/utils/thousandSeparate";
import { addToCartFromPcBuild } from "@/redux/feature/cart/cartSlice";
import PcBuilderInvoice from "../pcbuilderinvoice/PcBuilderInvoice";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import Link from "next/link";

const InvoicePdf = dynamic(() => import("../invoicepdf/InvoicePdf"), {
  ssr: false,
});

const PcBuilderMainSection = ({ pcBuilderCategoryData }) => {
  const pcbuildProducts = useSelector((state) => state.pcbuild.products);
  const totalPrice = useSelector((state) => state.pcbuild.totalPrice);
  const dispatch = useDispatch();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="w-full lg:max-w-5xl mx-auto rounded-lg mb-5">
        <section className="flex flex-col sm:flex-row items-center gap-x-5 gap-y-2 justify-between bg-white py-2 lg:py-5 px-2 rounded-md mb-3 shadow-md">
          <h4 className="text-primary flex flex-col items-center">
            <span className="text-2xl font-semibold">PC Builder</span>
            <span className="text-sm">Build Your Own Computer</span>
          </h4>
          <div className="px-6 rounded border border-dashed border-primary  text-center">
            <p className="text-lg mb-0 py-1">
              Total: {numberWithCommas(totalPrice)}
            </p>
          </div>
          <div className="flex gap-2">
            <InvoicePdf products={pcbuildProducts} />

            <Link
              href={"/invoice"}
              className="flex flex-col items-center py-[2px] group px-4 rounded-md bg-primaryColor"
              onClick={handlePrint}
            >
              <FaPrint className="text-xl text-textColor group-hover:text-secondary" />
              <span className="text-[10px] text-textColor">Print</span>
            </Link>
            <button
              onClick={() => dispatch(addToCartFromPcBuild(pcbuildProducts))}
              className="flex flex-col items-center py-[2px] px-1 group rounded-md bg-primaryColor"
            >
              <FaCartArrowDown className="text-xl text-textColor group-hover:text-secondary" />
              <span className="text-[10px] text-textColor">Add To Cart</span>
            </button>
          </div>
        </section>
        <section className="grid grid-cols-1 bg-white border rounded-md shadow-md">
          {pcBuilderCategoryData?.map((category) => (
            <PcBuilderCard key={category?._id} category={category} />
          ))}
        </section>
        <div className="hidden">
          <div className="px-2 pt-10" ref={componentRef}>
            <PcBuilderInvoice />
          </div>
        </div>
      </div>
    </>
  );
};

export default PcBuilderMainSection;
