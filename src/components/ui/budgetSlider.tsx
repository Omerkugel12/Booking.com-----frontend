import React, { useState } from "react";
import ReactSlider from "react-slider";

const BudgetSlider = () => {
  const [minPrice, setMinPrice] = useState(250);
  const [maxPrice, setMaxPrice] = useState(2000);

  const handleSliderChange = (values: number[]) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };

  return (
    <div className="w-64 p-4 border rounded-md shadow-sm bg-white">
      <h2 className="font-semibold text-sm mb-2">Your budget (per night)</h2>
      <p className="text-gray-700 text-sm mb-4">
        ₪ {minPrice} – ₪ {maxPrice}+
      </p>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="thumb"
        trackClassName="track"
        min={250}
        max={2000}
        step={50}
        defaultValue={[250, 2000]}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        ariaValuetext={(state) => `₪ ${state.valueNow}`}
        onChange={handleSliderChange}
        renderThumb={(props, state) => (
          <div
            {...props}
            className="w-4 h-4 bg-blue-600 rounded-full cursor-pointer"
          />
        )}
        renderTrack={(props, state) => (
          <div
            {...props}
            className={`track ${
              state.index === 1 ? "bg-blue-600" : "bg-gray-200"
            } h-1`}
          />
        )}
      />
      {/* Example Histogram-like bars below the slider */}
      <div className="flex justify-between mt-4">
        {[20, 15, 10, 25, 10, 30, 15].map((height, index) => (
          <div
            key={index}
            className="bg-gray-300"
            style={{
              width: "4px",
              height: `${height}px`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BudgetSlider;
