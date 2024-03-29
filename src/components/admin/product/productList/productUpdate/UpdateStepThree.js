/* eslint-disable no-prototype-builtins */
"use client";

import BigSpinner from "@/components/common/loader/BigSpinner";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import Select from "react-select";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const UpdateStepThree = ({
  currentStep,
  setCurrentStep,
  complete,
  steps,
  setComplete,
  finalStepOneData,
  finalStepTwoData,
  finalStepThreeData,
  setFinalStepThreeData,
}) => {
  // get token from local storage
  const token = getFromLocalStorage(authKey);
  const { data: specifications = [], isLoading } = useQuery({
    queryKey: [`/api/v1/specification`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/specification`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    },
  }); // get all specification for select

  //   set category sub and child
  const category_id = finalStepOneData?.category_id
    ? finalStepOneData?.category_id
    : "";

  // store filter which match with category
  const [categoryMatchFilter, setCategoryMatchFilter] = useState([]);

  const { data: filters = [] } = useQuery({
    queryKey: [`/api/v1/filter`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/filter`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    },
  }); // get all specification for select

  //   set filters
  useEffect(() => {
    if (filters?.data) {
      const getFilterData = filters?.data.filter((filter) => {
        // Check if the filter's category_id matches the current category_id
        const categoryMatch = filter?.category_id?._id === category_id;
        // Return true if both category and subcategory match
        return categoryMatch;
      });
      setCategoryMatchFilter(getFilterData);
    }
  }, [filters?.data, category_id]);

  // handle specification duplicate filter data
  const [selectedOptions, setSelectedOptions] = useState([]);

  // store all data in state
  const [specification_id, setSpecification_id] = useState("");
  const [specification_name, setSpecification_name] = useState("");
  const [saveData, setAllSaveData] = useState(
    Array.isArray(finalStepThreeData) ? finalStepThreeData : []
  );

  // handle add field
  const [filterStatus, setFilterStatus] = useState(false);
  const [childFilterStatus, setChildFilterStatus] = useState(false);

  const [nextButtonStatus, setNextButtonStatus] = useState(true);

  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      specificationValue: [
        {
          specification_details_name: "",
          specification_details_value: "",
        },
      ],
    },
  });
  //get data in form

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specificationValue",
  }); //specification data handle

  const [handleIndex, setHandleIndex] = useState(0);

  const handleDataPost = async (data) => {
    const seen = {};
    const duplicates = data.specificationValue.filter((spec) => {
      if (seen.hasOwnProperty(spec.specification_details_name)) {
        return true; // Duplicate found
      }
      seen[spec.specification_details_name] = true;
      return false;
    });

    if (duplicates.length > 0) {
      toast.error("Duplicate specification details name found:", duplicates);
      return;
    }
    if (!specification_id) {
      toast.error("Please fill up specification name", {
        autoClose: 1000,
      });
      return;
    }
    const hasEmptySizeOrColor = data?.specificationValue.some(
      (specification) =>
        specification.specification_details_name === "" ||
        specification.specification_details_name === null ||
        specification.specification_details_value === "" ||
        specification.specification_details_value === null
    );

    if (hasEmptySizeOrColor) {
      toast.error("Error: Please fill in the specification value.", {
        autoClose: 1000,
      });
      return; // Stop the function
    }

    // Check if the specification_name already exists in saveData
    const existingSpecificationIndex = saveData.findIndex(
      (entry) =>
        entry?.specification_id?.specification_name === specification_name
    );

    if (existingSpecificationIndex !== -1) {
      const updatedSaveData = [...saveData];
      const existingSpecification = updatedSaveData[existingSpecificationIndex];

      // Map the existing specification details to an array of strings
      const existingDetailsStrings =
        existingSpecification.specification_details.map(
          (detail) =>
            `${detail.specification_details_id._id}_${detail.specification_details_id.filter_name}`
        );

      // Check if any new specification details match the existing ones
      const newSpecificationDetails = data.specificationValue
        .map((item, index) => {
          const newDetailString = `${selectedOptions[index]?.filter_id}_${item?.specification_details_name}`;
          if (existingDetailsStrings.includes(newDetailString)) {
            // If there's a match, return null
            return null;
          } else {
            setNextButtonStatus(true);
            // If not, return the new specification detail
            return {
              specification_details_id: {
                _id: selectedOptions[index]?.filter_id,
                filter_name: item?.specification_details_name,
              },
              specification_details_value: item?.specification_details_value,
            };
          }
        })
        .filter((detail) => detail !== null);

      existingSpecification.specification_details.push(
        ...newSpecificationDetails
      );
      setAllSaveData(updatedSaveData);
      setNextButtonStatus(true);
    } else {
      // If the specification doesn't exist, create a new entry
      const newEntry = {
        specification_id: {
          _id: specification_id,
          specification_name: specification_name,
        },
        specification_details: data?.specificationValue.map((item, index) => ({
          specification_details_id: {
            _id: selectedOptions[index]?.filter_id,
            filter_name: item?.specification_details_name,
          },
          specification_details_value: item?.specification_details_value,
        })),
      };
      setAllSaveData((prev) => [...prev, newEntry]);
    }
    setNextButtonStatus(true);
    reset();
    setSpecification_id(null);
    setSpecification_name(null);
    setSelectedOptions([]);
    setHandleIndex(0);
  };

  // steper manage
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setComplete(false);
    }
  };

  // handle delete specification
  const handleDeleteOldSpecification = (specification_id) => {
    setAllSaveData(
      saveData?.filter(
        (item) => item.specification_id?._id !== specification_id
      )
    );
    setNextButtonStatus(true);
  };

  // handle delete specification details name
  const handleDeleteOldSpecification_details_name = (
    specification_id,
    specification_details_id
  ) => {
    // Filter out the entry to be deleted
    const updatedSaveData = saveData.map((item) => {
      // Check if the item has the matching specification_id
      if (item?.specification_id?._id === specification_id) {
        // Filter out the specification_details where specification_details_id matches
        item.specification_details = item.specification_details.filter(
          (detail) =>
            detail?.specification_details_id?._id !== specification_details_id
        );
      }
      return item;
    });
    setAllSaveData(updatedSaveData);
    setNextButtonStatus(true);
  };

  // submit data
  const handleNext = () => {
    setFinalStepThreeData(saveData);
    if (currentStep === steps.length) {
      setComplete(true);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  if (isLoading) {
    <BigSpinner />;
  }

  return (
    <div>
      {finalStepTwoData?.length > 0 && (
        <div className="bg-white py-2.5 px-4 my-2 rounded-md shadow flex flex-wrap gap-1">
          {finalStepTwoData?.map((data, i) => (
            <h5
              key={i}
              className="rounded-full px-3 py-[1px] bg-gray-50 border border-gray-400 shadow hover:bg-gray-100"
            >
              <span className="text-secondary text-base">
                {data?.filter_id?.filter_name}
              </span>
            </h5>
          ))}
        </div>
      )}

      {saveData?.length > 0 && (
        <>
          <h1 className="font-semibold text-xl mt-4">
            Product Specification:{" "}
          </h1>
          {saveData?.map((data, i) => (
            <div key={i}>
              <div className="flex items-center justify-between text-gray-800 bg-gray-300 py-2 px-4">
                <h2 className="text-lg font-medium">
                  {data?.specification_id?.specification_name}
                </h2>
                <MdDeleteForever
                  onClick={() =>
                    handleDeleteOldSpecification(data?.specification_id?._id)
                  }
                  className="cursor-pointer text-red-500 hover:text-red-300"
                  size={25}
                />
              </div>
              <table className="min-w-full divide-y divide-gray-200 ">
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.specification_details?.map((specidata) => (
                    <tr key={specidata.specification_details_name}>
                      <td className="py-2 px-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        {specidata?.specification_details_id?.filter_name}
                      </td>
                      <td className="py-2 px-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: specidata?.specification_details_value,
                          }}
                        />
                      </td>
                      <td className="py-2 text-end text-sm font-normal text-gray-700 whitespace-nowrap">
                        <MdDeleteForever
                          onClick={() =>
                            handleDeleteOldSpecification_details_name(
                              data?.specification_id?._id,
                              specidata?.specification_details_id?._id
                            )
                          }
                          className="cursor-pointer text-red-500 hover:text-red-300"
                          size={25}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </>
      )}

      <form onSubmit={handleSubmit(handleDataPost)}>
        <div className="mt-10 border p-5 border-gray-300 rounded-md">
          <div className="mt-4 flex items-center justify-between">
            <h3 className="font-semibold" htmlFor="ads_topBadge">
              Specifications:{" "}
            </h3>
            <button
              type="submit"
              className="px-10 py-3 text-white transition-colors duration-300 transform bg-[#22CD5A] rounded-xl hover:bg-[#22CD5A]"
            >
              ADD
            </button>
          </div>

          <div className="my-4">
            <label className="font-semibold" htmlFor="specification_id">
              Specification Name<span className="text-red-500">*</span>
            </label>
            <Select
              className="mt-2 md:w-96 w-full"
              aria-label="Select a Specification"
              options={specifications?.data}
              required
              getOptionLabel={(x) => x?.specification_name}
              getOptionValue={(x) => x?._id}
              onChange={(selectedOption) => {
                setSpecification_id(selectedOption?._id);
                setSpecification_name(selectedOption?.specification_name);
                setNextButtonStatus(false);
              }}
              value={
                specification_id
                  ? {
                      _id: specification_id,
                      specification_name: specification_name,
                    }
                  : null
              }
            />
          </div>

          {fields.map((variation, index) => {
            const filteredOptions = categoryMatchFilter?.filter(
              (option) =>
                !selectedOptions.some(
                  (selectedOption) =>
                    // selectedOption?.filter_id === option?.filter_id
                    selectedOption?.filter_id === option?._id
                )
            );
            return (
              <div key={variation?.id} className="flex items-start gap-6 mt-4">
                <Controller
                  name={`specificationValue[${index}].specification_details_name`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      className="mt-2 w-72"
                      {...field}
                      aria-label="Select a Filter"
                      options={filteredOptions
                        ?.filter(
                          (option) =>
                            !saveData.some((item) =>
                              item.specification_details.some(
                                (filterFind) =>
                                  filterFind.specification_details_id
                                    ?.filter_name === option.filter_name
                              )
                            )
                        )
                        ?.sort((a, b) =>
                          a.filter_serial > b.filter_serial ? 1 : -1
                        )}
                      getOptionLabel={(x) =>
                        x?.filter_serial
                          ? x?.filter_serial + ". " + x?.filter_name
                          : x?.filter_name
                      }
                      getOptionValue={(x) => x?.filter_name}
                      value={
                        selectedOptions[index] ? selectedOptions[index] : null
                      }
                      onChange={(selectedOption) => {
                        setNextButtonStatus(false);
                        setFilterStatus(true);
                        setSelectedOptions((prevOptions) => {
                          const newOptions = [...prevOptions];
                          newOptions[index] = {
                            // filter_id: selectedOption.filter_id,
                            filter_id: selectedOption?._id,
                            filter_name: selectedOption?.filter_name,
                          };
                          return newOptions;
                        });
                        field.onChange(
                          selectedOption ? selectedOption.filter_name : ""
                        );
                      }}
                    />
                  )}
                />

                <Controller
                  name={`specificationValue[${index}].specification_details_value`}
                  control={control}
                  render={({ field }) => (
                    <ReactQuill
                      theme="snow" // or 'bubble'
                      value={field.value}
                      onChange={(content) => {
                        setNextButtonStatus(false);
                        field.onChange(content);
                        setChildFilterStatus(true);
                      }}
                      placeholder="Value..."
                    />
                  )}
                />

                {index < 1 && (
                  <button
                    type="button"
                    className="mt-2 text-white transition-colors duration-300 transform bg-[#22CD5A] rounded-md hover:bg-[#22CD5A] w-[80px] h-[40px]"
                    onClick={() => {
                      if (filterStatus == false || childFilterStatus == false) {
                        toast.error("Please fill up all field", {
                          autoClose: 1000,
                        });
                      } else {
                        append({});
                        setChildFilterStatus(false);
                        setHandleIndex(handleIndex + 1);
                      }
                    }}
                  >
                    +
                  </button>
                )}
                {index < 1 && (
                  <button
                    type="button"
                    className="mt-2 text-white transition-colors duration-300 transform bg-red-500 rounded-md hover:bg-red-600 w-[80px] h-[40px]"
                    onClick={() => {
                      if (handleIndex > 0) {
                        setChildFilterStatus(true);
                        setFilterStatus(true);
                        setSelectedOptions((prevOptions) => {
                          const newOptions = [...prevOptions];
                          if (
                            filterStatus == true &&
                            childFilterStatus == true
                          ) {
                            newOptions.pop();
                          }
                          return newOptions;
                        });
                        remove(handleIndex);
                        setHandleIndex(handleIndex - 1);
                      }
                    }}
                  >
                    -
                  </button>
                )}
              </div>
            );
          })}
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
          {nextButtonStatus == true ? (
            <button
              type="button"
              className="btn font-semibold border border-gray-200 px-5 py-1 rounded-lg text-white bg-primaryColor"
              onClick={handleNext}
              disabled={currentStep === steps.length && !complete}
            >
              {currentStep === steps.length ? "Finish" : "Next"}
            </button>
          ) : (
            <button
              type="button"
              className="btn font-semibold border border-gray-200 px-5 py-1 rounded-lg text-white bg-primaryColor"
              disabled
            >
              please click add button
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateStepThree;
