"use client";
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useUpdatePc_BuilderMutation } from "@/redux/feature/pc_builder/pc_builderApi";
import { ImageValidate } from "@/utils/ImageValidate";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import slugify from "slugify";
import UpdatePC_BuilderProducts from "./UpdatePC_BuilderProducts";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";
import Image from "next/image";

const UpdatePC_Builder = ({
  refetch,
  setOpenUpdatePC_BuilderModal,
  openUpdatePC_BuilderModalValue,
  setOpenUpdatePC_BuilderModalValue,
}) => {
  const [oldProduct, setOldProduct] = useState([]);
  const [addProduct, setAddProduct] = useState([]);
  const [deleteProduct, setDeleteProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPC_BuilderLogo, setIsPC_BuilderLogo] = useState(null);
  const [isPC_Builder_status, setIsPC_Builder_status] = useState(
    openUpdatePC_BuilderModalValue?.pc_builder_status
  );

  const handleChange = () => {
    setOpenUpdatePC_BuilderModalValue((prevState) => ({
      ...prevState,
      pc_builder_required: !prevState.pc_builder_required,
    }));
  };

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const { data: productDetails = [], isLoading } = useQuery({
    queryKey: [
      `/api/v1/pc_builder/dashboard/see_details?pc_builder_id=${openUpdatePC_BuilderModalValue?._id}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/pc_builder/dashboard/see_details?pc_builder_id=${openUpdatePC_BuilderModalValue?._id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setAddProduct(data?.data);
      setOldProduct(data?.data);
      return data;
    },
  }); // pc builder product details

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePC_BuilderLogoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setIsPC_BuilderLogo(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [updatePC_Builder] = useUpdatePc_BuilderMutation(); //Update PC Builder

  // Update Pc Builder
  const handleDataPost = (data) => {
    const filteredProducts = deleteProduct.filter(
      (product) => product.product_pc_builder === true
    );
    const productsToRemove = filteredProducts.filter(
      (product) =>
        !addProduct.some(
          (existingProduct) => existingProduct?._id === product?._id
        )
    );
    const productsToAdd = addProduct.filter(
      (product) =>
        !oldProduct.some(
          (existingProduct) => existingProduct?._id === product?._id
        )
    );
    if (data?.pc_builder_logo[0]) {
      setLoading(true);
      const formData = new FormData();
      let errorEncountered = false;

      const pc_builder_logo = data?.pc_builder_logo[0];
      const result = ImageValidate(pc_builder_logo, "pc_builder_logo"); //check image type
      if (result == true) {
        formData.append("pc_builder_logo", pc_builder_logo);
      } else {
        toast.error(`Must be a png/jpg/webp/jpeg image In Image`);
        errorEncountered = true;
      }

      if (errorEncountered == true) {
        setLoading(false);
        return;
      }
      formData.append(
        "pc_builder_name",
        data?.pc_builder_name
          ? data?.pc_builder_name
          : openUpdatePC_BuilderModalValue?.pc_builder_name
      );
      formData.append(
        "pc_builder_status",
        data?.pc_builder_status
          ? data?.pc_builder_status
          : openUpdatePC_BuilderModalValue?.pc_builder_status
      );
      formData.append(
        "pc_builder_serial",
        data?.pc_builder_serial
          ? data?.pc_builder_serial
          : openUpdatePC_BuilderModalValue?.pc_builder_serial
      );
      formData.append(
        "pc_builder_required",
        data?.pc_builder_required
          ? data?.pc_builder_required
          : openUpdatePC_BuilderModalValue?.pc_builder_required
      );
      formData.append(
        "category_id",
        openUpdatePC_BuilderModalValue?.category_id?._id
      );
      formData.append("public_id", openUpdatePC_BuilderModalValue?.public_id);
      productsToAdd?.forEach((item, index) => {
        formData.append(
          `pc_builder_productsAdd[${index}][pc_builder_product_id]`,
          item?._id
        );
      });
      productsToRemove?.forEach((item, index) => {
        formData.append(
          `pc_builder_productsRemove[${index}][pc_builder_product_id]`,
          item?._id
        );
      });
      const setSlug = data?.pc_builder_name
        ? openUpdatePC_BuilderModalValue?.category_id?.category_name +
          " " +
          data?.pc_builder_name
        : openUpdatePC_BuilderModalValue?.category_id?.category_name +
          " " +
          openUpdatePC_BuilderModalValue?.pc_builder_name;
      const pc_builder_slug = slugify(setSlug, {
        lower: true,
        replacement: "-",
      });
      formData.append("pc_builder_slug", pc_builder_slug);
      formData.append("_id", openUpdatePC_BuilderModalValue?._id);
      updatePC_Builder(formData).then((result) => {
        if (result?.data?.statusCode == 200 && result?.data?.success == true) {
          toast.success(
            result?.data?.message
              ? result?.data?.message
              : "PC Builder update successfully !",
            {
              autoClose: 1000,
            }
          );
          refetch();
          reset();
          setLoading(false);
          setOpenUpdatePC_BuilderModal(false);
        } else {
          setLoading(false);
          toast.error(result?.error?.data?.message);
        }
      });
    } else {
      setLoading(true);
      const setSlug = data?.pc_builder_name
        ? openUpdatePC_BuilderModalValue?.category_id?.category_name +
          " " +
          data?.pc_builder_name
        : openUpdatePC_BuilderModalValue?.category_id?.category_name +
          " " +
          openUpdatePC_BuilderModalValue?.pc_builder_name;
      const sendData = {
        _id: openUpdatePC_BuilderModalValue?._id,
        pc_builder_name: data?.pc_builder_name
          ? data?.pc_builder_name
          : openUpdatePC_BuilderModalValue?.pc_builder_name,
        pc_builder_serial: data?.pc_builder_serial
          ? data?.pc_builder_serial
          : openUpdatePC_BuilderModalValue?.pc_builder_serial,
        pc_builder_logo: openUpdatePC_BuilderModalValue?.pc_builder_logo,
        public_id: openUpdatePC_BuilderModalValue?.public_id,
        pc_builder_status: data?.pc_builder_status
          ? data?.pc_builder_status
          : openUpdatePC_BuilderModalValue?.pc_builder_status,
        pc_builder_required: data?.pc_builder_required
          ? data?.pc_builder_required
          : openUpdatePC_BuilderModalValue?.pc_builder_required,
        category_id: openUpdatePC_BuilderModalValue?.category_id,
        pc_builder_slug: slugify(setSlug, {
          lower: true,
          replacement: "-",
        }),

        pc_builder_productsAdd: productsToAdd?.map((item) => ({
          pc_builder_product_id: item?._id,
        })),
        pc_builder_productsRemove: productsToRemove?.map((item) => ({
          pc_builder_product_id: item?._id,
        })),
      };
      updatePC_Builder(sendData).then((result) => {
        if (result?.data?.statusCode == 200 && result?.data?.success == true) {
          toast.success(
            result?.data?.message
              ? result?.data?.message
              : "Pc Builder update successfully !",
            {
              autoClose: 1000,
            }
          );
          refetch();
          reset();
          setOpenUpdatePC_BuilderModal(false);
          setLoading(false);
        } else {
          toast.error(result?.error?.data?.message, {
            autoClose: 1000,
          });
          setLoading(false);
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
            Update PC Builder{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                reset();
                setIsPC_Builder_status(
                  openUpdatePC_BuilderModalValue?.pc_builder_status
                );
                refetch();
                setOpenUpdatePC_BuilderModal(false);
                setIsPC_BuilderLogo(null);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>

        {/* Update A PC Builder Type */}

        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div>
            <label htmlFor="pc_builder_name" className="font-medium">
              PC Builder Name
            </label>
            <input
              defaultValue={openUpdatePC_BuilderModalValue?.pc_builder_name}
              {...register("pc_builder_name")}
              id="pc_builder_name"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>

          <div className="mt-4">
            {isPC_BuilderLogo ? (
              <div className="flex items-center justify-center">
                <Image src={isPC_BuilderLogo} alt="" height={200} width={200} />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Image
                  src={openUpdatePC_BuilderModalValue?.pc_builder_logo}
                  alt=""
                  height={200}
                  width={200}
                />
              </div>
            )}
            <label htmlFor="pc_builder_logo" className="font-medium">
              PC Builder Logo
            </label>
            <input
              onInput={(e) => handlePC_BuilderLogoChange(e)}
              {...register("pc_builder_logo")}
              id="pc_builder_logo"
              type="file"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>

          <div className="mt-4">
            <label className="font-medium" htmlFor="pc_builder_status">
              {" "}
              PC Builder Status{" "}
            </label>
            <select
              {...register("pc_builder_status")}
              id="pc_builder_status"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            >
              <option
                selected
                value={
                  isPC_Builder_status
                    ? isPC_Builder_status
                    : openUpdatePC_BuilderModalValue?.pc_builder_status
                }
              >
                {isPC_Builder_status
                  ? isPC_Builder_status
                  : openUpdatePC_BuilderModalValue?.pc_builder_status}
              </option>
              <option value="active">Active</option>
              <option value="in-active">In-Active</option>
            </select>
            {errors.pc_builder_status && (
              <p className="text-red-600">
                {errors.pc_builder_status?.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="pc_builder_serial" className="font-medium">
              PC Builder Serial
            </label>
            <input
              defaultValue={openUpdatePC_BuilderModalValue?.pc_builder_serial}
              {...register("pc_builder_serial")}
              id="pc_builder_serial"
              type="number"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="category_id" className="font-medium">
              PC Builder Category Name
            </label>
            <input
              defaultValue={
                openUpdatePC_BuilderModalValue?.category_id?.category_name
              }
              disabled
              id="category_id"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input
              {...register("pc_builder_required")}
              id="pc_builder_required"
              type="checkbox"
              className="w-5 h-5"
              checked={openUpdatePC_BuilderModalValue?.pc_builder_required}
              onChange={handleChange} // Call handleChange when the checkbox is clicked
            />
            <label
              htmlFor="pc_builder_required"
              className="font-medium text-xl"
            >
              Is Required ?
            </label>
          </div>

          <div>
            <UpdatePC_BuilderProducts
              setAddProduct={setAddProduct}
              addProduct={addProduct}
              category_id={openUpdatePC_BuilderModalValue?.category_id?._id}
              setDeleteProduct={setDeleteProduct}
              deleteProduct={deleteProduct}
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

export default UpdatePC_Builder;
