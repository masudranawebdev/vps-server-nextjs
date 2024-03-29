"use client";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useAddProductMutation } from "@/redux/feature/product/productApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import slugify from "slugify";

const ConfirmModal = ({ setOpenPublishProductModal }) => {
  // Step one default data
  const localStaorageJananiStepOneData =
    typeof window !== "undefined"
      ? localStorage.getItem("jananiStepOneData")
      : null;
  const stepOneDefaultdata = localStaorageJananiStepOneData
    ? JSON.parse(localStaorageJananiStepOneData)
    : {};
  // Step two default data
  const localStaorageJananiStepTwoData =
    typeof window !== "undefined"
      ? localStorage.getItem("jananiStepTwoData")
      : null;
  const jananiStepTwoData = localStaorageJananiStepTwoData
    ? JSON.parse(localStaorageJananiStepTwoData)
    : null;
  // Step three default data
  const localStaorageJananiStepThreeData =
    typeof window !== "undefined"
      ? localStorage.getItem("jananiStepThreeData")
      : null;
  const jananiStepThreeData = localStaorageJananiStepThreeData
    ? JSON.parse(localStaorageJananiStepThreeData)
    : {};
  // Step four default data
  const localStaorageJananiStepFourData =
    typeof window !== "undefined"
      ? localStorage.getItem("jananiStepFourData")
      : null;
  const jananiStepFourData = localStaorageJananiStepFourData
    ? JSON.parse(localStaorageJananiStepFourData)
    : {};
  // Step five default data
  const localStaorageJananiStepFiveData =
    typeof window !== "undefined"
      ? localStorage.getItem("jananiStepFiveData")
      : null;
  const jananiStepFiveData = localStaorageJananiStepFiveData
    ? JSON.parse(localStaorageJananiStepFiveData)
    : {};

  const navigate = useRouter();

  const [addProduct] = useAddProductMutation(); //add product
  const [loading, setLoading] = useState(false);

  const handlePublishProduct = () => {
    setLoading(true);
    const createProduct_slug =
      stepOneDefaultdata?.product_name + "-" + stepOneDefaultdata?.product_sku;
    const sendData = {
      category_id: stepOneDefaultdata?.category_id,
      sub_category_id: stepOneDefaultdata?.sub_category_id,
      child_category_id: stepOneDefaultdata?.child_category_id,
      product_name: stepOneDefaultdata?.product_name,
      product_brand_id: stepOneDefaultdata?.brand_id,
      product_model: stepOneDefaultdata?.product_model,
      product_price: stepOneDefaultdata?.product_price,
      product_ecommerce_price: stepOneDefaultdata?.product_ecommerce_price,
      product_discount_price: stepOneDefaultdata?.product_discount_price,
      product_id: stepOneDefaultdata?.product_id,
      product_sku: stepOneDefaultdata?.product_sku,
      product_quantity: stepOneDefaultdata?.product_quantity,
      filters: jananiStepTwoData?.map((item) => ({
        filter_id: item?.filter_id,
        child_filter_id: item?.child_filter_id,
      })),
      specifications: jananiStepThreeData?.map((item) => ({
        specification_id: item?.specification_id,
        specification_details: item?.specification_details?.map((d_item) => ({
          specification_details_id: d_item?.specification_details_id,
          specification_details_value: d_item?.specification_details_value,
        })),
      })),
      product_thumbnail: jananiStepFourData?.mainImage,
      product_images: jananiStepFourData?.anotherImages?.map((item) => ({
        image: item?.image,
      })),
      product_warranty: jananiStepFiveData?.product_warranty,
      product_status: jananiStepFiveData?.product_status,
      product_key_feature: jananiStepFiveData?.product_key_feature,
      product_description: jananiStepFiveData?.product_description,
      product_EMI_price: jananiStepFiveData?.product_EMI_price,
      product_EMI_month: jananiStepFiveData?.product_EMI_month,
      product_slug: slugify(createProduct_slug, {
        lower: true,
        replacement: "-",
      }),
      product_related_slug: slugify(stepOneDefaultdata?.product_name, {
        lower: true,
        replacement: "-",
      }),
      product_hot_deal: jananiStepFiveData?.product_hot_deal,
      product_pc_builder: jananiStepFiveData?.product_pc_builder,
      pc_builder_id: jananiStepFiveData?.pc_builder_id,
      product_gift: jananiStepFiveData?.product_gift,
      meta_keywords: jananiStepFiveData?.meta_keywords?.map((item) => ({
        keyword: item?.keyword,
      })),
      meta_title: jananiStepFiveData?.meta_title,
      meta_description: jananiStepFiveData?.meta_description,
    };
    addProduct(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Product Added successfully !",
          {
            autoClose: 1000,
          }
        );
        localStorage.removeItem("jananiStepOneData");
        localStorage.removeItem("jananiStepTwoData");
        localStorage.removeItem("jananiStepThreeData");
        localStorage.removeItem("jananiStepFourData");
        localStorage.removeItem("jananiStepFiveData");
        setOpenPublishProductModal(false);
        setLoading(false);
        navigate.push("/admin/product/product-list");
      } else {
        toast.error(result?.error?.data?.message, {
          autoClose: 1000,
        });
        setLoading(false);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-full lg:w-10/12 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3
            className="text-[26px] font-bold text-[#0A0A0A] capitalize"
            id="modal-title"
          >
            {" "}
            Publish Product{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => setOpenPublishProductModal(false)}
              size={25}
            ></RxCross1>
          </button>
        </div>

        <h2 className="text-green-500 text-center mt-8 text-xl">
          Are you sure you want to publish this product?
        </h2>

        <div className="flex justify-end mt-6 gap-4">
          <button
            type="button"
            onClick={() => setOpenPublishProductModal(false)}
            className="btn px-6 py-2.5 transition-colors duration-300 transform bg-white rounded-xl border hover:bg-primaryColor hover:text-white"
          >
            Cancel
          </button>
          {loading ? (
            <button
              type="button"
              disabled
              className="px-6 py-2 text-white transition-colors duration-300 transform bg-primaryColor rounded-xl hover:bg-primaryColor"
            >
              <MiniSpinner /> :
            </button>
          ) : (
            <button
              onClick={() => handlePublishProduct()}
              type="button"
              className="px-6 py-2.5 text-white transition-colors duration-300 transform bg-green-500 rounded-xl hover:bg-green-400"
            >
              Publish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
