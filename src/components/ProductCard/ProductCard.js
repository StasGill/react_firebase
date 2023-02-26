import { Button } from "../Button/Button";
import "./productCard.css";

export const ProductCard = ({
  title,
  desc,
  image,
  price,
  onClick,
  quantity,
  editMode,
  item,
  setProduct,
  setEditMode,
}) => {
  const handleEdit = () => {
    setProduct(item);
    setEditMode(true);
  };

  return (
    <div className="card_container">
      <img src={image} className="card_image" alt="product" />
      <div className="desc_container">
        <div>
          <h3>{title}</h3>
          <p>{desc}</p>
          <p className="card_price">{price} $</p>
          {editMode && <p>{quantity} pc</p>}
        </div>
        <div>
          {editMode ? (
            <Button text="Edit" onClick={handleEdit} />
          ) : (
            <Button text="Add to cart" onClick={onClick} />
          )}
        </div>
      </div>
    </div>
  );
};
