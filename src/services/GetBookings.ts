import axios from "axios";

export const getBookings = async () => {
  const response = await axios.get(
    "https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c8c9a5cbb6491fd64e9a84"
  );
  return response;
};
