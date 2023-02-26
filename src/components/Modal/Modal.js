import "./modal.css";
import { CloseIcon } from "../../assets/CloseIcon";

export const Modal = ({ children, onClick }) => {
  return (
    <div className="modal_overlay">
      <div className="modal_close" onClick={() => onClick(false)}>
        <CloseIcon />
      </div>
      <div className="modal">{children}</div>
    </div>
  );
};
