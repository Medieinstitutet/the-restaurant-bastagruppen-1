import "../scss/Footer.scss";
import ScrollToHashElement from "../components/ScrollToHashElement";
export const Footer = () => {
  return (
    <footer id="contact">
      <ScrollToHashElement />
      <ul>
        <li>The Restaurant</li>
        <li>Book</li>
        <li>Contact</li>
        <li>Social</li>
      </ul>
    </footer>
  );
};
