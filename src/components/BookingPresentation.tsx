import { IBookingAdmin } from "../models/IBookingAdmin";
import "../scss/Administrative.scss";

interface IBookingPresentationProps {
  booking: IBookingAdmin;
}

export const BookingPresentation = ({ booking }: IBookingPresentationProps) => {
  return (
    <div key={booking._id} className="booking-container">
      <h2>Booking Information</h2>
      <p>BookingID: {booking._id}</p>
      <p>BookingDate: {booking.date}</p>
      <p>BookingTime: {booking.time}</p>
      <p>NumberOfGuests: {booking.numberOfGuests}</p>
      <p>CustomerID: {booking.customerId}</p>
      <p>RestaurantID: {booking.restaurantId}</p>
      <div className="button-container">
        <button>Delete Booking</button>
        <button>Update Booking</button>
        <button>Customer Info</button>
      </div>
    </div>
  );
};
