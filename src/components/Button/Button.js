import "./button.css";

export const Button = ({ text, onClick, color, type, width }) => {
  return (
    <button
      className="card_button"
      onClick={onClick}
      style={{ backgroundColor: color, width: width }}
      type={type}
    >
      {text}
    </button>
  );
};
