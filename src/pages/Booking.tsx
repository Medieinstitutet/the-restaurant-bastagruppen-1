import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "../scss/Booking.scss";
import { createBooking } from "../services/BookingCreate";
import { getBookings } from "../services/GetBookings";
import { IBooking } from "../models/Booking";

export const Bookingg  = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [showGuests, setShowGuests] = useState(true);
  const [showDateTime, setShowDateTime] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isGDPR, setIsGDPR] = useState(false)
  
  let totalTables: number = 15;
  
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

const handleSearcDateTime = () => {

  if(formData.numberOfGuests === 0){
    alert("Ange antal kunder")
    return
  }

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

  setShowDateTime(true)
  setShowGuests(false)
}

const handleSearch = () => {
  const existingBookingsCount = bookings.filter(
    (booking) => booking.date === formData.date && booking.time === formData.time).length;

    if(existingBookingsCount >= totalTables){
        alert('There are no tables available for the date and time you have selected');
        return;
      }

      if(formData.date === "" || formData.time === ""){
        alert("Ange datum och tid")
        return;
      }
    
    setShowBookingForm(true)
    setShowDateTime(false)
};

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  
    setShowDateTime(false); 
    setShowBookingForm(false); 

    setShowGuests(true)
  
    await createBooking(formData);
    const updatedBookings = await getBookings();
    setBookings(updatedBookings.data);
           
    //Återställ formuläret
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
  
  const handleGDPR = () => {
  setIsGDPR(!isGDPR);
  }

  return <>
  <section className="booking--container">
    <h1>BOOK A TABLE</h1>
    
  {showGuests && (
    <div className="container-number-of-guests">
      <select 
      name="numberOfGuests"
      value={formData?.numberOfGuests}
      onChange={handleInputChange} >
      
      <option value={0} disabled>Number of guests</option>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
      <option value={6}>6</option>
      <option value={7}>+6</option>
    </select>
    
    <button
    onClick={handleSearcDateTime}>Next
    </button>
  </div>
     )};
        
  {showDateTime && (
    <div className="container-date-time">
      <select
        id="time"
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
      id="date"
      name="date"    
      type="date"
      value={formData?.date}
      onChange={handleInputChange}
      min={new Date().toISOString().slice(0, 10)} 
      />
  
      <button onClick={handleSearch}>Next</button> 
    </div>
   )};
 
    {showBookingForm && (
      <form onSubmit={handleSubmit}>
      <div className="booking-contact">
      
      <h5>CONTACT DETAILS</h5>
     
      <input
      name="name"
      type="text"
      placeholder="Firstname"
      value={formData?.customer.name}
      onChange={handleInputChange}
      required/>
 
     
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

      <div className="GDPR">
        <input 
        className="GDPR-checlbox"
        type="checkbox"
        checked={isGDPR}
        required
        onChange={handleGDPR}/> <p>I accept GDPR</p>
      </div>

    <button id="submit" type="submit">Request Booking</button>
    </div>
 
    </form>
    )} 
    
  </section>
  </>};

