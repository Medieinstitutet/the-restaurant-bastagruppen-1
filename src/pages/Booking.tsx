import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "../scss/Booking.scss";

import { IBookingAdmin } from "../models/IBookingAdmin";
import { createBooking } from "../services/BookingCreate";
import { getBookings } from "../services/GetBookings";
import { IBooking } from "../models/Booking";
 
 
interface AvailableTables {
  [date: string]: number;
}
let availableTable: number;
 
 
export const Bookingg  = () => {
  const [availableTables18, setAvailableTables18] = useState<AvailableTables>({});
  const [availableTables21, setAvailableTables21] = useState<AvailableTables>({});
  const [bookings, setBookings] = useState<IBookingAdmin[]>([]);
 
 
 
  useEffect(() => {
  const getDataFromAxios = async () => {
    const response = await getBookings()
    setBookings(response.data)
  }
  getDataFromAxios()  
}, [])
 
 
 
  const [formData, setFormData] = useState<IBooking>({
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
  })
 
 
 
 
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
 
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
 
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
 
    const matchingBookings = bookings.filter(
      (booking: IBookingAdmin) => booking.date === formData.date && booking.time === formData.time
    );

    const totalBookings = matchingBookings.length;
      const maxPersonsPerTable: number = 6;
      const tablesToBook: number = Math.ceil(formData.numberOfGuests / maxPersonsPerTable);
 
      availableTable = formData.time === "18:00" ? (availableTables18[formData.date] ?? 15) : (availableTables21[formData.date] ?? 15);
     
      if (formData.time === "18:00" && availableTable - tablesToBook <= 1 ||
      formData.time === "21:00"  && availableTable - tablesToBook <= 1) {
        alert("No available tables for the selected date and time. Please choose another date or time.");
      }
     
    if (totalBookings + tablesToBook <= availableTable) {
      if (formData.time === "18:00") {
        availableTables18[formData.date] = availableTable - tablesToBook;
        setAvailableTables18({ ...availableTables18 });
     
      } else if (formData.time === "21:00") {
        availableTables21[formData.date] = availableTable - tablesToBook;
        setAvailableTables21({ ...availableTables21 });
      }
 
      await createBooking(formData);
 
      const updatedBookings = await getBookings();
      setBookings(updatedBookings.data);
 
    } else {
      return setFormData({
        ...formData,
        date: "",
        time: "",
      });
      
    }
    console.log(bookings);
 
  }
 
  return <>
  <section className="booking--container">
    <h1>BOOK A TABLE</h1>
<form onSubmit={handleSubmit}>
 
  <div className="persons-time-date">
    <select
    name="numberOfGuests"
   
    value={formData?.numberOfGuests}
    onChange={handleInputChange}>
      <option value={0} disabled>Number of guests</option>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
      <option value={6}>6</option>
      <option value={7}>7</option>
      <option value={8}>8</option>
      <option value={9}>9</option>
      <option value={10}>10</option>
    </select>
   
    <select
    name="time"
    className="booking-time"
    value={formData?.time}
    onChange={handleInputChange}
    >
      <option value="" disabled>Time</option>
      <option value={18} >18:00</option>
      <option value={21} >21:00</option>
    </select>
 
    <input
      name="date"    
      type="date"
      value={formData?.date}
      onChange={handleInputChange}
      />
    </div>
 
    <div className="booking-contact">
     
      <h5>CONTACT DETAILS</h5>
     
      <input
      name="name"
      type="text"
      placeholder="Firstname"
      value={formData?.customer.name}
      onChange={handleInputChange}/>
 
     
      <input
      name="lastname"
      type="text"
      placeholder="Lastname"
      value={formData?.customer.lastname}
      onChange={handleInputChange}/>
     
      <input
      name="phone"
      type="tel"
      placeholder="070 000 00 22"
      value={formData?.customer.phone}
      onChange={handleInputChange}
      />
     
      <input
      name="email"
      type="email"
      placeholder="blabla@hotmail.com"
      value={formData?.customer.email}
      onChange={handleInputChange}/>
    </div>
 
    <button id="submit" type="submit">Request Booking</button>
    </form>
  </section>
  </>};