import { useNavigate } from 'react-router-dom';
import "../scss/PopUp.scss";

export const BookingPopUp = ({ onClose }: any) => {
    const navigate = useNavigate();

    const handleClose = () => {
        onClose();
        navigate("/");
    };

    return <>
        <div className="pop-up-container">
            <div className='pop-up-content'>
                <h2>Thanks for your booking</h2>
                <h3>Check your inbox for your booking confirmation.</h3>
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    </>
} 