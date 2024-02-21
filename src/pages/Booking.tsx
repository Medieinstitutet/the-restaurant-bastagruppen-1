import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "../scss/Booking.scss";

import { IBookingAdmin } from "../models/IBookingAdmin";
import { createBooking } from "../services/BookingCreate";
import { getBookings } from "../services/GetBookings";
import { IBooking } from "../models/Booking";
 
export const Bookingg  = () => {
  const [availableTables18, setAvailableTables18] = useState([]);
  const [availableTables21, setAvailableTables21] = useState([]);
  const [bookings, setBookings] = useState<IBooking[]>([]);
  
  
  
  useEffect(() => {
    const getBookingData = async () => {
      const response = await getBookings();
      setBookings(response.data);
      console.log(response.data);
    };
    getBookingData();
  },[]);



const [formData, setFormData] = useState<IBooking>({
  restaurantId: "65c8c9a5cbb6491fd64e9a84",
  date: "",
  time: "",
  numberOfGuests: 0,
  customer: {
    name: "",
    lastname: "",
    email: "",
    phone: "",
  },
})


const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  let totalTables: number = 15;
  
  const existingBookingsCount = bookings.filter(
    (booking) => booking.date === formData.date && booking.time === formData.time).length;
     
    if (existingBookingsCount >= totalTables) {
      alert('There are no tables available for the date and time you have selected');
      return;
    } 

  // Lägg till den aktuella bokningen i bookings18
  setAvailableTables18([...availableTables18]);
  setAvailableTables21([...availableTables21]);

  if(formData.numberOfGuests > 6){
    alert("Your booking is for more than 6 people. Call us on 016 23 23 23")
    return  setFormData({
      restaurantId: "65c8c9a5cbb6491fd64e9a84",
      date: "",
      time: "",
      numberOfGuests: 0,
      customer: {
        name: "",
        lastname: "",
        email: "",
        phone: "",
      },
    });

  }

    await createBooking(formData);
    const updatedBookings = await getBookings();
    setBookings(updatedBookings.data);
           
      //  resetting form data after creating a new booking
    setFormData({
      restaurantId: "65c8c9a5cbb6491fd64e9a84",
      date: "",
      time: "",
      numberOfGuests: 0,
      customer: {
        name: "",
        lastname: "",
        email: "",
        phone: "",
      },
    });
      
    console.log(bookings);
}

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
      <option value={7}>+6</option>

    </select>
   
    <select
    name="time"
    className="booking-time"
    value={formData?.time}
    onChange={handleInputChange}
    >
      <option value="" disabled>Time</option>
      <option value="18:00" >18:00</option>
      <option value="21:00" >21:00</option>
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