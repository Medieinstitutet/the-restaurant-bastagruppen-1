import { ChangeEvent, FormEvent, useState } from "react";
import "../scss/Booking.scss";

export const Booking = () => {
  
  const [availableTables, setAvailableTables] = useState(15);
  const [guests, setGuests] = useState(0);


  const bookingTable = () => {

    const seatsPertable: number = 6;
    const tablesToBook: number = Math.ceil(guests / seatsPertable);

    if(tablesToBook < availableTables){
      setGuests(guests + tablesToBook);
      setAvailableTables(availableTables - tablesToBook)
      setAvailableTables(availableTables - tablesToBook);
      console.log({ tablesToBook }, { guests });
    };
    
    if(availableTables - tablesToBook <= 0){
      console.log("Unfortunately, there are no tables available at the moment");   
    };
  };
    
    const handleChangeTheInputs = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      setGuests(parseInt(e.target.value))
    }

  const changeForm = (e: FormEvent) => {
    e.preventDefault()
    bookingTable()
    
    if(guests < 1){
      console.log("Enter number of customers");
    }
  }  
    return <>
  <section className="booking--container">
    <h1>BOOK A TABLE</h1>
<form onSubmit={changeForm}>
  
  <div className="persons-time-date">
    <select 
    value={guests}
    onChange={handleChangeTheInputs}>
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
    
    <select className="booking-time">
      <option disabled>Time</option>
      <option>15:00</option>
      <option>21:00</option>
    </select>

    <input 
      type="date" />
    </div>

    <div className="booking-contact">
      
      <h5>CONTACT DETAILS</h5>
      
      <input 
      type="text" 
      placeholder="Firstname"/>
      
      <input 
      type="text" 
      placeholder="Lastname"/>
      
      <input 
      type="tel" 
      placeholder="070 000 00 22"/>
      
      <input 
      type="email" 
      placeholder="blabla@hotmail.com"/>
    </div>

    <button type="submit">Request Booking</button>
    </form>
  </section>
  </>;
};
