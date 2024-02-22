import { IBooking } from "../models/Booking"
import { IBookingAdmin } from "../models/IBookingAdmin"

interface IcustomerBookingProps {
    bookings: IBooking;
}



export function CustomerBookingPresentation ({bookings}: IcustomerBookingProps){
    return<>
    <h2>Booking Information</h2>
    <p>Booking date {bookings.date}</p>
    <p>Booking time {bookings.time}</p>
    <p>Guests {bookings.numberOfGuests}</p>

    <button>Reservation</button>
        
    </>
}