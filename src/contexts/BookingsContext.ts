import { createContext, Dispatch, SetStateAction } from "react";
import { IBookingAdmin } from "../models/IBookingAdmin";

export interface IBookingsContext {
  bookings: IBookingAdmin[];
  setBookings: Dispatch<SetStateAction<IBookingAdmin[]>>;
}

export const BookingsContext = createContext<IBookingsContext>({
  bookings: [],
  setBookings: () => {},
});
