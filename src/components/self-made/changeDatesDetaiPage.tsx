// import { useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { DatePickerWithRange } from "./DateRangePicker"; // Assume you have this component
// import { Input } from "@/components/ui/input"; // Your custom components
// import { Button } from "@/components/ui/button"; // Your custom components

// interface DateRange {
//   from: Date;
//   to: Date;
// }

// interface Guests {
//   adults: number;
//   children: number;
//   rooms: number;
// }

// function SimpleSearchBar() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const [date, setDate] = useState<DateRange>({
//     from: new Date(), // Default start date
//     to: new Date(new Date().setDate(new Date().getDate() + 3)), // Default end date
//   });

//   const [guests, setGuests] = useState<Guests>({
//     adults: 2,
//     children: 0,
//     rooms: 1,
//   });

//   const handleDateChange = (newDate: DateRange) => {
//     setDate(newDate);
//   };

//   const handleInputChange = (field: keyof Guests, value: string) => {
//     setGuests((prev) => ({ ...prev, [field]: parseInt(value) }));
//   };

//   const handleSubmit = () => {
//     const queryParams = new URLSearchParams();
//     queryParams.set("startDate", date.from.toISOString().slice(0, 10));
//     queryParams.set("endDate", date.to.toISOString().slice(0, 10));
//     queryParams.set("adults", guests.adults.toString());
//     queryParams.set("children", guests.children.toString());
//     queryParams.set("rooms", guests.rooms.toString());
//     setSearchParams(queryParams);
//     navigate(`/search?${queryParams.toString()}`);
//   };

//   console.log(searchParams);

//   return (
//     <div className="availability-search-bar">
//       <DatePickerWithRange date={date} onChange={handleDateChange} />
//       <Input
//         type="number"
//         value={guests.adults.toString()}
//         onChange={(e) => handleInputChange("adults", e.target.value)}
//       />
//       <Input
//         type="number"
//         value={guests.children.toString()}
//         onChange={(e) => handleInputChange("children", e.target.value)}
//       />
//       <Input
//         type="number"
//         value={guests.rooms.toString()}
//         onChange={(e) => handleInputChange("rooms", e.target.value)}
//       />
//       <Button onClick={handleSubmit}>Change Search</Button>
//     </div>
//   );
// }

// export default SimpleSearchBar;
