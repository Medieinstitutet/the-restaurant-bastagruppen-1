import { Link, NavLink } from "react-router-dom";
import "../scss/Navigation.scss";
export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/booking">Book here</NavLink>
        </li>
        <li>
          <Link to="#contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};
