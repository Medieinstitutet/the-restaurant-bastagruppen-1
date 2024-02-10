import "../scss/Home.scss";
import plate from "../assets/steakplate.png";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <>
      <div className="home-container">
        <section>
          <div className="information-container">
            <h1>
              The Best Steak
              <br />
              In Town!
            </h1>
            <h2>
              The Restaurant AB, <br />
              Drottninggatan 8, <br />
              722 13 Stockholm
            </h2>
            <div className="button-container">
              <Link to="/booking">
                <button className="booking-btn">Book a table!</button>
              </Link>
              <Link to="/">
                <button className="booking-btn">Order online!</button>
              </Link>
            </div>
          </div>
          <div className="img-container">
            <img src={plate} alt="plate" />
          </div>
        </section>
      </div>
    </>
  );
};
