"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import ConfirmDuplicateModal from "./ConfirmDuplicateModal";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/baseURL";
import Select from "react-select";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const DuplicatteStepFive = ({
  currentStep,
  setCurrentStep,
  complete,
  steps,
  setComplete,
  finalStepOneData,
  finalStepTwoData,
  finalStepThreeData,
  finalStepFourData,
  finalStepFiveData,
  setFinalStepFiveData,
  refetch,
  setOpenDuplicateProductModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //  set default data
  const [product_key_feature, setProduct_key_feature] = useState(
    finalStepFiveData?.product_key_feature
      ? finalStepFiveData?.product_key_feature
      : ""
  );
  const [product_description, setProduct_description] = useState(
    finalStepFiveData?.product_description
      ? finalStepFiveData?.product_description
      : ""
  );

  // pc builder set
  const category_id = finalStepOneData?.category_id
    ? finalStepOneData?.category_id
    : "";
  const [pc_builder_id, setPc_builder_id] = useState(
    finalStepFiveData?.pc_builder_id?._id
  );
  const [pc_builder_name, setPc_builder_name] = useState(
    finalStepFiveData?.pc_builder_id?.pc_builder_name
  );

  const [pc_builder_categories, setPc_builder_categories] = useState([]);

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const { data: pcBuilders = [] } = useQuery({
    queryKey: [`/api/v1/category/dashboard`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/pc_builder/dashboard`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    },
  }); // get all pc builder for select

  //   set pc builder category
  useEffect(() => {
    const getSubCategoryData = pcBuilders?.data?.filter(
      (pc_builder) => pc_builder?.category_id?._id === category_id
    );
    setPc_builder_categories(getSubCategoryData);
  }, [pcBuilders?.data, category_id]);

  // handle pc builder
  const handlePCBuilderChange = () => {
    setFinalStepFiveData((prevState) => ({
      ...prevState,
      product_pc_builder: !prevState.product_pc_builder,
    }));
  };

  //   set keyword
  const [keywords, setKeywords] = useState(
    finalStepFiveData
      ? finalStepFiveData?.meta_keywords
        ? finalStepFiveData?.meta_keywords
        : []
      : []
  );

  const [inputKeyword, setInputKeyword] = useState("");
  const [openPublishProductModal, setOpenPublishProductModal] = useState(false);

  //   add keyword
  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newKeyword = inputKeyword.trim();
      if (newKeyword !== "") {
        setKeywords([...keywords, { keyword: newKeyword }]);
        setInputKeyword(""); // Clear the input field
      }
    }
  };
  // remove keyword
  const removeKeyword = (keywordToRemove) => {
    const updatedKeywords = keywords.filter(
      (keyword) => keyword?.keyword !== keywordToRemove
    );
    setKeywords(updatedKeywords);
  };
  //handle keyword
  const handleKeywordChange = (e) => {
    setInputKeyword(e.target.value);
  };

  const handleChange = () => {
    setFinalStepFiveData((prevState) => ({
      ...prevState,
      product_hot_deal: !prevState.product_hot_deal,
    }));
  };

  // steper manage
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setComplete(false);
    }
  };
  // submit data
  const handleDataPost = (data) => {
    if (!product_key_feature) {
      toast.error("Please fill up Key Feature field");
      return;
    }
    if (
      (data?.product_EMI_price && !data?.product_EMI_month) ||
      (!data?.product_EMI_price && data?.product_EMI_month)
    ) {
      toast.error(
        "Please fill up both EMI price and month or don't fill up any field"
      );
      return;
    }
    if (data?.product_pc_builder == true) {
      if (!pc_builder_id) {
        toast.error("Please select a pc builder type", {
          autoClose: 1000,
        });
        return;
      }
    }
    const sendData = {
      product_warranty: data?.product_warranty,
      product_EMI_price: data?.product_EMI_price,
      product_EMI_month: data?.product_EMI_month,
      product_status: data?.product_status,
      product_gift: data?.product_gift,
      product_key_feature,
      product_description,
      product_pc_builder: data?.product_pc_builder,
      pc_builder_id: pc_builder_id,
      product_hot_deal: data?.product_hot_deal,
      meta_title: data?.meta_title,
      meta_description: data?.meta_description,
      meta_keywords: keywords?.map((item) => ({
        keyword: item?.keyword,
      })),
    };
    if (pc_builder_id && data?.product_pc_builder === true) {
      sendData.pc_builder_id = pc_builder_id;
    }
    setFinalStepFiveData(sendData);
    setOpenPublishProductModal(true);
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <div>
            <label htmlFor="product_warranty" className="font-medium">
              Product Warranty<span className="text-red-500">*</span>
            </label>
            <input
              defaultValue={finalStepFiveData?.product_warranty}
              {...register("product_warranty", {
                required: "Product Warranty is required",
              })}
              id="product_warranty"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.product_warranty && (
              <p className="text-red-600">{errors.product_warranty?.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="product_EMI_price" className="font-medium">
              Product EMI Price
            </label>
            <input
              defaultValue={finalStepFiveData?.product_EMI_price}
              {...register("product_EMI_price", { min: 1 })}
              id="product_EMI_price"
              type="number"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>

          <div>
            <label htmlFor="product_EMI_month" className="font-medium">
              EMI Month
            </label>
            <input
              defaultValue={finalStepFiveData?.product_EMI_month}
              {...register("product_EMI_month", { min: 1 })}
              id="product_EMI_month"
              type="number"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-4">
          <div>
            <label className="font-medium" htmlFor="product_status">
              {" "}
              product Status{" "}
            </label>
            <select
              {...register("product_status", {
                required: "product Status is required"
              })}
              id="product_status"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            >
              <option value="active">Active</option>
              <option value="in-active">In-Active</option>
            </select>
            {errors.product_status && (
              <p className="text-red-600">{errors.product_status?.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="product_gift" className="font-medium">
              Product Gift
            </label>
            <input
              defaultValue={finalStepFiveData?.product_gift}
              {...register("product_gift")}
              id="product_gift"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="keyFeature">Product Key Feature</label>
          <ReactQuill
            className="mt-2"
            id="keyFeature"
            theme="snow"
            value={product_key_feature}
            onChange={setProduct_key_feature}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="product_description">Product Description</label>
          <ReactQuill
            className="mt-2"
            id="product_description"
            theme="snow"
            value={product_description}
            onChange={setProduct_description}
          />
        </div>

        <div className="mt-4 flex items-center gap-2">
          <input
            {...register("product_hot_deal")}
            id="product_hot_deal"
            type="checkbox"
            className="w-5 h-5"
            checked={finalStepFiveData?.product_hot_deal}
            onChange={handleChange} // Call handleChange when the checkbox is clicked
          />
          <label htmlFor="product_hot_deal" className="font-medium text-xl">
            Add Hot Deal ?
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mt-4 flex items-center gap-2">
            <input
              {...register("product_pc_builder")}
              id="product_pc_builder"
              type="checkbox"
              className="w-5 h-5"
              checked={finalStepFiveData?.product_pc_builder}
              onChange={handlePCBuilderChange} // Call handlePCBuilderChange when the checkbox is clicked
            />
            <label htmlFor="product_pc_builder" className="font-medium text-xl">
              Add PC Builder ?
            </label>
          </div>
          {finalStepFiveData?.product_pc_builder == true && (
            <div>
              <p className="font-medium"> Category Name: </p>
              <Select
                id="pc_builder_id"
                name="pc_builder_id"
                isClearable
                defaultValue={{
                  _id: pc_builder_id,
                  pc_builder_name: pc_builder_name,
                }}
                aria-label="Please select a data"
                options={pc_builder_categories}
                getOptionLabel={(x) => x?.pc_builder_name}
                getOptionValue={(x) => x?._id}
                onChange={(selectedOption) => {
                  setPc_builder_id(selectedOption?._id);
                  setPc_builder_name(selectedOption?.pc_builder_name);
                }}
              ></Select>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="fname" className="text-base font-medium">
            Meta Keyword
          </label>
          {keywords?.length > 0 && (
            <div className="flex flex-wrap gap-1 bg-white mb-3 rounded-lg py-1 min-h-[50px] items-center">
              {keywords?.map((keyword, index) => (
                <div
                  key={index}
                  className="bg-gray-300 text-black py-1 px-2 mx-1 rounded-full flex item-center justify-center h-auto"
                >
                  <span>{keyword?.keyword}</span>
                  <div
                    className="ml-2 w-6 h-6 cursor-pointer bg-gray-400 rounded-full px-2 flex item-center justify-center"
                    onClick={() => removeKeyword(keyword?.keyword)}
                  >
                    X
                  </div>
                </div>
              ))}
            </div>
          )}
          <input
            type="text"
            className="bg-bgray-50 border border-gray-300 p-4 rounded-lg h-14 focus:border focus:border-success-300 focus:ring-0"
            name="fname"
            value={inputKeyword}
            onChange={handleKeywordChange}
            onKeyDown={handleKeyPress}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="meta_title" className="font-medium">
            Meta Title
          </label>
          <input
            defaultValue={finalStepFiveData?.meta_title}
            {...register("meta_title")}
            id="meta_title"
            type="text"
            className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="meta_description" className="font-medium">
            Meta Description
          </label>
          <textarea
            cols={5}
            defaultValue={finalStepFiveData?.meta_description}
            {...register("meta_description")}
            id="meta_description"
            type="text"
            className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
          />
        </div>

        <div className="m-5 flex items-center justify-between">
          <button
            type="button"
            className="btn font-semibold border border-gray-200 px-5 py-1 rounded-lg text-white bg-primaryColor"
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            Previous
          </button>
          <button
            type="submit"
            className="btn font-semibold border border-gray-200 px-5 py-1 rounded-lg text-white bg-primaryColor"
            disabled={currentStep === steps.length && !complete}
          >
            {currentStep === steps.length ? "Finish" : "Next"}
          </button>
        </div>
      </form>
      {openPublishProductModal && (
        <ConfirmDuplicateModal
          setOpenPublishProductModal={setOpenPublishProductModal}
          finalStepOneData={finalStepOneData}
          finalStepTwoData={finalStepTwoData}
          finalStepThreeData={finalStepThreeData}
          finalStepFourData={finalStepFourData}
          finalStepFiveData={finalStepFiveData}
          refetch={refetch}
          setOpenDuplicateProductModal={setOpenDuplicateProductModal}
        />
      )}
    </>
  );
};

export default DuplicatteStepFive;
