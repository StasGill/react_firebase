import "./modal.css";

export const Modal = ({ children }) => {
  return (
    <div className="modal_overlay">
      <div className="modal">{children}</div>
    </div>
  );
};
