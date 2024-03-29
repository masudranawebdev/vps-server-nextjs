"use client"

import ImageUploader from "@/utils/ImageUpload";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ImageValidate } from "@/utils/ImageValidate";
import { useAddSiteSettingMutation } from "@/redux/feature/setting/settingApi";
import { useState } from "react";
import MiniSpinner from "@/components/common/loader/MiniSpinner";

const CardInformation = ({
    refetch,
    initialData
}) => {
    const [loading, setLoading] = useState(false);
    const { register, reset, handleSubmit } = useForm(); //get data in form

    const [postSiteSettng] = useAddSiteSettingMutation();

    const handleDataPost = async (data) => {
        setLoading(true)
        toast.error("Please wait a moment");
        let card_one_logo;
        let card_two_logo;
        let card_three_logo;
        let card_four_logo;
        if (data?.card_one_logo?.[0]) {
            let errorEncountered = false;
            const result = ImageValidate(data?.card_one_logo?.[0], "card_one_logo"); //check image type
            if (result == true) {
                const card_one_logoUpload = await ImageUploader(data?.card_one_logo?.[0]);
                card_one_logo = card_one_logoUpload[0];
            } else {
                toast.error(`Must be a png/jpg/webp/jpeg in card one logo`, {
                    autoClose: 1000,
                });
                errorEncountered = true;
            }
            if (errorEncountered == true) {
                setLoading(false)
                return;
            }
        }
        if (data?.card_two_logo?.[0]) {
            let errorEncountered = false;
            const result = ImageValidate(data?.card_two_logo?.[0], "card_two_logo"); //check image type
            if (result == true) {
                const card_two_logoUpload = await ImageUploader(data?.card_two_logo?.[0]);
                card_two_logo = card_two_logoUpload[0];
            } else {
                toast.error(`Must be a png/jpg/webp/jpeg in card two logo`, {
                    autoClose: 1000,
                });
                errorEncountered = true;
            }
            if (errorEncountered == true) {
                setLoading(false)
                return;
            }
        }
        if (data?.card_three_logo?.[0]) {
            let errorEncountered = false;
            const result = ImageValidate(data?.card_three_logo?.[0], "card_three_logo"); //check image type
            if (result == true) {
                const card_three_logoUpload = await ImageUploader(data?.card_three_logo?.[0]);
                card_three_logo = card_three_logoUpload[0];
            } else {
                toast.error(`Must be a png/jpg/webp/jpeg in card three logo`, {
                    autoClose: 1000,
                });
                errorEncountered = true;
            }
            if (errorEncountered == true) {
                setLoading(false)
                return;
            }
        }
        if (data?.card_four_logo?.[0]) {
            let errorEncountered = false;
            const result = ImageValidate(data?.card_four_logo?.[0], "card_four_logo"); //check image type
            if (result == true) {
                const card_four_logoUpload = await ImageUploader(data?.card_four_logo?.[0]);
                card_four_logo = card_four_logoUpload[0];
            } else {
                toast.error(`Must be a png/jpg/webp/jpeg in card four logo`, {
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
            card_one_logo: card_one_logo || initialData?.card_one_logo,
            card_one_title: data?.card_one_title || initialData?.card_one_title,
            card_two_logo: card_two_logo || initialData?.card_two_logo,
            card_two_title: data?.card_two_title || initialData?.card_two_title,
            card_three_logo: card_three_logo || initialData?.card_three_logo,
            card_three_title: data?.card_three_title || initialData?.card_three_title,
            card_four_logo: card_four_logo || initialData?.card_four_logo,
            card_four_title: data?.card_four_title || initialData?.card_four_title,
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
                <div className="grid gap-6 grid-cols-2">
                    <div>
                        <label className="font-semibold" htmlFor="card_one_logo">
                            Card One Logo<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            {...register("card_one_logo")}
                            id="card_one_logo"
                            type="file"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="card_one_title">
                            Card One Title<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            defaultValue={initialData?.card_one_title}
                            {...register("card_one_title")}
                            id="card_one_title"
                            type="text"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="card_two_logo">
                            Card Two Logo<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            {...register("card_two_logo")}
                            id="card_two_logo"
                            type="file"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="card_two_title">
                            Card Two Title<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            defaultValue={initialData?.card_two_title}
                            {...register("card_two_title")}
                            id="card_two_title"
                            type="text"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="card_three_logo">
                            Card Three Logo<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            {...register("card_three_logo")}
                            id="card_three_logo"
                            type="file"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="card_three_title">
                            Card Three Title<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            defaultValue={initialData?.card_three_title}
                            {...register("card_three_title")}
                            id="card_three_title"
                            type="text"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="card_four_logo">
                            Card Four Logo<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            {...register("card_four_logo")}
                            id="card_four_logo"
                            type="file"
                            className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-xl"
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="card_four_title">
                            Card Four Title<span className="text-red-500"> if need</span>{" "}
                        </label>
                        <input
                            defaultValue={initialData?.card_four_title}
                            {...register("card_four_title")}
                            id="card_four_title"
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

export default CardInformation;