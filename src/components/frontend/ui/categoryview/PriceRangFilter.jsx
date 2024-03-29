import { numberWithCommas } from "@/utils/thousandSeparate";
import { useState } from "react";
import ReactSlider from "react-slider";

const PriceRangeFilter = ({ onChange }) => {
  const [priceRange, setPriceRange] = useState([1, 200000]);

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
    onChange({ min: newRange[0], max: newRange[1] });
  };

  return (
    <div className="flex flex-col gap-5 items-center rounded-sm">
      <ReactSlider
        min={1}
        max={200000}
        step={1}
        value={priceRange}
        onChange={handlePriceChange}
        className="w-full"
      />
      <div className="flex items-center justify-between space-x-2 mt-5">
        <span className="px-2 border border-secondary rounded text-base lg:text-lg">
          {numberWithCommas(priceRange[0])}
        </span>
        <span>-</span>
        <span className="px-2 border border-secondary rounded text-base lg:text-lg">
          {numberWithCommas(priceRange[1])}
        </span>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
