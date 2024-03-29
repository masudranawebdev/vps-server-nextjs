
"use client";
/* eslint-disable react/prop-types */
import { RxCross1 } from "react-icons/rx";

const ViewDescription = ({
    setOpenReviewDescriptionModal,
    openReviewDescriptionModalValue,
}) => {

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-full lg:w-10/12 p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between">
            <h3
              className="text-[26px] font-bold text-[#0A0A0A] capitalize"
              id="modal-title"
            >
              {" "}
              Review Description{" "}
            </h3>
            <button className="btn bg-white border p-1 hover:bg-primaryColor hover:text-white">
              <RxCross1
                onClick={() => setOpenReviewDescriptionModal(false)}
                size={25}
              ></RxCross1>
            </button>
          </div>

          <p className="text-gray-500 text-center mt-8 text-xl">
            {openReviewDescriptionModalValue?.review_description}
          </p>

          <div className="flex justify-end mt-6 gap-4">
            <button
              type="button"
              onClick={() => setOpenReviewDescriptionModal(false)}
              className="btn px-6 py-2.5 transition-colors duration-300 transform bg-white rounded-xl border hover:bg-primaryColor hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
};

export default ViewDescription;
