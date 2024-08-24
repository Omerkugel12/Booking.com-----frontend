import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";

const CalendarPicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 5));

  return (
    <div className="relative">
      <DatePicker
        selected={startDate}
        onChange={(dates) => {
          const [start, end] = dates;
          setStartDate(start);
          setEndDate(end);
        }}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex justify-between px-2 py-2">
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className="text-blue-600 hover:text-blue-800"
            >
              {"<"}
            </button>
            <span className="text-lg font-semibold">
              {date.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className="text-blue-600 hover:text-blue-800"
            >
              {">"}
            </button>
          </div>
        )}
      />
      <div className="flex justify-center mt-4 space-x-2">
        <button className="px-3 py-1 border rounded-full text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
          Exact dates
        </button>
        <button className="px-3 py-1 border rounded-full text-gray-600 border-gray-300 hover:bg-gray-300">
          + 1 day
        </button>
        <button className="px-3 py-1 border rounded-full text-gray-600 border-gray-300 hover:bg-gray-300">
          + 2 days
        </button>
        <button className="px-3 py-1 border rounded-full text-gray-600 border-gray-300 hover:bg-gray-300">
          + 3 days
        </button>
        <button className="px-3 py-1 border rounded-full text-gray-600 border-gray-300 hover:bg-gray-300">
          + 7 days
        </button>
      </div>
    </div>
  );
};

export default CalendarPicker;
