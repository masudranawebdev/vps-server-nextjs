
"use client";
import ImageUploader from "@/utils/ImageUpload";
import { ImageValidate } from "@/utils/ImageValidate";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const DuplicateStepFour = ({
  currentStep,
  setCurrentStep,
  complete,
  steps,
  setComplete,
  finalStepFourData,
  setFinalStepFourData
}) => {

  // image upload start
  const fileInputRefs = useRef([]);
  const multiInputRefs = useRef([]);
  const [imageName, setImageName] = useState(
    finalStepFourData ? finalStepFourData?.mainImage : ""
  );

  const [multiImage, setMultiImage] = useState(
    finalStepFourData
      ? finalStepFourData?.anotherImages
        ? finalStepFourData?.anotherImages
        : []
      : []
  );

  //   thubmnail image
  const handleOnChange = async (fieldName) => {
    if (fieldName[0]) {
      if (!imageName) {
        toast.error("Please wait a minute", {
          autoClose: 1000,
        });

        const image = fieldName[0];
        const result = ImageValidate(image); //check image type
        if (result == true) {
          const image = await ImageUploader(fieldName[0]);
          if (image[1] == "OK") {
            const updatedImage = image[0];
            setImageName(updatedImage);
            toast.success("Now Add Another Picture", {
              autoClose: 1000,
            });
          } else toast.error("Something Wrong");
        } else {
          toast.error(`Must be a png/jpg/webp/jpeg image In Image`, {
            autoClose: 1000,
          });
        }
      } else {
        toast.error("Delete the previous image first", {
          autoClose: 1000,
        });
      }
    } else {
      toast.error("Please select a image", {
        autoClose: 1000,
      });
    }
  };

  //  handle multiImage
  const handleMuilOnChange = async (fieldName) => {
    if (fieldName[0]) {
      if (multiImage?.length >= 11) {
        toast.error("only 10 images are allowed", {
          autoClose: 1000,
        });
      } else {
        toast.error("Please wait a moment", {
          autoClose: 1000,
        });
        if (multiImage?.length == 0) {
          const image = fieldName[0];
          const result = ImageValidate(image); //check image type
          if (result == true) {
            const image = await ImageUploader(fieldName[0]);
            if (image[1] == "OK") {
              const updatedImage = [...multiImage, { image: image[0] }];
              setMultiImage(updatedImage);
              toast.success("Now Add Another Picture", {
                autoClose: 1000,
              });
            } else
              toast.error("Something Wrong", {
                autoClose: 1000,
              });
          } else {
            toast.error(`Must be a png/jpg/webp/jpeg image In Image`, {
              autoClose: 1000,
            });
          }
        } else {
          const image = fieldName[0];
          const result = ImageValidate(image); //check image type
          if (result == true) {
            const image = await ImageUploader(fieldName[0]);
            if (image[1] == "OK") {
              const updatedImage = [...multiImage, { image: image[0] }];
              setMultiImage(updatedImage);
              toast.success("Now Add Another Picture", {
                autoClose: 1000,
              });
            } else
              toast.error("Something Wrong", {
                autoClose: 1000,
              });
          } else {
            toast.error(`Must be a png/jpg/webp/jpeg image In Image`, {
              autoClose: 1000,
            });
          }
        }
      }
    } else {
      toast.error("Please select a image", {
        autoClose: 1000,
      });
    }
  };

  //   delete main image
  const handleDeleteImg = () => {
    fileInputRefs.current.forEach((inputRef) => {
      inputRef.value = "";
    });
    setImageName("");
  };

  //   delete multi image
  const handleMuilDelete = (item) => {
    const mulImage = multiImage?.filter((image) => image?.image !== item);
    setMultiImage(mulImage);
  };

  // steper manage
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setComplete(false);
    }
  };

  // submit data
  const handleNext = () => {
    if (!imageName) {
      toast.error("Please add main image");
      return;
    }
    const sendData = {
      mainImage: imageName,
      anotherImages: multiImage?.map((item) => ({
        image: item?.image,
      })),
    };
    setFinalStepFourData(sendData);
    if (currentStep === steps.length) {
      setComplete(true);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="block md:flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold">Upload main image</p>
          {/*   */}
          <div className="border border-gray-300 p-3 rounded-sm">
            {imageName ? (
              <div className="h-[70px] w-[100px] rounded-md relative">
                <img
                  src={imageName}
                  alt="image"
                  height={0}
                  width={0}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "5px",
                  }}
                />
                <button
                  className="absolute top-0 left-0 bg-gray-100 w-7 h-7 rounded-full text-sm hover:text-red-500 mb-3"
                  type="button"
                  onClick={handleDeleteImg}
                >
                  X
                </button>
              </div>
            ) : (
              ""
            )}
            <input
              type="file"
              onChange={(e) => handleOnChange(e.target.files)}
              className="file-input w-full max-w-xs mt-3"
              ref={(ref) => (fileInputRefs.current[0] = ref)}
            />
          </div>
        </div>
        <div>
          <p className="font-semibold mt-4 md:mt-0">Add other photos</p>
          <div className="border border-gray-300 rounded-sm p-3">
            <div className="">
              {multiImage?.length >= 0 ? (
                <div className="rounded-md flex items-center justify-start gap-3">
                  {multiImage?.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image?.image}
                        alt="image"
                        height={0}
                        width={0}
                        sizes="100vw"
                        style={{
                          width: "100px",
                          height: "70px",
                          borderRadius: "5px",
                        }}
                      />
                      <button
                        className="absolute top-0 left-0 bg-gray-100 w-7 h-7 rounded-full text-sm hover:text-red-500 mb-3"
                        type="button"
                        onClick={() => handleMuilDelete(image?.image)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
            {Array.from({ length: 1 }).map((_, index) => (
              <input
                key={index}
                type="file"
                onChange={(e) => handleMuilOnChange(e.target.files)}
                className="file-input w-full max-w-xs mt-3"
                ref={(ref) => (multiInputRefs.current[index] = ref)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="m-5 flex items-center justify-between">
        <button
          type="button"
          className="btn font-semibold border border-gray-200 px-5 py-1 rounded-lg text-white bg-primaryColor"
          onClick={handlePrev}
          disabled={currentStep === 1}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn font-semibold border border-gray-200 px-5 py-1 rounded-lg text-white bg-primaryColor"
          onClick={handleNext}
          disabled={currentStep === steps.length && !complete}
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      </div>
    </>
  );
};

export default DuplicateStepFour;
