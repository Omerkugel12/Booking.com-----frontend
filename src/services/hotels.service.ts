// services/hotelService.ts
import api from "./api.service";

// Interface for the hotel details (You can extend or modify this based on your data model)
interface HotelDetails {
  data(data: any): unknown;
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  loved: string[];
  facilities: string[];
  images: string[];
  mapLink: string;
}

// Fetch a single hotel's details by ID
export async function getHotelDetails(hotelId: string): Promise<HotelDetails> {
  try {
    const response = await api.get(`/hotels/${hotelId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching hotel details:", error);
    throw error;
  }
}

// Fetch a list of hotels (this could be useful for displaying all hotels)
export async function getHotels(): Promise<HotelDetails[]> {
  try {
    const response = await api.get("/hotels");
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw error;
  }
}

// Create a new hotel (Example)
export async function createHotel(hotelData: Partial<HotelDetails>) {
  try {
    const response = await api.post("/hotels", hotelData);
    return response.data;
  } catch (error) {
    console.error("Error creating hotel:", error);
    throw error;
  }
}
