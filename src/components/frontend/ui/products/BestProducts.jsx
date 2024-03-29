"use client";
import { Tooltip as ReactTooltip } from "react-tooltip";
import QuickViewModal from "@/components/common/modal/QuickViewModal";
import QuickViewDetails from "./QuickViewDetails";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { IoCloseOutline } from "react-icons/io5";

const BestProducts = ({ productData }) => {
  const [isModalOpen, setModalOpen] = useState("");
  const [viewProduct, setViewProduct] = useState(null);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="container mx-auto px-2 py-10">
      <h4>Daily Hot Deal Product</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-1 gap-y-3">
        {productData?.map((product) => (
          <ProductCard
            key={product?._id}
            product={product}
            openModal={openModal}
            setViewProduct={setViewProduct}
          />
        ))}
      </div>
      <ReactTooltip variant="info" id="title" />
      <ReactTooltip variant="info" id="wish-list" />
      <ReactTooltip variant="info" id="compare" />
      <ReactTooltip variant="info" id="quick-view" />

      {viewProduct && (
        <QuickViewModal isOpen={isModalOpen} onClose={closeModal}>
          <div>
            <div className="flex justify-end">
              <button
                className="text-bgray-900 font-bold py-1 px-2 mb-2 rounded"
                onClick={closeModal}
              >
                <IoCloseOutline className="text-3xl p-1 bg-gray-100 rounded-full hover:bg-gray-300" />
              </button>
            </div>
            <QuickViewDetails product={viewProduct} />
          </div>
        </QuickViewModal>
      )}
    </div>
  );
};

export default BestProducts;
