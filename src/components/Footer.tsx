import "../scss/Footer.scss";
import ScrollToHashElement from "../services/ScrollToHashElement";
export const Footer = () => {
  return (
    <div id="contact">
      <ScrollToHashElement />
      <ul>
        <li className="highlight">Follow us!</li>
        <li>Instagram</li>
        <li>Facebook</li>
        <li>Twitter</li>
      </ul>
      <ul>
        <li className="highlight">Find us here!</li>
        <li>The Restaurant AB,</li>
        <li>Drottninggatan 8,</li>
        <li>722 13 Stockholm</li>
      </ul>
      <ul>
        <li className="highlight">Contact us here!</li>
        <li>Email: therestaurant@support.com</li>
        <li>Phone: +1 (0) 000 0000 0001</li>
        <li>Fax: +1 (0) 000 0000 002</li>
      </ul>
    </div>
  );
};
