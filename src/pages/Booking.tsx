import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "../scss/Booking.scss";
import { createBooking } from "../services/BookingCreate";
import { getBookings } from "../services/GetBookings";
import { IBooking } from "../models/Booking";
import { CustomerBooking } from "../components/CustomerBooking";
import { BookingPopUp } from "../components/BookingPopUp";

export const Bookingg  = () => {
  const [showGuests, setShowGuests] = useState(true);
  const [showDateTime, setShowDateTime] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isGDPR, setIsGDPR] = useState(false)
  const [showPopUp, setShowPopUp] = useState(false)
  const [hiddenForm, setHiddenForm] = useState(true)

  const [bookings, setBookings] = useState<IBooking[]>([]);
 
  let totalTables: number = 15;
  
  useEffect(() => {
    const getBookingData = async () => {
      const response = await getBookings();
      setBookings(response.data);
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
    setIsGDPR(false)
    setShowPopUp(true)
    setHiddenForm(false)
  
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
    <CustomerBooking
       showGuests={showGuests}
       showDateTime={showDateTime}
       showBookingForm={showBookingForm}
       formData={formData}
       handleInputChange={handleInputChange}
       handleSearch={handleSearch}
       handleSearcDateTime={handleSearcDateTime}
       handleGDPR={handleGDPR}
       handleSubmit={handleSubmit}
       isGDPR={isGDPR}
       showPopUp={showPopUp} 
       hiddenForm={hiddenForm}/>

    {showPopUp && <BookingPopUp onClose={() => setShowPopUp(false)} />}
  </>

  };

