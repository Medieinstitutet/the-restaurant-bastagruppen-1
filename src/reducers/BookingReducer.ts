import { IBookingAdmin } from "../models/IBookingAdmin.ts";

export interface IAction {
  type: ActionType;
  payload: IBookingAdmin[];
}

export enum ActionType {
  ADDED,
  UPDATED,
  REMOVED,
}

export const BookingReducer = (bookings: IBookingAdmin[], action: IAction) => {
  switch (action.type) {
    case ActionType.ADDED:
      break;
    case ActionType.UPDATED:
      break;
    case ActionType.REMOVED:
    // return bookings.filter((booking) => booking._id !== action.payload);

    default:
      return bookings;
  }
};
