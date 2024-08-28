import React, { useState } from "react";
import { CheckCircle, UserRound, Users } from "lucide-react";
import { AvailableRoom } from "@/models/Hotel.model";
import { Link } from "react-router-dom";

interface RoomTableProps {
  availableRooms: AvailableRoom[];
}

const RoomTable: React.FC<RoomTableProps> = ({ availableRooms }) => {
  const [selectedRoom, setSelectedRoom] = useState<AvailableRoom | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  const handleRoomSelection = (room: AvailableRoom, qty: number) => {
    setSelectedRoom(room);
    setQuantity(qty);
  };

  return (
    <div className="flex">
      {/* Room Table Section */}
      <div className="flex-grow overflow-y-auto p-4">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-4 border text-white bg-[#4C76B2]">
                Accommodation Type
              </th>
              <th className="p-4 border text-white bg-[#4C76B2]">
                Number of Guests
              </th>
              <th className="p-4 border text-white bg-[#003B95]">
                Price for 5 Nights
              </th>
              <th className="p-4 border text-white bg-[#4C76B2]">
                Your Choices
              </th>
              <th className="p-4 border text-white bg-[#4C76B2]">
                Select Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {availableRooms.map((room, index) => (
              <tr key={index} className="bg-white">
                <td className="p-4 border">
                  <strong>{room.type}</strong>
                  <p>{room.description}</p>
                </td>
                <td className="p-2 border text-center">
                  {[...Array(room.capacity)].map((_, i) => (
                    <UserRound key={i} className="inline-block" />
                  ))}
                </td>
                <td className="p-4 border text-center">
                  ₪{room.price * 5}
                  <p className="text-gray-500 text-sm">
                    Includes taxes and fees
                  </p>
                  <p className="text-green-600 text-sm">10% off</p>
                </td>
                <td className="p-4 border text-xs text-emerald-600">
                  <div className="flex items-center mb-2 ">
                    <CheckCircle className="mr-2" /> Includes high-speed
                    internet
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" />{" "}
                    Non-refundable
                  </div>
                  <p className=" mt-2">
                    10% Genius discount applied to the price before taxes and
                    charges
                  </p>
                </td>
                <td className="p-4 border text-center">
                  <select
                    className="border border-gray-300 p-2 rounded"
                    onChange={(e) =>
                      handleRoomSelection(room, parseInt(e.target.value))
                    }
                  >
                    {[...Array(parseInt(room.available_rooms) + 1).keys()].map(
                      (num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      )
                    )}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="sticky top-24 right-0 w-52 p-4 bg-blue-50 shadow-md"
        style={{ height: "calc(100vh - 6rem)" }}
      >
        <div className="mb-4">
          <h2 className="text-blue-600 font-bold">Genius</h2>
          {selectedRoom && quantity > 0 ? (
            <>
              <p>{quantity} room(s) for</p>
              <p className="text-red-500 line-through">{`₪${
                selectedRoom.price * 5 * quantity
              }`}</p>
              <p className="text-gray-900 text-xl font-bold">{`₪${(
                selectedRoom.price *
                5 *
                quantity *
                0.9
              ).toFixed(0)}`}</p>
              <p className="text-gray-600 text-sm">Includes taxes and fees</p>
            </>
          ) : (
            <p>Please select a room.</p>
          )}
        </div>
        <Link to={`booking`}>
          <button
            className={`w-full py-2 rounded mb-4 ${
              selectedRoom && quantity > 0
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!selectedRoom || quantity === 0}
          >
            Reserve with Genius discount
          </button>
        </Link>
        {selectedRoom && quantity > 0 && (
          <div>
            <p className="text-sm">• It only takes 2 minutes</p>
            <p className="text-sm">• Confirmation is immediate</p>
          </div>
        )}
      </div>

      {/* Right Fixed Summary Section */}
    </div>
  );
};

export default RoomTable;
