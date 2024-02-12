import { IBookingAdmin } from "../models/IBookingAdmin";
import "../scss/Administrative.scss";

interface IBookingPresentationProps {
  booking: IBookingAdmin;
}

export const BookingPresentation = ({ booking }: IBookingPresentationProps) => {
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
        <button>Delete Booking</button>
        <button>Update Booking</button>
        <button>Customer Info</button>
      </div>
    </div>
  );
};
