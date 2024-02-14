import axios from "axios";
import { IBookingAdmin } from "../models/IBookingAdmin";
import { Dispatch, SetStateAction } from "react";

interface IBookingPresentationProps {
  booking: IBookingAdmin;
  setBookings: Dispatch<SetStateAction<IBookingAdmin[] | undefined>>;
}

export const BookingPresentation = ({
  booking,
  setBookings,
}: IBookingPresentationProps) => {
  const BookingDelete = async () => {
    await axios.delete(
      "https://school-restaurant-api.azurewebsites.net/booking/delete/" +
        booking._id
    );
    setBookings((Bookings) => Bookings?.filter((b) => b._id !== booking._id));
  };

  return (
    <div key={booking._id} className="booking-container">
      <h2>Booking Information</h2>
      <p>
        <b>BookingID:</b> {booking._id}
      </p>
      <p>
        <b>BookingDate:</b> {booking.date}
      </p>
      <p>
        <b>BookingTime:</b> {booking.time}
      </p>
      <p>
        <b>NumberOfGuests:</b> {booking.numberOfGuests}
      </p>
      <p>
        <b>CustomerID:</b> {booking.customerId}
      </p>
      <p>
        <b>RestaurantID:</b> {booking.restaurantId}
      </p>
      <div className="button-container">
        <button onClick={BookingDelete}>Delete Booking</button>
        <button>Customer Info</button>
      </div>
    </div>
  );
};
