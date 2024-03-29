"use client"

import ImageUploader from "@/utils/ImageUpload";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ImageValidate } from "@/utils/ImageValidate";
import { useAddSiteSettingMutation } from "@/redux/feature/setting/settingApi";
import { useState } from "react";
import MiniSpinner from "@/components/common/loader/MiniSpinner";

const LogoContact = ({
    refetch,
    initialData
}) => {
    const [loading, setLoading] = useState(false);
    const { register, reset, handleSubmit } = useForm(); //get data in form

    const [postSiteSettng] = useAddSiteSettingMutation();

    const handleDataPost = async (data) => {
        setLoading(true)
        toast.error("Please wait a moment");
        let logo;
        let favicon;
        let footer_logo;
        if (data?.logo?.[0]) {
            let errorEncountered = false;
            const result = ImageValidate(data?.logo?.[0], "logo"); //check image type
            if (result == true) {
                const logoUpload = await ImageUploader(data?.logo?.[0]);
                logo = logoUpload[0];
            } else {
                toast.error(`Must be a png/jpg/webp/jpeg in icon`, {
                    autoClose: 1000,
                });
                errorEncountered = true;
            }
            if (errorEncountered == true) {
                setLoading(false)
                return;
            }
        }
        if (data?.footer_logo?.[0]) {
            let errorEncountered = false;
            const result = ImageValidate(data?.footer_logo?.[0], "footer_logo"); //check image type
            if (result == true) {
                const footer_logoUpload = await ImageUploader(data?.footer_logo?.[0]);
                footer_logo = footer_logoUpload[0];
            } else {
                toast.error(`Must be a png/jpg/webp/jpeg in icon`, {
                    autoClose: 1000,
                });
                errorEncountered = true;
            }
            if (errorEncountered == true) {
                setLoading(false)
                return;
            }
        }
        if (data?.favicon?.[0]) {
            let errorEncountered = false;
            const result = ImageValidate(data?.favicon?.[0], "favicon"); //check image type
            if (result == true) {
                const faviconUpload = await ImageUploader(data?.favicon?.[0]);
                favicon = faviconUpload[0];
            } else {
                toast.error(`Must be a png/jpg/webp/jpeg in favicon`, {
                    autoClose: 1000,
                });
                errorEncountered = true;
            }
            if (errorEncountered == true) {
                setLoading(false)
                return;
            }
        }
        const sendData = {
            logo: logo || initialData?.logo,
            footer_logo: footer_logo || initialData?.footer_logo,
            favicon: favicon || initialData?.favicon,
            title: data?.title || initialData?.title,
            contact: data?.contact || initialData?.contact,
            email: data?.email || initialData?.email,
            address: data?.address || initialData?.address,
            start_close: data?.start_close || initialData?.start_close,
            delivery_inside_dhaka: data?.delivery_inside_dhaka || initialData?.delivery_inside_dhaka,
            delivery_outside_dhaka: data?.delivery_outside_dhaka || initialData?.delivery_outside_dhaka,
            facebook: data?.facebook || initialData?.facebook,
            instagram: data?.instagram || initialData?.instagram,
            twitter: data?.twitter || initialData?.twitter,
            you_tube: data?.you_tube || initialData?.you_tube,
            linkedin: data?.linkedin || initialData?.linkedin,
            watsapp: data?.watsapp || initialData?.linkedin,
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
                setLoading(false);
                reset();
                refetch();
            } else {
                setLoading(false);
                toast.error(result?.error?.data?.message);
            }
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleDataPost)}>
                <div className="grid gap-6 md:grid-cols-3 grid-cols-2">
                    <div>
                        <label className="font-semibold" htmlFor="logo">
                            Logo<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            {...register("logo")}
                            id="logo"
                            type="file"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="footer_logo">
                            Footer Logo<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            {...register("footer_logo")}
                            id="footer_logo"
                            type="file"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="favicon">
                            Favicon<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            {...register("favicon")}
                            id="favicon"
                            type="file"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="title">
                            Title<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            defaultValue={initialData?.title}
                            {...register("title")}
                            id="title"
                            type="text"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="contact">
                            Contact No<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            defaultValue={initialData?.contact}
                            {...register("contact")}
                            id="contact"
                            type="number"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="email">
                            Email<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            defaultValue={initialData?.email}
                            {...register("email")}
                            id="email"
                            type="text"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="address">
                            Address<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            defaultValue={initialData?.address}
                            {...register("address")}
                            id="address"
                            type="text"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="facebook">
                            Facebook<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            defaultValue={initialData?.facebook}
                            {...register("facebook")}
                            id="facebook"
                            type="text"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="instagram">
                            Instagram<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            defaultValue={initialData?.instagram}
                            {...register("instagram")}
                            id="instagram"
                            type="text"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="twitter">
                            Twitter<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            defaultValue={initialData?.twitter}
                            {...register("twitter")}
                            id="twitter"
                            type="text"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="you_tube">
                            You-Tube<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            defaultValue={initialData?.you_tube}
                            {...register("you_tube")}
                            id="you_tube"
                            type="text"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="linkedin">
                            Linkedin<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            defaultValue={initialData?.linkedin}
                            {...register("linkedin")}
                            id="linkedin"
                            type="text"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="watsapp">
                            Watsapp<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            defaultValue={initialData?.watsapp}
                            {...register("watsapp")}
                            id="watsapp"
                            type="text"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="delivery_inside_dhaka">
                            Delivery Inside Dhaka<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            defaultValue={initialData?.delivery_inside_dhaka}
                            {...register("delivery_inside_dhaka")}
                            id="delivery_inside_dhaka"
                            type="number"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="delivery_outside_dhaka">
                            Delivery Outside Dhaka<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            defaultValue={initialData?.delivery_outside_dhaka}
                            {...register("delivery_outside_dhaka")}
                            id="delivery_outside_dhaka"
                            type="number"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="start_close">
                            Start And Close Date<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            defaultValue={initialData?.start_close}
                            {...register("start_close")}
                            id="start_close"
                            type="text"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                </div>
                <div className="mt-2 flex items-center justify-end">
                    {loading ? (
                        <button
                            type="button"
                            disabled
                            className="px-6 py-2 text-white transition-colors duration-300 transform bg-red-500 rounded-xl hover:bg-red-400"
                        >
                            <MiniSpinner />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </form>
        </>
    );
};

export default LogoContact;