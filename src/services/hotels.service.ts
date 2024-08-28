// services/hotelService.ts
import api from "./api.service";
import { HotelDetails, HotelResult } from "@/models/Hotel.model";

// Fetch a list of hotels with filtering and pagination
export async function getHotels(
  params: Record<string, any>
): Promise<HotelResult[]> {
  try {
    const response = await api.get("/hotels", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw error;
  }
}

// Fetch detailed hotel information along with available rooms
export async function getHotelDetailsWithAvailableRooms(
  hotelId: string,
  startDate: string,
  endDate: string
): Promise<HotelDetails> {
  try {
    const response = await api.get(`/hotels/${hotelId}`, {
      params: { startDate, endDate },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching hotel details with available rooms:", error);
    throw error;
  }
}
