import axios from "axios";
import { Booking } from "../models/Booking";

export const createBooking = async (bookingData: Booking) => {
  const response = await axios.post(
    "https://school-restaurant-api.azurewebsites.net/booking/create",
    bookingData
  );
  return response.data;
};
