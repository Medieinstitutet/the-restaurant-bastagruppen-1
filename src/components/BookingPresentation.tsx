import axios from "axios";
import { IBookingAdmin } from "../models/IBookingAdmin";
import { Dispatch, SetStateAction, useState } from "react";
import { IUpdateBooking } from "../models/IUpdateBooking";
import { getBookings } from "../services/GetBookings";
import { updateBooking } from "../services/BookingUpdate";
import "../scss/Administrative.scss";

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

  const [updatedData, setUpdatedData] = useState<IUpdateBooking>({
    id: booking._id,
    restaurantId: "65c8c9a5cbb6491fd64e9a84",
    date: "date missing",
    time: "18:00",
    numberOfGuests: 0,
    customerId: booking.customerId,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBooking(updatedData);

    const updatedBookings = await getBookings();

    setBookings(updatedBookings.data);

    setUpdatedData({
      id: booking._id,
      restaurantId: "65c8c9a5cbb6491fd64e9a84",
      date: "date missing",
      time: "18:00",
      numberOfGuests: 0,
      customerId: booking.customerId,
    });
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;

    setUpdatedData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [isActive, setIsActive] = useState(false);
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
      <div className={isActive ? "form-container" : "hidden"}>
        <form onSubmit={handleSubmit}>
          <label>
            Date :
            <input
              name="date"
              type="date"
              value={updatedData?.date}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Time :
            <select
              name="time"
              value={updatedData?.time}
              onChange={handleInputChange}
            >
              <option disabled={true}>Available Hours</option>
              <option>18:00</option>
              <option>21:00</option>
            </select>
          </label>
          <label>
            numberOfGuests :
            <input
              name="numberOfGuests"
              type="number"
              min={1}
              max={90}
              value={updatedData?.numberOfGuests}
              onChange={handleInputChange}
            />
          </label>

          <button type="submit">Update Booking</button>
        </form>
      </div>
      <div className="button-container">
        <button onClick={BookingDelete}>Delete Booking</button>
        <button
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          Edit Booking
        </button>
      </div>
    </div>
  );
};
