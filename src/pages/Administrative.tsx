import { BookingPresentation } from "../components/BookingPresentation";
import { useState } from "react";
import { IBookingAdmin } from "../models/IBookingAdmin";
import { getBookings } from "../services/GetBookings";
import "../scss/Administrative.scss";
import { IBooking } from "../models/Booking";
import { createBooking } from "../services/BookingCreate";

export const Administrative = () => {
  const [bookings, setBookings] = useState<IBookingAdmin[]>();
  if (!bookings) {
    const getBookingData = async () => {
      const response = await getBookings();

      setBookings(response.data);
    };
    getBookingData();
  }

  const [formData, setFormData] = useState<IBooking>({
    //standard form data when first creating a booking
    restaurantId: "65c8c9a5cbb6491fd64e9a84",
    date: "",
    //time set to 18:00 to avoid default value not being selectable in form
    time: "18:00",
    numberOfGuests: 0,
    customer: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
    },
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBooking(formData);

    const updatedBookings = await getBookings();

    setBookings(updatedBookings.data);

    //resetting form data after creating a new booking
    setFormData({
      restaurantId: "65c8c9a5cbb6491fd64e9a84",
      date: "",
      time: "18:00",
      numberOfGuests: 0,
      customer: {
        name: "",
        lastname: "",
        email: "",
        phone: "",
      },
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // Takes out the name and value from all the input/select elements inside the form
    const { name, value } = e.currentTarget;
    // console.log(`${name} has been changed to ${value}`);   -  use for debugging

    // Ensures the data is changed right to fit the object structure for the API
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...(name === "date" || name === "time" || name === "numberOfGuests"
        ? { [name]: value }
        : {}),
      customer: {
        ...prevFormData.customer,
        // Makes sure date, time and numberOfGuests attributes does not get placed into the customer object
        ...(name !== "date" && name !== "time" && name !== "numberOfGuests"
          ? { [name]: value }
          : {}),
      },
    }));
  };
  return (
    <>
      <div className="admin-container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>Create Booking</h2>
            <label>
              Date :
              <input
                name="date"
                type="date"
                value={formData?.date}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Time :
              <select
                name="time"
                value={formData?.time}
                onChange={handleInputChange}
              >
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
                value={formData?.numberOfGuests}
                onChange={handleInputChange}
              />
            </label>
            <label>
              name :
              <input
                type="text"
                name="name"
                value={formData?.customer.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              lastname :
              <input
                type="text"
                name="lastname"
                value={formData?.customer.lastname}
                onChange={handleInputChange}
              />
            </label>
            <label>
              email :
              <input
                type="email"
                name="email"
                value={formData?.customer.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              phone :
              <input
                type="tel"
                name="phone"
                value={formData?.customer.phone}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">Add Booking</button>
          </form>
        </div>

        <div className="bookings-container">
          {bookings?.map((booking) => {
            return (
              <BookingPresentation
                key={booking._id}
                booking={booking}
                setBookings={setBookings}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
