import React, { createContext, useContext, useState, ReactNode } from "react";

interface RoomSelection {
  roomId: string;
  quantity: number;
  price: number | null; // make sure price is nullable if needed
}

interface ReservationContextProps {
  roomSelections: RoomSelection[];
  totalPrice: number;
  addRoom: (roomId: string, quantity: number, price: number) => void;
  clearReservation: () => void;
}

const ReservationContext = createContext<ReservationContextProps | undefined>(
  undefined
);

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
};

export const ReservationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [roomSelections, setRoomSelections] = useState<RoomSelection[]>([]);

  const addRoom = (roomId: string, quantity: number, price: number) => {
    setRoomSelections((prevSelections) => {
      const existingIndex = prevSelections.findIndex(
        (selection) => selection.roomId === roomId
      );
      if (existingIndex >= 0) {
        const updatedSelections = [...prevSelections];
        updatedSelections[existingIndex] = { roomId, quantity, price };
        return updatedSelections;
      } else {
        return [...prevSelections, { roomId, quantity, price }];
      }
    });
  };

  const clearReservation = () => {
    setRoomSelections([]);
  };

  const totalPrice = roomSelections.reduce(
    (total, selection) => total + selection.price,
    0
  );

  return (
    <ReservationContext.Provider
      value={{ roomSelections, totalPrice, addRoom, clearReservation }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
