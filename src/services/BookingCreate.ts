import axios from "axios";
import { IBooking } from "../models/Booking";

export const createBooking = async (bookingData: IBooking) => {
  const response = await axios.post(
    "https://school-restaurant-api.azurewebsites.net/booking/create",
    bookingData
  );
  return response.data;
};
