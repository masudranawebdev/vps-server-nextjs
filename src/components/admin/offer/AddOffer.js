"use client";

import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { toast } from "react-toastify";
import { useAddOfferMutation } from "@/redux/feature/offer/offerApi";
import AddOfferProduct from "./AddOfferProduct";
// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { ImageValidate } from "@/utils/ImageValidate";
import Image from "next/image";

const AddOffer = ({ refetch, setOpenAddOfferModal }) => {
  // store selected product
  const [addProduct, setAddProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOfferImage, setIsOfferImage] = useState(null);
  const [offer_description, setOffer_description] = useState();
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

  const [postOffer] = useAddOfferMutation(); //post campaign

  const handleDataPost = (data) => {
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

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "offer_image") {
        formData.append(key, value);
      }
    });
    formData.append("offer_description", offer_description);
    addProduct.forEach((item, index) => {
      formData.append(`offer_products[${index}][offer_product_id]`, item?._id);
    });
    postOffer(formData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Offer Added successfully !",
          {
            autoClose: 1000,
          }
        );
        reset();
        refetch();
        setLoading(false);
        setOpenAddOfferModal(false);
      } else {
        setLoading(false);
        toast.error(result?.error?.data?.message, {
          autoClose: 1000,
        });
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
            Add Offer{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                setOpenAddOfferModal(false);
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
              placeholder="Offer Title"
              {...register("offer_title", {
                required: "Offer Title is required",
              })}
              id="offer_title"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.offer_title && (
              <p className="text-red-600">{errors.offer_title?.message}</p>
            )}
          </div>
          <div className="mt-4">
            {isOfferImage && (
              <div className="flex items-center justify-center">
                <Image src={isOfferImage} alt="" height={200} width={200} />
              </div>
            )}
            <label htmlFor="offer_image" className="font-medium">
              Offer Image
            </label>
            <input
              onInput={(e) => handleOfferImageChange(e)}
              {...register("offer_image", {
                required: "Offer Image is required",
              })}
              id="offer_image"
              type="file"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.offer_image && (
              <p className="text-red-600">{errors.offer_image?.message}</p>
            )}
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
                placeholder="Offer Start Date"
                {...register("offer_start_date", {
                  required: "Offer start date is required",
                })}
                id="offer_start_date"
                type="date"
                className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
              />
              {errors.offer_start_date && (
                <p className="text-red-600">
                  {errors.offer_start_date?.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="offer_end_date" className="font-medium">
                Offer End Date
              </label>
              <input
                placeholder="Offer End Date"
                {...register("offer_end_date", {
                  required: "Offer end date is required",
                })}
                id="offer_end_date"
                type="date"
                className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
              />
              {errors.offer_end_date && (
                <p className="text-red-600">{errors.offer_end_date?.message}</p>
              )}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium" htmlFor="offer_status ">
                {" "}
                Offer Status{" "}
              </label>
              <select
                {...register("offer_status ", {
                  required: "Offer Status is required",
                  validate: (value) => value !== "--None--",
                })}
                id="offer_status "
                className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
              >
                <option disabled selected>
                  {" "}
                  --None--{" "}
                </option>
                <option value="active">Active</option>
                <option value="in-active">In-Active</option>
              </select>
              {errors.offer_status && (
                <p className="text-red-600">{errors.offer_status?.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="offer_outlet" className="font-medium">
                Offer Outlet
              </label>
              <input
                placeholder="Offer Outlet"
                {...register("offer_outlet")}
                id="offer_outlet"
                type="text"
                className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
              />
            </div>
          </div>
          <div>
            <AddOfferProduct
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
                Create
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOffer;
