import MiniSpinner from "@/components/common/loader/MiniSpinner";
import { useUpdateSpecificationMutation } from "@/redux/feature/specification/specificationApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import slugify from "slugify";

const UpdateSpecification = ({
  refetch,
  setOpenUpdateSpecificationModal,
  openUpdateSpecificationModalValue,
}) => {
  const [loading, setLoading] = useState(false);

  const { register, reset, handleSubmit } = useForm();

  const [updateSpecification] = useUpdateSpecificationMutation(); //Update Specification

  // post a Specification
  const handleDataPost = (data) => {
    setLoading(true);
    const sendData = {
      _id: openUpdateSpecificationModalValue?._id,
      specification_name: data?.specification_name
        ? data?.specification_name
        : openUpdateSpecificationModalValue?.specification_name,
      specification_serial: data?.specification_serial
        ? data?.specification_serial
        : openUpdateSpecificationModalValue?.specification_serial,
      specification_slug: slugify(
        data?.specification_name
          ? data?.specification_name
          : openUpdateSpecificationModalValue?.specification_name,
        {
          lower: true,
          replacement: "-",
        }
      ),
    };
    updateSpecification(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Specification update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
        reset();
        setOpenUpdateSpecificationModal(false);
        setLoading(false);
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
            Update Specification{" "}
          </h3>
          <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
            <RxCross1
              onClick={() => {
                reset();
                refetch();
                setOpenUpdateSpecificationModal(false);
              }}
              size={25}
            ></RxCross1>
          </button>
        </div>

        {/* Update A Specification Type */}

        <form onSubmit={handleSubmit(handleDataPost)} className="mt-3">
          <div>
            <label htmlFor="specification_name" className="font-medium">
              Specification Name
            </label>
            <input
              defaultValue={
                openUpdateSpecificationModalValue?.specification_name
              }
              {...register("specification_name")}
              id="specification_name"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="specification_serial" className="font-medium">
              Specification Serial
            </label>
            <input
              defaultValue={
                openUpdateSpecificationModalValue?.specification_serial
              }
              {...register("specification_serial")}
              id="specification_serial"
              type="text"
              className="block w-full px-2 py-2 text-gray-700 bg-white border border-gray-200 rounded-xl mt-2"
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

export default UpdateSpecification;
