import { IBooking } from "../models/Booking";

interface ICustomerBookingProps {
    showGuests: boolean;
    showDateTime: boolean;
    showBookingForm: boolean;
    formData: IBooking;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSearch: () => void;
    handleSearcDateTime: () => void;
    handleGDPR: () => void;
    handleSubmit: (e: React.FormEvent) => void;
    isGDPR: boolean;
    showPopUp: boolean
    hiddenForm: boolean
};

export const CustomerBooking = ({showGuests,
    showDateTime,
    showBookingForm,
    formData,
    isGDPR,
    hiddenForm,
    handleInputChange,
    handleSearch,
    handleSearcDateTime,
    handleGDPR,
    handleSubmit,
    }: ICustomerBookingProps) => {

        return <>
        {hiddenForm && (
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
      
          <button id="submit" type="submit">Book a table</button>
          </div>
       
          </form>
          )} 
          
        </section>
        )}
        </>

};