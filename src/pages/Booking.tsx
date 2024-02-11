import "../scss/Booking.scss";

export const Booking = () => {
 
  return <>
  <section className="booking--container">
    <h1>BOOK A TABLE</h1>

  <div className="persons-time-date">
    <select>
      <option value="" disabled selected>Number of guests</option>
      <option value="">1</option>
      <option value="">2</option>
      <option value="">3</option>
      <option value="">4</option>
      <option value="">5</option>
      <option value="">6</option>
      <option value="">7</option>
      <option value="">8</option>
      <option value="">9</option>
      <option value="">10</option>
    </select>
    
    <select className="booking-time">
      <option value="" disabled selected>Time</option>
      <option value="">15:00</option>
      <option value="">21:00</option>
    </select>

    <input 
      type="date" />
    </div>

    <div className="booking-contact">
      
      <h5>CONTACT DETAILS</h5>
      
      <input type="text" placeholder="Firstname"/>
      <input type="text" placeholder="Lastname"/>
      <input type="tel" placeholder="070 000 00 22"/>
      <input type="email" placeholder="blabla@hotmail.com"/>
    </div>

    <button>Request Booking</button>
  </section>
  </>;
};
