import { BookingPresentation } from "../components/BookingPresentation";
import { useState } from "react";
import { IBookingAdmin } from "../models/IBookingAdmin";
import { getBookings } from "../services/GetBookings";
import "../scss/Administrative.scss";
import { Booking } from "../models/Booking";
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
  const [formData, setFormData] = useState<Booking>({
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBooking(formData);

    const updatedBookings = await getBookings();

    setBookings(updatedBookings.data);

    //reset form after creating the new one
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

  //Update the state based on the name and value attributes from the input & select fields.
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
    console.log(`${name} has been changed to ${value}`);
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...(name === "date" || name === "time" || name === "numberOfGuests"
        ? { [name]: value }
        : {}),
      customer: {
        ...prevFormData.customer,
        ...(name !== "date" && name !== "time" && name !== "numberOfGuests"
          ? { [name]: value }
          : {}),
      },
    }));
  };
  return (
    <>
      <div className="admin-container">
        <div className="forms-container">
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
                  type="text"
                  name="email"
                  value={formData?.customer.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                phone :
                <input
                  type="text"
                  name="phone"
                  value={formData?.customer.phone}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit">Add Booking</button>
            </form>
          </div>

          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <h2>Update Booking</h2>
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
                  type="text"
                  name="email"
                  value={formData?.customer.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                phone :
                <input
                  type="text"
                  name="phone"
                  value={formData?.customer.phone}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit">Update Booking</button>
            </form>
          </div>
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
