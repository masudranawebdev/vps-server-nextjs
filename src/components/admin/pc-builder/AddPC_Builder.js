"use client";
/* eslint-disable react/prop-types */
import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useAddPc_BuilderMutation } from "@/redux/feature/pc_builder/pc_builderApi";
import { ImageValidate } from "@/utils/ImageValidate";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import slugify from "slugify";
import Select from "react-select";
import AddPc_BuilderProduct from "./AddPc_BuilderProduct";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";
import Image from "next/image";

const AddPC_Builder = ({ refetch, setOpenAddPC_BuilderModal }) => {
  const [loading, setLoading] = useState(false);
  const [isPC_BuilderLogo, setIsPC_BuilderLogo] = useState(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [category_name, setCategory_name] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [addProduct, setAddProduct] = useState([]);

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const { data: categories = [] } = useQuery({
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

  const [postPC_Builder] = useAddPc_BuilderMutation(); //post PC Builder

  // post a PC Builder
  const handleDataPost = (data) => {
    setLoading(true);
    const formData = new FormData();
    let errorEncountered = false;

    if (data?.pc_builder_logo[0]) {
      const pc_builder_logo = data?.pc_builder_logo[0];
      const result = ImageValidate(pc_builder_logo, "pc_builder_logo"); //check image type
      if (result == true) {
        formData.append("pc_builder_logo", pc_builder_logo);
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
      if (key !== "pc_builder_logo") {
        formData.append(key, value);
      }
    });
    const setSlug = category_name + " " + data.pc_builder_name;
    const slug = slugify(setSlug, {
      lower: true,
      replacement: "-",
    });
    formData.append("pc_builder_slug", slug);
    formData.append("category_id", category_id);
    if (addProduct?.length > 0) {
      addProduct.forEach((item, index) => {
        formData.append(
          `pc_builder_products[${index}][pc_builder_product_id]`,
          item?._id
        );
      });
    }
    postPC_Builder(formData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "PC Builder Added successfully !",
          {
            autoClose: 1000,
          }
        );
        reset();
        setIsPC_BuilderLogo(null);
        refetch();
        setOpenAddPC_BuilderModal(false);
        setLoading(false);
      } else {
        setLoading(false);
        setIsPC_BuilderLogo(null);
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
            Add PC Builder{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                setOpenAddPC_BuilderModal(false);
                setIsPC_BuilderLogo(null);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>

        {/* Add A PC Builder */}

        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="pc_builder_name" className="font-medium">
                PC Builder Name
              </label>
              <input
                placeholder="PC Builder Name"
                {...register("pc_builder_name", {
                  required: "PC Builder Name is required",
                })}
                id="pc_builder_name"
                type="text"
                className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
              />
              {errors.pc_builder_name && (
                <p className="text-red-600">
                  {errors.pc_builder_name?.message}
                </p>
              )}
            </div>

            <div className="mt-2">
              <p className="font-medium"> Category Name </p>
              <Select
                id="category_id"
                name="category_id"
                isClearable
                required
                aria-label="Select a Category"
                options={categories?.data}
                getOptionLabel={(x) => x?.category_name}
                getOptionValue={(x) => x?._id}
                onChange={(selectedOption) => {
                  setCategory_id(selectedOption?._id);
                  setCategory_name(selectedOption?.category_name);
                }}
              ></Select>
            </div>

            <div className="mt-4">
              <label className="font-medium" htmlFor="pc_builder_status">
                {" "}
                PC Builder Status{" "}
              </label>
              <select
                {...register("pc_builder_status", {
                  required: "PC Builder Status is required",
                  validate: (value) => value !== "--None--",
                })}
                id="pc_builder_status"
                className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
              >
                <option disabled selected>
                  {" "}
                  --None--{" "}
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
                placeholder="PC Builder Serial"
                {...register(
                  "pc_builder_serial",
                  { min: 1 },
                  {
                    required: "PC Builder Serial is required",
                  }
                )}
                id="pc_builder_serial"
                type="number"
                className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
              />
              {errors.pc_builder_serial && (
                <p className="text-red-600">
                  {errors.pc_builder_serial?.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4">
            {isPC_BuilderLogo && (
              <div className="flex items-center justify-center">
                <Image src={isPC_BuilderLogo} alt="" height={200} width={200} />
              </div>
            )}
            <label htmlFor="pc_builder_logo" className="font-medium">
              PC Builder Logo
            </label>
            <input
              onInput={(e) => handlePC_BuilderLogoChange(e)}
              {...register("pc_builder_logo", {
                required: "PC Builder Logo is required",
              })}
              id="pc_builder_logo"
              type="file"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
            {errors.pc_builder_logo && (
              <p className="text-red-600">{errors.pc_builder_logo?.message}</p>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input
              {...register("pc_builder_required")}
              id="pc_builder_required"
              type="checkbox"
              className="w-5 h-5"
            />
            <label
              htmlFor="pc_builder_required"
              className="font-medium text-xl"
            >
              Is Required ?
            </label>
          </div>

          {category_id && (
            <div>
              <AddPc_BuilderProduct
                category_id={category_id}
                addProduct={addProduct}
                setAddProduct={setAddProduct}
              />
            </div>
          )}

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
                type="submit"
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

export default AddPC_Builder;
