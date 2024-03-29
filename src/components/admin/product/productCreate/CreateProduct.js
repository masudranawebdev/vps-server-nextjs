"use client";

import { useState } from "react";
import { TiTick } from "react-icons/ti";
import "./stepper.css";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";

const CreateProduct = () => {
  const steps = ["", "", "", "", ""];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  //   const handleNext = () => {
  //     if (currentStep === steps.length) {
  //       setComplete(true);
  //     } else {
  //       setCurrentStep((prev) => prev + 1);
  //     }
  //   };

  //   const handlePrev = () => {
  //     if (currentStep > 1) {
  //       setCurrentStep((prev) => prev - 1);
  //       setComplete(false);
  //     }
  //   };

  return (
    <>
      <div className="mt-6 bg-white rounded-lg shadow-xl p-2">
        <div className="flex items-center justify-center mt-4">
          {steps?.map((step, i) => (
            <div
              key={i}
              className={`step-item ${currentStep === i + 1 && "active"} ${
                (i + 1 < currentStep || complete) && "complete"
              }`}
            >
              <div className="step">
                {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
              </div>
              <p className="text-gray-500">{step}</p>
            </div>
          ))}
        </div>

        <div className="m-4 mt-10">
          {currentStep == 5 ? (
            <StepFive
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              complete={currentStep}
              steps={steps}
              setComplete={setComplete}
            />
          ) : currentStep == 4 ? (
            <StepFour
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              complete={currentStep}
              steps={steps}
              setComplete={setComplete}
            />
          ) : currentStep == 3 ? (
            <StepThree
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              complete={currentStep}
              steps={steps}
              setComplete={setComplete}
            />
          ) : currentStep == 2 ? (
            <StepTwo
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              complete={currentStep}
              steps={steps}
              setComplete={setComplete}
            />
          ) : (
            <StepOne
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              complete={currentStep}
              steps={steps}
              setComplete={setComplete}
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
    </>
  );
};

export default CreateProduct;
