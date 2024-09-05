import React, { useEffect, useState } from "react";
import api from "../services/api.service";
import { useAuth } from "../context/AuthContext";
import { format, isBefore, isAfter, isWithinInterval, addDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import ReservationDropdown from "../components/self-made/ReservetionPageDropDown"; // Import the new dropdown component

interface Reservation {
  id: number;
  hotelName: string;
  startDate: string;
  endDate: string;
  quantity: number;
  totalPrice: number;
  nights: number;
  city: string;
  image: string;
  hotelId: number;
}

const ReservationsPage: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const { loggedInUser } = useAuth(); // Access the logged-in user
  const navigate = useNavigate(); // To navigate to a new URL

  useEffect(() => {
    if (!loggedInUser) return;

    const fetchReservations = async () => {
      try {
        const response = await api.get(`/reservations/${loggedInUser._id}`);
        setReservations(response.data);
        console.log(response.data); // Log the response for debugging
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, [loggedInUser]);

  if (!loggedInUser) {
    navigate(-1);
  }

  const formatDate = (date: string) => format(new Date(date), "dd MMM yyyy");

  const formatUrlDate = (date: Date) => format(date, "yyyy-MM-dd");

  // Function to determine reservation status
  const getReservationStatus = (startDate: string, endDate: string) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isBefore(today, start)) {
      return "Upcoming";
    } else if (isWithinInterval(today, { start, end })) {
      return "Ongoing";
    } else if (isAfter(today, end)) {
      return "Completed";
    }
  };

  // Handle the "Book Again" action
  const handleBookAgain = (hotelId: number) => {
    const today = new Date();
    const nextDay = addDays(today, 1);

    const startDate = formatUrlDate(today);
    const endDate = formatUrlDate(nextDay);

    navigate(`/hotel/${hotelId}?startDate=${startDate}&endDate=${endDate}`);
  };

  const handleRemoveBooking = (reservationId: number) => {
    // Call API to delete the reservation or handle logic here
    api
      .delete(`/reservations/cancel/${reservationId}`)
      .then(() => {
        setReservations((prevReservations) =>
          prevReservations.filter(
            (reservation) => reservation.id !== reservationId
          )
        );
        console.log("Remove Booking", reservationId);
      })
      .catch((error) => console.error("Error deleting reservation", error));
  };

  return (
    <div className="p-8 font-[Blue Sans]">
      <h1 className="text-[32px] font-bold py-4 ">Bookings & Trips</h1>
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        reservations.map((reservation) => {
          const status = getReservationStatus(
            reservation.startDate,
            reservation.endDate
          );
          const isCompleted = status === "Completed";

          return (
            <div key={reservation.id} className="mb-6 border-b">
              <h2 className="text-2xl font-bold font-[Blue Sans]">
                {reservation.city.split(", ")[1]}
              </h2>
              <p className="font-normal text-[16px] pb-4">
                {formatDate(reservation.startDate)} –{" "}
                {formatDate(reservation.endDate)}
              </p>
              <div
                className={`flex p-6 border-[1px] rounded-lg ${
                  isCompleted ? "bg-gray-100 text-gray-500" : "bg-white"
                }`} // Grey out the card if completed
              >
                <img
                  src={reservation.image}
                  alt={reservation.hotelName}
                  className={`w-24 h-24 object-cover mr-4 rounded-sm ${
                    isCompleted ? "opacity-50" : ""
                  }`} // Apply opacity if completed
                />
                <div>
                  <div className="w-[800px] flex justify-between items-center">
                    <h2 className="text-[16px] font-bold">
                      {reservation.hotelName}
                    </h2>{" "}
                    <p className="text-lg font-bold flex items-center">
                      Total: ${reservation.totalPrice}
                      <ReservationDropdown
                        isCompleted={isCompleted}
                        onBookAgain={() => handleBookAgain(reservation.hotelId)}
                        onCancelBooking={() =>
                          handleRemoveBooking(reservation.id)
                        }
                        onRemoveBooking={() =>
                          handleRemoveBooking(reservation.id)
                        }
                        hotel={reservation}
                        setReviews={function (): void {}}
                      />
                    </p>
                  </div>
                  <div className="w-[800px] flex justify-between items-center">
                    <p className="mt-2 text-sm">
                      {formatDate(reservation.startDate)} –{" "}
                      {formatDate(reservation.endDate)} ·{" "}
                      {reservation.city.split(", ")[1]}{" "}
                    </p>

                    <p>
                      {reservation.nights} night(s) - {reservation.quantity}{" "}
                      room(s)
                    </p>
                  </div>
                  <p className="font-semibold text-[16px] mt-2">{status}</p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ReservationsPage;
