"use client";
import { availabilityFilterData, brandFilterData } from "@/data/filter-data";
import PriceRangeFilter from "./PriceRangFilter";

const FilterSection = ({
  selectedFilters,
  setSelectedFilters,
  filterDatas,
}) => {
  const handleFilterClick = (filterName, childFilterName) => {
    setSelectedFilters((prevSelectedFilters) => {
      const prevSelectedChildFilters =
        prevSelectedFilters.filters[filterName] || [];

      // Check if the clicked child filter is already selected
      const updatedChildFilters = prevSelectedChildFilters.includes(
        childFilterName
      )
        ? prevSelectedChildFilters.filter((name) => name !== childFilterName)
        : [...prevSelectedChildFilters, childFilterName];

      const updatedFilters = {
        ...prevSelectedFilters.filters,
        [filterName]: updatedChildFilters,
      };

      // Remove properties with empty arrays as values
      for (const propName in updatedFilters) {
        if (
          Array.isArray(updatedFilters[propName]) &&
          updatedFilters[propName].length === 0
        ) {
          delete updatedFilters[propName];
        }
      }

      return {
        ...prevSelectedFilters,
        filters: updatedFilters,
      };
    });
  };

  const handleSetPrice = (value) => {
    setSelectedFilters((prevSelectedFilters) => ({
      ...prevSelectedFilters,
      min_price: value?.min,
      max_price: value?.max,
    }));
  };

  const handleSetAvailability = (value) => {
    setSelectedFilters((prevSelectedFilters) => ({
      ...prevSelectedFilters,
      availability: prevSelectedFilters.availability.includes(value)
        ? prevSelectedFilters.availability.filter((item) => item !== value)
        : [...prevSelectedFilters.availability, value],
    }));
  };

  const handleSetBrands = (value) => {
    setSelectedFilters((prevSelectedFilters) => ({
      ...prevSelectedFilters,
      brands: prevSelectedFilters.brands.includes(value)
        ? prevSelectedFilters.brands.filter((item) => item !== value)
        : [...prevSelectedFilters.brands, value],
    }));
  };

  return (
    <div className="space-y-1">
      {/* ... Rest of the component remains the same */}
      <ul className="flex flex-col space-y-1 list-none">
        <li className="rounded-lg">
          <details
            className="group [&_summary::-webkit-details-marker]:hidden"
            open
          >
            <summary className="flex cursor-pointer items-center justify-between px-4 py-3 bg-white border-b-2 hover:bg-gray-100 hover:text-gray-700">
              <span className="text-sm font-medium">Price Range</span>

              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <ul className="space-y-1 list-none px-4 py-5 shadow-md rounded-md">
              <PriceRangeFilter onChange={handleSetPrice} />
            </ul>
          </details>
        </li>
      </ul>
      <ul className="flex flex-col space-y-1 list-none">
        {availabilityFilterData?.map((filter, i) => (
          <li key={i}>
            <details
              className="group [&_summary::-webkit-details-marker]:hidden"
              open
            >
              <summary className="flex cursor-pointer items-center justify-between px-4 py-3 bg-white border-b-2 hover:bg-gray-100 hover:text-gray-700">
                <span className="text-sm font-medium">
                  {filter?.filter_name}
                </span>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="space-y-1 list-none px-4 py-5 bg-white shadow-md rounded-md">
                {filter?.child_filters?.map((childFilter) => (
                  <div
                    key={childFilter?.child_filter_name}
                    className="flex gap-x-2"
                  >
                    <input
                      value={childFilter?.child_filter_name}
                      type="checkbox"
                      className="text-xl"
                      checked={selectedFilters?.availability?.includes(
                        childFilter?.value
                      )}
                      onChange={() => handleSetAvailability(childFilter?.value)}
                    />
                    <span>{childFilter?.child_filter_name}</span>
                  </div>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
      {filterDatas?.brands?.length > 0 && (
        <ul className="flex flex-col space-y-1 list-none">
          {brandFilterData?.map((filter, i) => (
            <li key={i}>
              <details
                className="group [&_summary::-webkit-details-marker]:hidden"
                open
              >
                <summary className="flex cursor-pointer items-center justify-between px-4 py-3 bg-white border-b-2 hover:bg-gray-100 hover:text-gray-700">
                  <span className="text-sm font-medium">
                    {filter?.filter_name}
                  </span>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="space-y-1 list-none px-4 py-5 bg-white shadow-md rounded-md">
                  {filterDatas?.brands?.map((brand) => (
                    <div key={brand?._id} className="flex gap-x-2">
                      <input
                        value={brand?.brand_slug}
                        type="checkbox"
                        className="text-xl"
                        checked={selectedFilters?.brands?.includes(
                          brand?.brand_slug
                        )}
                        onChange={() => handleSetBrands(brand?.brand_slug)}
                      />
                      <span>{brand?.brand_name}</span>
                    </div>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      )}

      <ul className="flex flex-col space-y-1 list-none">
        {filterDatas?.filterAndChild_Filters?.map((filter, i) => (
          <li key={i}>
            <details
              className="group [&_summary::-webkit-details-marker]:hidden"
              open
            >
              <summary className="flex cursor-pointer items-center justify-between px-4 py-3 bg-white border-b-2 hover:bg-gray-100 hover:text-gray-700">
                <span className="text-sm font-medium">
                  {filter?.filter?.filter_name}
                </span>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="space-y-1 list-none px-4 py-5 bg-white shadow-md rounded-md">
                {filter?.child_filters?.map((childFilter) => (
                  <div
                    key={childFilter?.child_filter_name}
                    className="flex gap-x-2"
                  >
                    <input
                      value={childFilter?.child_filter_slug}
                      type="checkbox"
                      className="text-xl"
                      checked={selectedFilters?.filter?.filter_slug?.includes(
                        childFilter?.child_filter_slug
                      )}
                      onChange={() =>
                        handleFilterClick(
                          filter?.filter?.filter_slug,
                          childFilter?.child_filter_slug
                        )
                      }
                    />
                    <span>{childFilter?.child_filter_name}</span>
                  </div>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSection;