
"use client";
import BigSpinner from "@/components/common/loader/BigSpinner";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import Select from "react-select";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/contants/storageKey";

const DuplicateStepTwo = ({
  currentStep,
  setCurrentStep,
  complete,
  steps,
  setComplete,
  finalStepOneData,
  finalStepTwoData,
  setFinalStepTwoData,
}) => {
  // step one and two in itial data
  const stepOneDefaultdata = finalStepOneData;

  const [oldFilterSub_Filter, setOldFilterSub_Filter] =
    useState(finalStepTwoData);

  //   default category sub category child category for filters
  const category_id = stepOneDefaultdata?.category_id;

  // get value and set value and set condition
  const [filtersData, setFiltersData] = useState([]);
  const [filter_id, setFilter_id] = useState("");
  const [filter_name, setFilter_name] = useState("");
  const [isChild_FilterOpen, setIsChild_FilterOpen] = useState(true);
  const [child_FiltersData, setChild_FiltersData] = useState([]);
  const [child_filter_id, setChild_Filter_id] = useState("");
  const [child_filter_name, setChild_filter_name] = useState("");

  const [filterStatus, setFilterStatus] = useState(false);
  const [childFilterStatus, setChildFilterStatus] = useState(false);
  const [nextButtonStatus, setNextButtonStatus] = useState(true);
  const [filter_nameSerial, setFilter_nameSerial] = useState("");

  // add
  const addSelectInput = () => {
    if (filterStatus === false || childFilterStatus === false) {
      return;
    }
    if (filter_id && child_filter_id) {
      const saveData = {
        filter_id: {
          filter_name,
          _id: filter_id,
        },
        child_filter_id: {
          child_filter_name,
          _id: child_filter_id,
        },
      };

      // Check if saveData already exists in alldata
      if (oldFilterSub_Filter?.some((data) => data?.filter_id === filter_id)) {
        setFilterStatus(false);
        setChildFilterStatus(false);
        setNextButtonStatus(true);
        toast.error("Already Added");
        setFilter_id(null);
        setFilter_name("");
        setChild_Filter_id(null);
        setChild_filter_name("");
        return;
      }

      setOldFilterSub_Filter((prevData) => [...prevData, saveData]);
      setFilterStatus(false);
      setChildFilterStatus(false);
      setNextButtonStatus(true);
      setFilter_id(null);
      setFilter_name("");
      setChild_Filter_id(null);
      setChild_filter_name("");
    }
  };

  // steper manage
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setComplete(false);
    }
  };

  // get token from local storage
  const token = getFromLocalStorage(authKey);

  const { data: filters = [], isLoading } = useQuery({
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
  }); // get all filter for select

  const { data: child_filters = [] } = useQuery({
    queryKey: [`/api/v1/child_filter`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/child_filter`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    },
  }); // get all Child filter for select

  //   set filters
  useEffect(() => {
    if (filters?.data) {
      const getFilterData = filters?.data.filter((filter) => {
        // Check if the filter's category_id matches the current category_id
        const categoryMatch = filter?.category_id?._id === category_id;
        // Return true if both category and subcategory match
        return categoryMatch;
      });
      setFiltersData(getFilterData);
    }
  }, [filters?.data, category_id]);

  //   set child_Filters
  useEffect(() => {
    if (child_filters?.data) {
      const getChild_FilterData = child_filters?.data.filter((filter) => {
        // Check if the filter's category_id matches the current category_id
        const categoryMatch = filter?.category_id?._id === category_id;
        // Return true if both category and subcategory match
        // Check if the child filter's filter matches the current filter
        const filterMatch = filter?.filter_id?._id === filter_id;
        return categoryMatch && filterMatch;
      });
      setChild_FiltersData(getChild_FilterData);
    }
  }, [child_filters?.data, category_id, filter_id]);

  const handleDeleteOldVariation = (data) => {
    setOldFilterSub_Filter(
      oldFilterSub_Filter.filter((item) => item.filter_id !== data.filter_id)
    );
    setNextButtonStatus(true);
  };

  // submit data
  const handleNext = () => {
    setFinalStepTwoData(oldFilterSub_Filter);
    if (currentStep === steps.length) {
      setComplete(true);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  if (isLoading) {
    return <BigSpinner />;
  }

  return (
    <div>
      {oldFilterSub_Filter?.length > 0 && (
        <>
          <h1 className="font-semibold text-xl mt-4">
            Product Filter And Child Filter:{" "}
          </h1>
          {oldFilterSub_Filter && (
            <>
              <table className="min-w-full divide-y-2 divide-gray-200 text-sm border border-gray-300 mt-4 rounded-xl">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                      Filter Name
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                      Child Filter Name
                    </th>
                    <th className="px-4 py-2 text-center font-medium text-gray-900 whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {oldFilterSub_Filter?.map((filterSubFilter, i) => (
                    <tr key={i}>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold">
                        {filterSubFilter?.filter_id?.filter_name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold">
                        {filterSubFilter?.child_filter_id?.child_filter_name}
                      </td>

                      <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                        <MdDeleteForever
                          onClick={() =>
                            handleDeleteOldVariation(filterSubFilter)
                          }
                          className="cursor-pointer text-red-500 hover:text-red-300"
                          size={25}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </>
      )}

      <div>
        <div className="mt-4 flex items-center justify-end">
          <button
            type="button"
            className="px-10 py-3 text-white transition-colors duration-300 transform bg-[#22CD5A] rounded-xl hover:bg-[#22CD5A]"
            onClick={addSelectInput}
          >
            +
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">
              Filter Name<span className="text-red-500">*</span>
            </p>
            <Select
              onChange={(selectedOption) => {
                if (selectedOption) {
                  const { _id, filter_name, filter_serial } = selectedOption;
                  setFilter_id(_id);
                  setFilter_name(filter_name);
                  setFilter_nameSerial(filter_serial);
                  setIsChild_FilterOpen(false);
                  setChild_Filter_id();
                  setChild_filter_name();
                  setFilterStatus(true);
                  setNextButtonStatus(false);
                  setTimeout(() => {
                    setIsChild_FilterOpen(true);
                  }, 100);
                }
              }}
              isClearable
              aria-label="Select a Filter"
              options={filtersData
                ?.filter(
                  (option) =>
                    !oldFilterSub_Filter.some(
                      (item) => item?.filter_id?._id === option?._id
                    )
                )
                .sort((a, b) => (a.filter_serial > b.filter_serial ? 1 : -1))}
              getOptionLabel={(x) =>
                x?.filter_serial
                  ? x?.filter_serial + ". " + x?.filter_name
                  : filter_nameSerial + ". " + x?.filter_name
              }
              getOptionValue={(x) => x?._id}
              value={
                filter_id ? { _id: filter_id, filter_name: filter_name } : null
              }
            />
          </div>
          {isChild_FilterOpen && (
            <div>
              <p className="font-medium">
                Child Filter Name<span className="text-red-500">*</span>
              </p>
              <Select
                onChange={(selectedOption) => {
                  setChild_Filter_id(selectedOption?._id);
                  setChild_filter_name(selectedOption?.child_filter_name);
                  setChildFilterStatus(true);
                  setNextButtonStatus(false);
                }}
                isClearable
                aria-label="Select a Child Filter"
                options={child_FiltersData}
                getOptionLabel={(x) => x?.child_filter_name}
                getOptionValue={(x) => x?._id}
                value={
                  child_filter_id
                    ? {
                        _id: child_filter_id,
                        child_filter_name: child_filter_name,
                      }
                    : null
                }
              />
            </div>
          )}
        </div>
      </div>

      <div className="m-5 flex items-center justify-between">
        <button
          className="btn font-semibold border border-gray-200 px-5 py-1 rounded-lg text-white bg-primaryColor"
          onClick={handlePrev}
          disabled={currentStep === 1}
        >
          Previous
        </button>
        {nextButtonStatus == true ? (
          <button
            className="btn font-semibold border border-gray-200 px-5 py-1 rounded-lg text-white bg-primaryColor"
            onClick={handleNext}
            disabled={currentStep === steps.length && !complete}
          >
            {currentStep === steps.length ? "Finish" : "Next"}
          </button>
        ) : (
          <button
            disabled
            className="btn font-semibold border border-gray-200 px-5 py-1 rounded-lg text-white bg-primaryColor"
          >
            Please click + icon
          </button>
        )}
      </div>
    </div>
  );
};

export default DuplicateStepTwo;
