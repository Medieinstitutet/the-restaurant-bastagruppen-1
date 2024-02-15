import { FormEvent, useState } from "react";
import "../scss/Booking.scss";
import { Booking } from "../models/Booking";

export const Bookingg = () => {
  const [availableTables, setAvailableTables] = useState(15);
  // const [guests, setGuests] = useState(0);

  const [bookATable, setBookATable] = useState<Booking>({
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
  const bookingTable = () => {
    const seatsPertable: number = 6;
    const tablesToBook: number = Math.ceil(
      bookATable.numberOfGuests / seatsPertable
    );

    if (tablesToBook < availableTables) {
      setAvailableTables(bookATable.numberOfGuests + tablesToBook);
      setAvailableTables(availableTables - tablesToBook);
      setAvailableTables(availableTables - tablesToBook);
      console.log(
        "Antal bord" + " " + tablesToBook,
        "Antal kunder" + " " + bookATable.numberOfGuests,
        "Ankomst" + " " + bookATable.time
      );
    }

    if (availableTables - tablesToBook <= 0) {
      console.log("Unfortunately, there are no tables available at the moment");
    }
  };

  const handleChangeTheInputs = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { value } = e.target;
    setBookATable({ ...bookATable, numberOfGuests: parseInt(value) });
  };

  const changeForm = (e: FormEvent) => {
    e.preventDefault();
    bookingTable();

    if (bookATable.numberOfGuests < 1) {
      console.log("Enter number of customers");
    }

    setBookATable({
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
  };
  return (
    <>
      <section className="booking--container">
        <h1>BOOK A TABLE</h1>
        <form onSubmit={changeForm}>
          <div className="persons-time-date">
            <select
              value={bookATable?.numberOfGuests}
              onChange={handleChangeTheInputs}
            >
              <option value={0} disabled>
                Number of guests
              </option>
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
              <option value="" disabled>
                Time
              </option>
              <option value={18.0}>18:00</option>
              <option value={21.0}>21:00</option>
            </select>

            <input type="date" />
          </div>

          <div className="booking-contact">
            <h5>CONTACT DETAILS</h5>

            <input type="text" placeholder="Firstname" />

            <input type="text" placeholder="Lastname" />

            <input type="tel" placeholder="070 000 00 22" />

            <input type="email" placeholder="blabla@hotmail.com" />
          </div>

          <button type="submit">Request Booking</button>
        </form>
      </section>
    </>
  );
};
