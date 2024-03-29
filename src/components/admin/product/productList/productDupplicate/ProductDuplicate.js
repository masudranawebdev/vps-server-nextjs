"use client";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import "../../productCreate/stepper.css";
import DuplicateStepOne from "./DuplicateStepOne";
import DuplicateStepTwo from "./DuplicateStepTwo";
import DuplicateStepThree from "./DuplicateStepThree";
import DuplicateStepFour from "./DuplicateStepFour";
import DuplicatteStepFive from "./DuplicatteStepFive";

const ProductDuplicate = ({
  refetch,
  setOpenDuplicateProductModal,
  openDuplicateProductModalValue,
}) => {
  const steps = ["", "", "", "", ""];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  //   first step initial data
  const [finalStepOneData, setFinalStepOneData] = useState({
    category_id: openDuplicateProductModalValue?.category_id?._id,
    category_name: openDuplicateProductModalValue?.category_id?.category_name,
    sub_category_id: openDuplicateProductModalValue?.sub_category_id?._id,
    sub_category_name:
      openDuplicateProductModalValue?.sub_category_id?.sub_category_name,
    child_category_id: openDuplicateProductModalValue?.child_category_id?._id,
    child_category_name:
      openDuplicateProductModalValue?.child_category_id?.child_category_name,
    product_brand_id: openDuplicateProductModalValue?.product_brand_id?._id,
    product_brand_name:
      openDuplicateProductModalValue?.product_brand_id?.brand_name,
    product_name: openDuplicateProductModalValue?.product_name,
    product_model: openDuplicateProductModalValue?.product_model,
    product_price: openDuplicateProductModalValue?.product_price,
    product_ecommerce_price:
      openDuplicateProductModalValue?.product_ecommerce_price,
    product_discount_price:
      openDuplicateProductModalValue?.product_discount_price,
    product_id: openDuplicateProductModalValue?.product_id,
    product_sku: openDuplicateProductModalValue?.product_sku,
    product_quantity: openDuplicateProductModalValue?.product_quantity,
  });
  //   step two initial data
  const [finalStepTwoData, setFinalStepTwoData] = useState(
    openDuplicateProductModalValue?.filters
  );
  //   step three initial data
  const [finalStepThreeData, setFinalStepThreeData] = useState(
    openDuplicateProductModalValue?.specifications
  );
  //   step four initial data
  const [finalStepFourData, setFinalStepFourData] = useState({
    mainImage: openDuplicateProductModalValue?.product_thumbnail,
    anotherImages: openDuplicateProductModalValue?.product_images,
  });
  //   step five initial data
  const [finalStepFiveData, setFinalStepFiveData] = useState({
    product_warranty: openDuplicateProductModalValue?.product_warranty,
    product_EMI_price: openDuplicateProductModalValue?.product_EMI_price,
    product_EMI_month: openDuplicateProductModalValue?.product_EMI_month,
    product_status: openDuplicateProductModalValue?.product_status,
    product_gift: openDuplicateProductModalValue?.product_gift,
    product_key_feature: openDuplicateProductModalValue?.product_key_feature,
    product_description: openDuplicateProductModalValue?.product_description,
    product_hot_deal: openDuplicateProductModalValue?.product_hot_deal,
    meta_title: openDuplicateProductModalValue?.meta_title,
    meta_keywords: openDuplicateProductModalValue?.meta_keywords,
    meta_description: openDuplicateProductModalValue?.meta_description,
  });

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
                setOpenDuplicateProductModal(false);
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
              <DuplicatteStepFive
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
                setOpenDuplicateProductModal={setOpenDuplicateProductModal}
              />
            ) : currentStep == 4 ? (
              <DuplicateStepFour
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                complete={currentStep}
                steps={steps}
                setComplete={setComplete}
                finalStepFourData={finalStepFourData}
                setFinalStepFourData={setFinalStepFourData}
              />
            ) : currentStep == 3 ? (
              <DuplicateStepThree
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
              <DuplicateStepTwo
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
              <DuplicateStepOne
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
        </div>
      </div>
    </div>
  );
};

export default ProductDuplicate;
