import { BookingPresentation } from "../components/BookingPresentation";
import { useEffect, useState } from "react";
import { IBookingAdmin } from "../models/IBookingAdmin";
import axios from "axios";

export const Administrative = () => {
  const [bookings, setBookings] = useState<IBookingAdmin[]>();
  useEffect(() => {
    const getBookings = async () => {
      const response = await axios.get(
        "https://school-restaurant-api.azurewebsites.net/booking/restaurant/65c8c9a5cbb6491fd64e9a84"
      );
      if (shouldUpdate) {
        setBookings(response.data);
      }
    };
    let shouldUpdate = true;

    if (!bookings) {
      getBookings();
    }
    return () => {
      shouldUpdate = false;
    };
  });
  return (
    <>
      <div className="bookings-container">
        {bookings?.map((booking) => {
          return <BookingPresentation key={booking._id} booking={booking} />;
        })}
      </div>
    </>
  );
};
