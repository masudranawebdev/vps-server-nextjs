"use client";

import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState } from "react";
import EditOfferProduct from "./EditOfferProduct";
import { useUpdateOfferMutation } from "@/redux/feature/offer/offerApi";
// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { ImageValidate } from "@/utils/ImageValidate";
import Image from "next/image";

const EditOffer = ({
  refetch,
  setOpenUpdateOfferModal,
  openUpdateOfferModalValue,
}) => {
  // store selected product
  const [addProduct, setAddProduct] = useState(
    openUpdateOfferModalValue?.offer_products
  );
  const [loading, setLoading] = useState(false);
  const [isOffer_status, setIsOffer_status] = useState(
    openUpdateOfferModalValue?.offer_status
  );
  const [isOfferImage, setIsOfferImage] = useState(
    openUpdateOfferModalValue?.offer_image
  );
  const [offer_description, setOffer_description] = useState(
    openUpdateOfferModalValue?.offer_description
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //   image preview
  const handleOfferImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setIsOfferImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [updateOffer] = useUpdateOfferMutation(); //update offer
  const handleDataPost = (data) => {
    if (data?.offer_image[0]) {
      setLoading(true);
      const formData = new FormData();
      let errorEncountered = false;

      if (data?.offer_image[0]) {
        const offer_image = data?.offer_image[0];
        const result = ImageValidate(offer_image, "offer_image"); //check image type
        if (result == true) {
          formData.append("offer_image", offer_image);
        } else {
          toast.error(`Must be a png/jpg/webp/jpeg image In Logo`, {
            autoClose: 1000,
          });
          errorEncountered = true;
        }
      }

      if (errorEncountered == true) {
        setLoading(false);
        return;
      }
      formData.append(
        "offer_title",
        data?.offer_title
          ? data?.offer_title
          : openUpdateOfferModalValue?.offer_title
      );
      formData.append("offer_description", offer_description);
      formData.append(
        "offer_start_date",
        data?.offer_start_date
          ? data?.offer_start_date
          : openUpdateOfferModalValue?.offer_start_date
      );
      formData.append(
        "offer_end_date",
        data?.offer_end_date
          ? data?.offer_end_date
          : openUpdateOfferModalValue?.offer_end_date
      );
      formData.append(
        "offer_status",
        data?.offer_status
          ? data?.offer_status
          : openUpdateOfferModalValue?.offer_status
      );
      formData.append("public_id", openUpdateOfferModalValue?.public_id);
      formData.append(
        "offer_outlet",
        data?.offer_outlet
          ? data?.offer_outlet
          : openUpdateOfferModalValue?.offer_outlet
      );
      formData.append("_id", openUpdateOfferModalValue?._id);
      addProduct.forEach((item, index) => {
        formData.append(
          `offer_products[${index}][offer_product_id]`,
          item?.offer_product_id?._id
        );
      });
      updateOffer(formData).then((result) => {
        if (result?.data?.statusCode == 200 && result?.data?.success == true) {
          toast.success(
            result?.data?.message
              ? result?.data?.message
              : "Offer Update successfully !",
            {
              autoClose: 1000,
            }
          );
          reset();
          refetch();
          setLoading(false);
          setOpenUpdateOfferModal(false);
        } else {
          setLoading(false);
          toast.error(result?.error?.data?.message, {
            autoClose: 1000,
          });
        }
      });
    } else {
      setLoading(true);
      const sendData = {
        _id: openUpdateOfferModalValue?._id,
        offer_title: data?.offer_title
          ? data?.offer_title
          : openUpdateOfferModalValue?.offer_title,
        offer_image: openUpdateOfferModalValue?.offer_image,
        public_id: openUpdateOfferModalValue?.public_id,
        offer_description: offer_description,
        offer_start_date: data?.offer_start_date
          ? data?.offer_start_date
          : openUpdateOfferModalValue?.offer_start_date,
        offer_end_date: data?.offer_end_date
          ? data?.offer_end_date
          : openUpdateOfferModalValue?.offer_end_date,
        offer_status: data?.offer_status
          ? data?.offer_status
          : openUpdateOfferModalValue?.offer_status,
        offer_outlet: data?.offer_outlet
          ? data?.offer_outlet
          : openUpdateOfferModalValue?.offer_outlet,
        offer_products: addProduct?.map((item) => ({
          offer_product_id: item?.offer_product_id?._id,
        })),
      };
      updateOffer(sendData).then((result) => {
        if (result?.data?.statusCode == 200 && result?.data?.success == true) {
          toast.success(
            result?.data?.message
              ? result?.data?.message
              : "Offer Update successfully !",
            {
              autoClose: 1000,
            }
          );
          reset();
          refetch();
          setLoading(false);
          setOpenUpdateOfferModal(false);
        } else {
          setLoading(false);
          toast.error(result?.error?.data?.message, {
            autoClose: 1000,
          });
        }
      });
    }
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
            Update Offer{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                setOpenUpdateOfferModal(false);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>
        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div>
            <label htmlFor="offer_title" className="font-medium">
              Offer Title
            </label>
            <input
              defaultValue={openUpdateOfferModalValue?.offer_title}
              {...register("offer_title")}
              id="offer_title"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>
          <div className="mt-4">
            {isOfferImage && (
              <div className="flex items-center justify-center">=
                <Image src={isOfferImage} alt="" height={200} width={200} />
              </div>
            )}
            <label htmlFor="offer_image" className="font-medium">
              Offer Image
            </label>
            <input
              onInput={(e) => handleOfferImageChange(e)}
              {...register("offer_image")}
              id="offer_image"
              type="file"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>
          <div className="mt-4">
            <label className="font-medium"> Offer Description </label>
            <ReactQuill
              className="mt-2"
              theme="snow"
              value={offer_description}
              onChange={setOffer_description}
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="offer_start_date" className="font-medium">
                Offer Start Date
              </label>
              <input
                defaultValue={openUpdateOfferModalValue?.offer_start_date}
                {...register("offer_start_date")}
                id="offer_start_date"
                type="date"
                className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
              />
            </div>
            <div>
              <label htmlFor="offer_end_date" className="font-medium">
                Offer End Date
              </label>
              <input
                defaultValue={openUpdateOfferModalValue?.offer_end_date}
                {...register("offer_end_date")}
                id="offer_end_date"
                type="date"
                className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium" htmlFor="offer_status">
                {" "}
                Offer Status{" "}
              </label>
              <select
                {...register("offer_status")}
                id="offer_status"
                className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
              >
                <option
                  className="capitalize"
                  disabled
                  selected
                  value={
                    isOffer_status
                      ? isOffer_status
                      : openUpdateOfferModalValue?.offer_status
                  }
                >
                  {isOffer_status
                    ? isOffer_status
                    : openUpdateOfferModalValue?.offer_status}
                </option>
                <option value="active">Active</option>
                <option value="in-active">In-Active</option>
              </select>
            </div>
            <div>
              <label htmlFor="offer_outlet" className="font-medium">
                Offer Outlet
              </label>
              <input
                defaultValue={openUpdateOfferModalValue?.offer_outlet}
                {...register("offer_outlet")}
                id="offer_outlet"
                type="text"
                className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
              />
            </div>
          </div>
          <div>
            <EditOfferProduct
              setAddProduct={setAddProduct}
              addProduct={addProduct}
            />
          </div>
          <div className="flex items-center justify-end mt-4">
            {loading ? (
              <button
                type="button"
                disabled
                className="px-6 py-2 text-white transition-colors duration-300 transform bg-primaryColor rounded-xl hover:bg-primaryColor"
              >
                <MiniSpinner />
              </button>
            ) : (
              <button
                type="Submit"
                className="px-6 py-2 text-white transition-colors duration-300 transform bg-primaryColor rounded-xl hover:bg-primaryColor"
              >
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOffer;
