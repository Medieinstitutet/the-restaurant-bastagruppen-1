import axios from "axios";

export const BookingUpdate = async () => {
  const response = await axios.put(
    "https://school-restaurant-api.azurewebsites.net/booking/update/65c8dad6601112fa3292abe6",
    {
      id: "65c8dad6601112fa3292abe6",
      restaurantId: "65c8c9a5cbb6491fd64e9a84",
      date: "2022-01-01",
      time: "18:00",
      numberOfGuests: 4,
      customerId: "123",
    }
  );
  console.log(response);
};
