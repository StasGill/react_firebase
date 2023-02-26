import React from "react";
import "./cartItem.css";

export const CartItem = ({
  image,
  title,
  quantity,
  deleteItem,
  id,
  updateQuantity,
}) => {
  return (
    <div className="item_container">
      <img src={image} className="item_img" alt="product" />
      <div className="item_desc">
        <h3 className="item_title">{title}</h3>
        <p className="item_counter">
          <button onClick={() => updateQuantity(id)} className="item_button">
            -
          </button>{" "}
          {quantity}
          <button
            onClick={() => updateQuantity(id, true)}
            className="item_button"
          >
            +
          </button>
        </p>
        <button className="card_button" onClick={() => deleteItem(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};
