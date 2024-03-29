"use client";
import { useAddSiteSettingMutation } from "@/redux/feature/setting/settingApi";
import dynamic from "next/dynamic";
import { useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const AboutSite = ({ initialData, refetch }) => {
  const [all_branch, setAll_branch] = useState(initialData?.all_branch);
  const [about_us, setAboutUs] = useState(initialData?.about_us);
  const [contact_us, setContact_us] = useState(initialData?.contact_us);
  const [return_policy, setReturn_policy] = useState(
    initialData?.return_policy
  );
  const [refund_policy, setRefund_policy] = useState(
    initialData?.refund_policy
  );
  const [cancellation_policy, setCancellationPolicy] = useState(
    initialData?.cancellation_policy
  );
  const [privacy_policy, setPrivacyPolicy] = useState(
    initialData?.privacy_policy
  );
  const [terms_condition, setTermAndCondition] = useState(
    initialData?.terms_condition
  );
  const [shipping_info, setShipping_info] = useState(
    initialData?.shipping_info
  );
  const [material_care_info, setMaterial_care] = useState(
    initialData?.material_care_info
  );

  const [postSiteSettng] = useAddSiteSettingMutation();

  // all branch post
  const handleDataPost10 = async () => {
    toast.error("Please wait a moment");
    const sendData = {
      all_branch: all_branch,
      _id: initialData?._id,
    };
    postSiteSettng(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Site update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  // about us post
  const handleDataPost = async () => {
    toast.error("Please wait a moment");
    const sendData = {
      about_us: about_us,
      _id: initialData?._id,
    };
    postSiteSettng(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Site update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  // contact us post
  const handleDataPost2 = async () => {
    toast.error("Please wait a moment");
    const sendData = {
      contact_us: contact_us,
      _id: initialData?._id,
    };
    postSiteSettng(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Site update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  // return and exchange post
  const handleDataPost3 = async () => {
    toast.error("Please wait a moment");
    const sendData = {
      return_policy: return_policy,
      _id: initialData?._id,
    };
    postSiteSettng(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Site update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };
  // refund_policy post
  const handleDataPost4 = async () => {
    toast.error("Please wait a moment");
    const sendData = {
      refund_policy: refund_policy,
      _id: initialData?._id,
    };
    postSiteSettng(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Site update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  // cancellation_policy post
  const handleDataPost5 = async () => {
    toast.error("Please wait a moment");
    const sendData = {
      cancellation_policy: cancellation_policy,
      _id: initialData?._id,
    };
    postSiteSettng(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Site update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  // privacyPolicy post
  const handleDataPost6 = async () => {
    toast.error("Please wait a moment");
    const sendData = {
      privacy_policy: privacy_policy,
      _id: initialData?._id,
    };
    postSiteSettng(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Site update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  // terms_condition post
  const handleDataPost7 = async () => {
    toast.error("Please wait a moment");
    const sendData = {
      terms_condition: terms_condition,
      _id: initialData?._id,
    };
    postSiteSettng(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Site update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  // Shipping info post
  const handleDataPost8 = async () => {
    toast.error("Please wait a moment");
    const sendData = {
      shipping_info: shipping_info,
      _id: initialData?._id,
    };
    postSiteSettng(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Site update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  // material_care_info post
  const handleDataPost9 = async () => {
    toast.error("Please wait a moment");
    const sendData = {
      material_care_info: material_care_info,
      _id: initialData?._id,
    };
    postSiteSettng(sendData).then((result) => {
      if (result?.data?.statusCode == 200 && result?.data?.success == true) {
        toast.success(
          result?.data?.message
            ? result?.data?.message
            : "Site update successfully !",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.error?.data?.message);
      }
    });
  };

  return (
    <>
      {/* All Branch */}
      <h4 className="font-semibold text-[20px] mt-2">All Branch</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill theme="snow" value={all_branch} onChange={setAll_branch} />
      <div className="mt-2 flex items-center justify-end">
        <button
          type="submit"
          onClick={() => handleDataPost10()}
          className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
        >
          Submit
        </button>
      </div>

      {/* About us */}
      <h4 className="font-semibold text-[20px] mt-2">About Us</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill theme="snow" value={about_us} onChange={setAboutUs} />
      <div className="mt-2 flex items-center justify-end">
        <button
          type="submit"
          onClick={() => handleDataPost()}
          className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
        >
          Submit
        </button>
      </div>

      {/* Contact Us */}
      <h4 className="font-semibold text-[20px] mt-2">Contact Us</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill theme="snow" value={contact_us} onChange={setContact_us} />
      <div className="mt-2 flex items-center justify-end">
        <button
          onClick={() => handleDataPost2()}
          type="submit"
          className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
        >
          Submit
        </button>
      </div>

      {/* Return and exchange */}
      <h4 className="font-semibold text-[20px] mt-2">Return Policy</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={return_policy}
        onChange={setReturn_policy}
      />
      <div className="mt-2 flex items-center justify-end">
        <button
          onClick={() => handleDataPost3()}
          type="submit"
          className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
        >
          Submit
        </button>
      </div>

      <h4 className="font-semibold text-[20px] mt-2">Refund Policy</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={refund_policy}
        onChange={setRefund_policy}
      />
      <div className="mt-2 flex items-center justify-end">
        <button
          onClick={() => handleDataPost4()}
          type="submit"
          className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
        >
          Submit
        </button>
      </div>

      <h4 className="font-semibold text-[20px] mt-2">Cancellation Policy</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={cancellation_policy}
        onChange={setCancellationPolicy}
      />
      <div className="mt-2 flex items-center justify-end">
        <button
          onClick={() => handleDataPost5()}
          type="submit"
          className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
        >
          Submit
        </button>
      </div>

      {/* privacyPolicy Info */}
      <h4 className="font-semibold text-[20px] mt-2">Privacy And Policy</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={privacy_policy}
        onChange={setPrivacyPolicy}
      />
      <div className="mt-2 flex items-center justify-end">
        <button
          onClick={() => handleDataPost6()}
          type="submit"
          className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
        >
          Submit
        </button>
      </div>

      {/* terms_condition Info */}
      <h4 className="font-semibold text-[20px] mt-2">Terms And Condition</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={terms_condition}
        onChange={setTermAndCondition}
      />
      <div className="mt-2 flex items-center justify-end">
        <button
          onClick={() => handleDataPost7()}
          type="submit"
          className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
        >
          Submit
        </button>
      </div>

      {/* Shipping Info */}
      <h4 className="font-semibold text-[20px] mt-2">Shipping Info</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={shipping_info}
        onChange={setShipping_info}
      />
      <div className="mt-2 flex items-center justify-end">
        <button
          onClick={() => handleDataPost8()}
          type="submit"
          className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
        >
          Submit
        </button>
      </div>

      {/* material_care Info */}
      <h4 className="font-semibold text-[20px] mt-2">Material & Care Info</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={material_care_info}
        onChange={setMaterial_care}
      />
      <div className="mt-2 flex items-center justify-end">
        <button
          onClick={() => handleDataPost9()}
          type="submit"
          className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default AboutSite;
