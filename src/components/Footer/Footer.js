import { Button } from "../Button/Button";
import "./footer.css";

export const Footer = ({ handleClick }) => {
  return (
    <div className="footer">
      <div className="footer_container">
        <p>footer</p>
        <Button text="to dashboard" onClick={handleClick} color="grey" />
      </div>
    </div>
  );
};
