// Interface for the review associated with the hotel
export interface Review {
  hotelID: number;
  date: string;
  text: string;
  staff: number;
  userID: string;
  comfort: number;
  freeWifi: number;
  location: number;
  username: string;
  facilities: number;
  cleanliness: number;
  valueForMoney: number;
}

// Interface for the facilities associated with the hotel
interface Facility {
  id: string;
  category: string;
  name: string;
}

// Interface for available rooms associated with the hotel
export interface AvailableRoom {
  id: string;
  type: string;
  description: string;
  capacity: number;
  price: number;
  available_rooms: string;
}

// Model for the detailed view of a hotel
export interface HotelDetails {
  hotelId: number;
  address: string;
  imageURLs: string;
  id: number;
  name: string;
  city: string;
  description: string;
  distance: number;
  freeCancellation: number;
  prepayment: number;
  scoreLetter: string;
  reviews: Review[];
  hotelLink: string;
  image: string;
  meals: string;
  starsRating: number;
  hotelID: number;
  staff: number;
  facilities: Facility[];
  cleanliness: number;
  freeWifi: number;
  location: number;
  valueForMoney: number;
  comfort: number;
  avgRating: number;
  availableRooms: AvailableRoom[];
  latitude: number;
  longitude: number;
}

// Model for the results view of a hotel
export interface HotelResult {
  address: string;
  reviews: [HotelResult];
  id: number;
  name: string;
  city: string;
  price: number;
  type: string;
  freeCancellation: number;
  prepayment: number;
  scoreLetter: string;
  starsRating: number;
  meals: string;
  distance: number;
  image: string;
  avgRating: number;
  totalPrice: number;
  latitude: number;
  longitude: number;
  location?: number;
}

export interface HotelResult {
  text: string;
  userId: string;
}
