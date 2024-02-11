import axios from "axios";

export const BookingDelete = async () => {
  const response = await axios.delete(
    "https://school-restaurant-api.azurewebsites.net/booking/delete/65c8dad6601112fa3292abe4"
  );
  console.log(response);
};
