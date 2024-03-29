"use client";

import BigSpinner from "@/components/common/loader/BigSpinner";
import { useCheckIdAndSkuUpdateMutation } from "@/redux/feature/product/productApi";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Select from "react-select";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const UpdateStepOne = ({
  currentStep,
  setCurrentStep,
  complete,
  steps,
  setComplete,
  setFinalStepOneData,
  finalStepOneData,
  setFinalStepTwoData,
  setFinalStepThreeData,
}) => {
  const stepOneDefaultdata = finalStepOneData;

  const [category_id, setCategory_id] = useState(
    stepOneDefaultdata?.category_id
  );

  const [category_name, setCategory_name] = useState(
    stepOneDefaultdata?.category_name
  );
  const [isSub_CategoryOpen, setIsSub_CategoryOpen] = useState(true);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [sub_category_id, setSub_Category_id] = useState(
    stepOneDefaultdata?.sub_category_id
  );
  const [sub_category_name, setSub_Category_name] = useState(
    stepOneDefaultdata?.sub_category_name
  );
  const [isChild_CategoryOpen, setIsChild_CategoryOpen] = useState(true);
  const [childCategoryData, setChildCategoryData] = useState([]);
  const [child_category_id, setChild_Category_id] = useState(
    stepOneDefaultdata?.child_category_id
  );
  const [child_category_name, setChild_Category_name] = useState(
    stepOneDefaultdata?.child_category_name
  );
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [brandData, setBrandData] = useState([]);
  const [brand_id, setBrand_id] = useState(
    stepOneDefaultdata?.product_brand_id
  );
  const [brand_name, setBrand_name] = useState(
    stepOneDefaultdata?.product_brand_name
  );

  // set default value
  const categoryNameValue = stepOneDefaultdata?.category_name;
  const categoryNameId = stepOneDefaultdata?.category_id;

  const sub_categoryNameValue = stepOneDefaultdata?.sub_category_name;
  const sub_categoryNameId = stepOneDefaultdata?.sub_category_id;

  const child_categoryNameValue = stepOneDefaultdata?.child_category_name;
  const child_categoryNameId = stepOneDefaultdata?.child_category__id;

  const brandNameValue = stepOneDefaultdata?.product_brand_name;
  const brandNameId = stepOneDefaultdata?.product_brand_id;

  // set  change value state
  const [isChangeCategory, setIsChangeCategory] = useState(false);
  const [isChangeSub_Category, setIsChangeSub_Category] = useState(false);
  const [isChangeChild_Category, setIsChangeChild_Category] = useState(false);

  const [checkProductIdAndSkuUniqueWhenUpdate] =
    useCheckIdAndSkuUpdateMutation(); //check product id and sku

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: [`/api/v1/category/dashboard`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/category/dashboard`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    },
  }); // get all category for select

  const { data: sub_categories = [] } = useQuery({
    queryKey: [`/api/v1/sub_category/dashboard`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/sub_category/dashboard`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    },
  }); // get all Sub category for select

  const { data: child_categories = [] } = useQuery({
    queryKey: [`/api/v1/child_category/dashboard`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/child_category/dashboard`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    },
  }); // get all Child category for select

  const { data: brands = [] } = useQuery({
    queryKey: [`/api/v1/brand`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/brand`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    },
  }); // get all Brand for select

  //   set sub category
  useEffect(() => {
    const getSubCategoryData = sub_categories?.data?.filter(
      (sub_category) => sub_category?.category_id?._id === category_id
    );
    setSubCategoryData(getSubCategoryData);
  }, [sub_categories?.data, category_id]);

  //   set child category
  useEffect(() => {
    const getChildCategoryData = child_categories?.data?.filter(
      (child_category) =>
        child_category?.category_id?._id === category_id &&
        child_category?.sub_category_id?._id === sub_category_id
    );
    setChildCategoryData(getChildCategoryData);
  }, [child_categories?.data, category_id, sub_category_id]);

  //   set brand
  useEffect(() => {
    if (brands?.data) {
      const getBrandData = brands.data.filter((brand) => {
        // Check if the brand's category_id matches the current category_id
        const categoryMatch = brand?.category_id?._id === category_id;
        return categoryMatch;
      });
      setBrandData(getBrandData);
    }
  }, [brands?.data, category_id]);

  // steper manage
  //   const handleNext = () => {
  //     if (currentStep === steps.length) {
  //       setComplete(true);
  //     } else {
  //       setCurrentStep((prev) => prev + 1);
  //     }
  //   };

  //   steper manage
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setComplete(false);
    }
  };

  const handleDataPost = (data) => {
    const sendIdSku = {
      product_id: data?.product_id
        ? data?.product_id
        : stepOneDefaultdata?.product_id,
      product_sku: data?.product_sku
        ? data?.product_sku
        : stepOneDefaultdata?.product_sku,
      _id: stepOneDefaultdata?._id,
    };
    if (!sendIdSku?.product_id) {
      toast.error("Please select a product id", {
        autoClose: 1000,
      });
      return;
    }
    if (!sendIdSku?.product_sku) {
      toast.error("Please enter a sku", {
        autoClose: 1000,
      });
      return;
    }
    checkProductIdAndSkuUniqueWhenUpdate(sendIdSku).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        const sendData = {
          category_id: category_id,
          category_name: category_name,
          sub_category_id: sub_category_id,
          sub_category_name: sub_category_name,
          child_category_id: child_category_id,
          child_category_name: child_category_name,
          product_brand_id: brand_id,
          product_brand_name: brand_name,
          product_name: data?.product_name
            ? data?.product_name
            : stepOneDefaultdata?.product_name,
          product_model: data?.product_model
            ? data?.product_model
            : stepOneDefaultdata?.product_model,
          product_price: data?.product_price
            ? data?.product_price
            : stepOneDefaultdata?.product_price,
          product_ecommerce_price: data?.product_ecommerce_price,
          product_discount_price: data?.product_discount_price,
          product_id: data?.product_id
            ? data?.product_id
            : stepOneDefaultdata?.product_id,
          product_sku: data?.product_sku
            ? data?.product_sku
            : stepOneDefaultdata?.product_sku,
          product_quantity: data?.product_quantity
            ? data?.product_quantity
            : stepOneDefaultdata?.product_quantity,
          _id: stepOneDefaultdata?._id,
        };

        if (!sendData?.sub_category_id) {
          delete sendData?.sub_category_id;
        }
        if (!sendData?.sub_category_name) {
          delete sendData?.sub_category_name;
        }
        if (!sendData?.child_category_id) {
          delete sendData?.child_category_id;
        }
        if (!sendData?.child_category_name) {
          delete sendData?.child_category_name;
        }
        if (!sendData?.category_id) {
          toast.error("Please select a category", {
            autoClose: 1000,
          });
          return;
        }
        if (!sendData?.product_brand_id) {
          toast.error("Please select a brand", {
            autoClose: 1000,
          });
          return;
        }
        if (!sendData?.product_name) {
          toast.error("Please select a product name", {
            autoClose: 1000,
          });
          return;
        }
        if (!sendData?.product_model) {
          toast.error("Please select a model", {
            autoClose: 1000,
          });
          return;
        }
        if (!sendData?.product_price) {
          toast.error("Please enter a price", {
            autoClose: 1000,
          });
          return;
        }

        if (!sendData?.product_quantity) {
          toast.error("Please select a quantity", {
            autoClose: 1000,
          });
          return;
        }

        setFinalStepOneData(sendData);
        if (currentStep === steps.length) {
          setComplete(true);
        } else {
          setCurrentStep((prev) => prev + 1);
        }
      } else {
        toast.error(result?.error?.data?.message, {
          autoClose: 1000,
        });
      }
    });
  };

  if (isLoading) {
    return <BigSpinner />;
  }
  return (
    <div>
      <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <div className="mt-4">
            <p className="font-medium">
              {" "}
              Category Name<span className="text-red-500">*</span>{" "}
            </p>

            <Select
              id="category_id"
              name="category_id"
              required
              isClearable
              defaultValue={{
                _id: categoryNameId,
                category_name: categoryNameValue,
              }}
              aria-label="Select a Category"
              options={categories?.data}
              getOptionLabel={(x) => x?.category_name}
              getOptionValue={(x) => x?._id}
              onChange={(selectedOption) => {
                setIsChangeCategory(true);
                setIsChild_CategoryOpen(false);
                setIsSub_CategoryOpen(false);
                setIsBrandOpen(false);
                setCategory_id(selectedOption?._id);
                setCategory_name(selectedOption?.category_name);
                setSub_Category_name("");
                setSub_Category_id("");
                setChild_Category_name("");
                setChild_Category_id("");
                setBrand_name("");
                setBrand_id("");
                setFinalStepTwoData([]);
                setFinalStepThreeData([]);
                setTimeout(() => {
                  setIsSub_CategoryOpen(true);
                  setIsChild_CategoryOpen(true);
                  setIsBrandOpen(true);
                }, 100);
              }}
            ></Select>
          </div>

          {isSub_CategoryOpen && (
            <div className="mt-4">
              <p className="font-medium"> Sub Category Name </p>
              {isChangeCategory == true ? (
                <Select
                  id="sub_category_id"
                  name="sub_category_id"
                  aria-label="Select a Sub Category"
                  isClearable
                  options={subCategoryData}
                  getOptionLabel={(x) => x?.sub_category_name}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) => {
                    setIsChangeSub_Category(true);
                    setIsChild_CategoryOpen(false);
                    setSub_Category_id(selectedOption?._id);
                    setSub_Category_name(selectedOption?.sub_category_name);
                    setChild_Category_name("");
                    setChild_Category_id("");
                    setTimeout(() => {
                      setIsChild_CategoryOpen(true);
                    }, 100);
                  }}
                ></Select>
              ) : (
                <Select
                  id="sub_category_id"
                  name="sub_category_id"
                  defaultValue={{
                    _id: sub_categoryNameId,
                    sub_category_name: sub_categoryNameValue,
                  }}
                  isClearable
                  aria-label="Select a Sub Category"
                  options={subCategoryData}
                  getOptionLabel={(x) => x?.sub_category_name}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) => {
                    setIsChangeSub_Category(true);
                    setIsChild_CategoryOpen(false);
                    setSub_Category_id(selectedOption?._id);
                    setSub_Category_name(selectedOption?.sub_category_name);
                    setTimeout(() => {
                      setIsChild_CategoryOpen(true);
                    }, 100);
                  }}
                ></Select>
              )}
            </div>
          )}

          {isChild_CategoryOpen && (
            <div className="mt-4">
              <p className="font-medium"> Child Category Name </p>
              {isChangeCategory == true || isChangeSub_Category == true ? (
                <Select
                  id="child_category_id"
                  name="child_category_id"
                  aria-label="Select a Child Category"
                  isClearable
                  options={childCategoryData}
                  getOptionLabel={(x) => x?.child_category_name}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) => {
                    setIsChangeChild_Category(true);
                    setChild_Category_id(selectedOption?._id);
                    setChild_Category_name(selectedOption?.child_category_name);
                  }}
                ></Select>
              ) : (
                <Select
                  id="child_category_id"
                  name="child_category_id"
                  isClearable
                  defaultValue={{
                    _id: child_categoryNameId,
                    child_category_name: child_categoryNameValue,
                  }}
                  aria-label="Select a Child Category"
                  options={childCategoryData}
                  getOptionLabel={(x) => x?.child_category_name}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) => {
                    setIsChangeChild_Category(true);
                    setChild_Category_id(selectedOption?._id);
                    setChild_Category_name(selectedOption?.child_category_name);
                  }}
                ></Select>
              )}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <div className="mt-4">
            <label htmlFor="product_name" className="font-medium">
              Product Name<span className="text-red-500">*</span>
            </label>
            <input
              defaultValue={stepOneDefaultdata?.product_name}
              {...register("product_name", {
                required: "Product Name is required",
              })}
              id="product_name"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.product_name && (
              <p className="text-red-600">{errors.product_name?.message}</p>
            )}
          </div>

          {isBrandOpen && (
            <div className="mt-4">
              <p className="font-medium">
                {" "}
                Brand Name<span className="text-red-500">*</span>{" "}
              </p>
              {isChangeCategory == true ? (
                <Select
                  id="brand_id"
                  name="brand_id"
                  aria-label="Select a Brand"
                  isClearable
                  required
                  options={brandData}
                  getOptionLabel={(x) => x?.brand_name}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) => {
                    setBrand_id(selectedOption?._id);
                    setBrand_name(selectedOption?.brand_name);
                  }}
                ></Select>
              ) : (
                <Select
                  id="brand_id"
                  name="brand_id"
                  aria-label="Select a Brand"
                  isClearable
                  required
                  defaultValue={{
                    _id: brandNameId,
                    brand_name: brandNameValue,
                  }}
                  options={brandData}
                  getOptionLabel={(x) => x?.brand_name}
                  getOptionValue={(x) => x?._id}
                  onChange={(selectedOption) => {
                    setBrand_id(selectedOption?._id);
                    setBrand_name(selectedOption?.brand_name);
                  }}
                ></Select>
              )}
            </div>
          )}
          <div className="mt-4">
            <label htmlFor="product_model" className="font-medium">
              Model Name<span className="text-red-500">*</span>
            </label>
            <input
              defaultValue={stepOneDefaultdata?.product_model}
              {...register("product_model", {
                required: "Model Name is required",
              })}
              id="product_model"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.product_model && (
              <p className="text-red-600">{errors.product_model?.message}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <div className="mt-4">
            <label htmlFor="product_price" className="font-medium">
              Product Price<span className="text-red-500">*</span>
            </label>
            <input
              defaultValue={stepOneDefaultdata?.product_price}
              {...register(
                "product_price",
                { min: 1 },
                {
                  required: "Product Price is required",
                }
              )}
              id="product_price"
              type="number"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.product_price && (
              <p className="text-red-600">{errors.product_price?.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="product_ecommerce_price" className="font-medium">
              Ecommerce Price
            </label>
            <input
              defaultValue={stepOneDefaultdata?.product_ecommerce_price}
              {...register("product_ecommerce_price", { min: 1 })}
              id="product_ecommerce_price"
              type="number"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="product_discount_price" className="font-medium">
              Discount Price
            </label>
            <input
              defaultValue={stepOneDefaultdata?.product_discount_price}
              {...register("product_discount_price", { min: 1 })}
              id="product_discount_price"
              type="number"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <div className="mt-4">
            <label htmlFor="product_id" className="font-medium">
              Product Id<span className="text-red-500">*</span>
            </label>
            <input
              defaultValue={stepOneDefaultdata?.product_id}
              {...register("product_id", {
                required: "Product Id is required",
              })}
              id="product_id"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.product_id && (
              <p className="text-red-600">{errors.product_id?.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="product_sku" className="font-medium">
              Product SKU<span className="text-red-500">*</span>
            </label>
            <input
              defaultValue={stepOneDefaultdata?.product_sku}
              {...register("product_sku", {
                required: "Product SKU is required",
              })}
              id="product_sku"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.product_sku && (
              <p className="text-red-600">{errors.product_sku?.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="product_quantity" className="font-medium">
              Product Quantity<span className="text-red-500">*</span>
            </label>
            <input
              defaultValue={stepOneDefaultdata?.product_quantity}
              {...register(
                "product_quantity",
                { min: 1 },
                {
                  required: "Product Quantity is required",
                }
              )}
              id="product_quantity"
              type="number"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.product_quantity && (
              <p className="text-red-600">{errors.product_quantity?.message}</p>
            )}
          </div>
        </div>

        <div className="m-5 flex items-center justify-between">
          <button
            className="btn font-semibold border border-gray-200 px-5 py-1 rounded-lg text-white bg-primaryColor"
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            Previous
          </button>
          <button
            type="submit"
            className="btn font-semibold border border-gray-200 px-5 py-1 rounded-lg text-white bg-primaryColor"
            //   onClick={handleNext}
            disabled={currentStep === steps.length && !complete}
          >
            {currentStep === steps.length ? "Finish" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStepOne;
