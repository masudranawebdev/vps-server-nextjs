"use client";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import "../../productCreate/stepper.css";
import UpdateStepOne from "./UpdateStepOne";
import UpdateStepTwo from "./UpdateStepTwo";
import UpdateStepThree from "./UpdateStepThree";
import UpdateStepFour from "./UpdateStepFour";
import UpdateStepFive from "./UpdateStepFive";

const ProductUpdate = ({
  refetch,
  setOpenUpdateProductModal,
  openUpdateProductModalValue,
}) => {
  const steps = ["", "", "", "", ""];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  //   first step initial data
  const [finalStepOneData, setFinalStepOneData] = useState({
    category_id: openUpdateProductModalValue?.category_id?._id,
    category_name: openUpdateProductModalValue?.category_id?.category_name,
    sub_category_id: openUpdateProductModalValue?.sub_category_id?._id,
    sub_category_name:
      openUpdateProductModalValue?.sub_category_id?.sub_category_name,
    child_category_id: openUpdateProductModalValue?.child_category_id?._id,
    child_category_name:
      openUpdateProductModalValue?.child_category_id?.child_category_name,
    product_brand_id: openUpdateProductModalValue?.product_brand_id?._id,
    product_brand_name:
      openUpdateProductModalValue?.product_brand_id?.brand_name,
    product_name: openUpdateProductModalValue?.product_name,
    product_model: openUpdateProductModalValue?.product_model,
    product_price: openUpdateProductModalValue?.product_price,
    product_ecommerce_price:
      openUpdateProductModalValue?.product_ecommerce_price,
    product_discount_price: openUpdateProductModalValue?.product_discount_price,
    product_id: openUpdateProductModalValue?.product_id,
    product_sku: openUpdateProductModalValue?.product_sku,
    product_quantity: openUpdateProductModalValue?.product_quantity,
    _id: openUpdateProductModalValue?._id,
  });
  //   step two initial data
  const [finalStepTwoData, setFinalStepTwoData] = useState(
    openUpdateProductModalValue?.filters
  );
  //   step three initial data
  const [finalStepThreeData, setFinalStepThreeData] = useState(
    openUpdateProductModalValue?.specifications
  );
  //   step four initial data
  const [finalStepFourData, setFinalStepFourData] = useState(
    {
      mainImage:
        openUpdateProductModalValue?.product_thumbnail,
      anotherImages: openUpdateProductModalValue?.product_images
    }

  );
  //   step five initial data
  const [finalStepFiveData, setFinalStepFiveData] = useState(
    {
      product_warranty:
        openUpdateProductModalValue?.product_warranty,
      product_EMI_price:
        openUpdateProductModalValue?.product_EMI_price,
      product_EMI_month:
        openUpdateProductModalValue?.product_EMI_month,
      product_status:
        openUpdateProductModalValue?.product_status,
      product_gift:
        openUpdateProductModalValue?.product_gift,
      product_key_feature:
        openUpdateProductModalValue?.product_key_feature,
      product_description:
        openUpdateProductModalValue?.product_description,
      product_hot_deal:
        openUpdateProductModalValue?.product_hot_deal,
      product_pc_builder:
        openUpdateProductModalValue?.product_pc_builder,
      pc_builder_id:
        openUpdateProductModalValue?.pc_builder_id,
      meta_title:
        openUpdateProductModalValue?.meta_title,
      meta_keywords:
        openUpdateProductModalValue?.meta_keywords,
      meta_description:
        openUpdateProductModalValue?.meta_description,
    }
  );

  const _id = openUpdateProductModalValue?._id;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-full lg:w-10/12 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3
            className="text-[26px] font-bold text-[#0A0A0A] capitalize"
            id="modal-title"
          >
            {" "}
            Update Product{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                setOpenUpdateProductModal(false);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>

        <div className="mt-6 rounded-lg p-2">
          <div className="flex items-center justify-center mt-4">
            {steps?.map((step, i) => (
              <div
                key={i}
                className={`step-item ${currentStep === i + 1 && "active"} ${
                  (i + 1 < currentStep || complete) && "complete"
                }`}
              >
                <div className="step">
                  {i + 1 < currentStep || complete ? (
                    <TiTick size={24} />
                  ) : (
                    i + 1
                  )}
                </div>
                <p className="text-gray-500">{step}</p>
              </div>
            ))}
          </div>

          <div className="m-4 mt-10">
            {currentStep == 5 ? (
              <UpdateStepFive
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                complete={currentStep}
                steps={steps}
                setComplete={setComplete}
                finalStepOneData={finalStepOneData}
                finalStepTwoData={finalStepTwoData}
                finalStepThreeData={finalStepThreeData}
                finalStepFourData={finalStepFourData}
                finalStepFiveData={finalStepFiveData}
                setFinalStepFiveData={setFinalStepFiveData}
                refetch={refetch}
                _id={_id}
                setOpenUpdateProductModal={setOpenUpdateProductModal}
              />
            ) : currentStep == 4 ? (
              <UpdateStepFour
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                complete={currentStep}
                steps={steps}
                setComplete={setComplete}
                finalStepFourData={finalStepFourData}
                setFinalStepFourData={setFinalStepFourData}
              />
            ) : currentStep == 3 ? (
              <UpdateStepThree
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                complete={currentStep}
                steps={steps}
                setComplete={setComplete}
                finalStepOneData={finalStepOneData}
                finalStepTwoData={finalStepTwoData}
                finalStepThreeData={finalStepThreeData}
                setFinalStepThreeData={setFinalStepThreeData}
              />
            ) : currentStep == 2 ? (
              <UpdateStepTwo
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                complete={currentStep}
                steps={steps}
                setComplete={setComplete}
                finalStepOneData={finalStepOneData}
                finalStepTwoData={finalStepTwoData}
                setFinalStepTwoData={setFinalStepTwoData}
              />
            ) : (
              <UpdateStepOne
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                complete={currentStep}
                steps={steps}
                setComplete={setComplete}
                finalStepOneData={finalStepOneData}
                setFinalStepOneData={setFinalStepOneData}
                setFinalStepTwoData={setFinalStepTwoData}
                setFinalStepThreeData={setFinalStepThreeData}
              />
            )}
          </div>

          {/* <div className="m-5 flex items-center justify-between">
          <button
            className="btn font-semibold border border-gray-200 px-5 py-1 rounded-lg text-white bg-primaryColor"
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            Previous
          </button>
          <button
            className="btn font-semibold border border-gray-200 px-5 py-1 rounded-lg text-white bg-primaryColor"
            onClick={handleNext}
            disabled={currentStep === steps.length && !complete}
          >
            {currentStep === steps.length ? "Finish" : "Next"}
          </button>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
