import axios from "axios";

export const BookingCreate = async () => {
  const response = await axios.post(
    "https://school-restaurant-api.azurewebsites.net/booking/create",
    {
      restaurantId: "65c8c9a5cbb6491fd64e9a84",
      date: "2022-01-01",
      time: "18:00",
      numberOfGuests: 4,
      customer: {
        name: "Franzén",
        lastname: "Sebastian",
        email: "someone@somedomain.com",
        phone: "070-1112233",
      },
    }
  );
  console.log(response);
};
