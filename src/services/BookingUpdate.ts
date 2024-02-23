import axios from "axios";

import { IUpdateBooking } from "../models/IUpdateBooking";

export const updateBooking = async (bookingData: IUpdateBooking) => {
  const response = await axios.put(
    "https://school-restaurant-api.azurewebsites.net/booking/update/" +
      bookingData.id,
    bookingData
  );
  return response.data;
};
