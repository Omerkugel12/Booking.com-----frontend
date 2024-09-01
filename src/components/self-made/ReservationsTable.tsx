import React, { useState } from "react";
import { CheckCircle, UserRound } from "lucide-react";
import { AvailableRoom } from "@/models/Hotel.model";
import { useReservation } from "@/context/ReservationContext";
import { useNavigate } from "react-router-dom";

interface RoomTableProps {
  availableRooms: AvailableRoom[];
  nights: number;
}

interface LocalRoomSelection {
  roomId: string;
  roomType: string; // Include roomType here
  quantity: number;
  price: number;
}

const RoomTable: React.FC<RoomTableProps> = ({ availableRooms, nights }) => {
  const [localSelections, setLocalSelections] = useState<LocalRoomSelection[]>(
    []
  );
  const { addRoom } = useReservation();
  const navigate = useNavigate();

  const handleRoomSelection = (room: AvailableRoom, qty: number) => {
    setLocalSelections((prevSelections) => {
      const existingIndex = prevSelections.findIndex(
        (selection) => selection.roomId === room.id
      );
      const roomPrice = room.price * nights; // Price for one room for given nights

      if (existingIndex >= 0) {
        const updatedSelections = [...prevSelections];
        if (qty > 0) {
          updatedSelections[existingIndex] = {
            roomId: room.id,
            roomType: room.type, // Store roomType
            quantity: qty,
            price: roomPrice, // Store price per room (price * nights)
          };
        } else {
          updatedSelections.splice(existingIndex, 1);
        }
        return updatedSelections;
      } else {
        return qty > 0
          ? [
              ...prevSelections,
              {
                roomId: room.id,
                roomType: room.type, // Store roomType
                quantity: qty,
                price: roomPrice, // Store price per room (price * nights)
              },
            ]
          : prevSelections;
      }
    });
  };

  const totalPrice = localSelections.reduce(
    (total, selection) => total + selection.price * selection.quantity, // Multiply price by quantity
    0
  );

  const isAnyRoomSelected = localSelections.some(
    (selection) => selection.quantity > 0
  );

  const handleReserve = () => {
    localSelections.forEach((selection) => {
      addRoom(
        selection.roomId,
        selection.roomType, // Pass roomType
        selection.quantity,
        selection.price // Store total price for selected quantity
      );
    });
    navigate("booking");
  };

  return (
    <div className="flex">
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
                Price for {nights} Nights
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
            {availableRooms.map((room) => (
              <tr key={room.id} className="bg-white">
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
                  ${room.price * nights}
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
                  <p className="mt-2">
                    10% Genius discount applied to the price before taxes and
                    charges
                  </p>
                </td>
                <td className="p-4 border text-center">
                  <select
                    className="border border-gray-300 p-2 rounded"
                    value={
                      localSelections.find((sel) => sel.roomId === room.id)
                        ?.quantity || 0
                    }
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
          {isAnyRoomSelected ? (
            <>
              <p>
                {localSelections.reduce(
                  (acc, selection) => acc + selection.quantity,
                  0
                )}{" "}
                room(s) for
              </p>
              <p className="text-red-500 line-through">{`$${totalPrice.toFixed(
                2
              )}`}</p>
              <p className="text-gray-900 text-xl font-bold">{`$${(
                totalPrice * 0.9
              ).toFixed(2)}`}</p>
              <p className="text-gray-600 text-sm">Includes taxes and fees</p>
            </>
          ) : (
            <p>Please select a room.</p>
          )}
        </div>
        <button
          className={`w-full py-2 rounded mb-4 ${
            isAnyRoomSelected
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isAnyRoomSelected}
          onClick={handleReserve}
        >
          Reserve with Genius discount
        </button>
        {isAnyRoomSelected && (
          <div>
            <p className="text-sm">• It only takes 2 minutes</p>
            <p className="text-sm">• Confirmation is immediate</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomTable;
