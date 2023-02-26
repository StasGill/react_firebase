import "./updateForm.css";
import { deleteDoc, doc, updateDoc, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { database, productsCollectionRef } from "../../firebase-config";
import { getProducts } from "../../store/productsSlice";
import { Button } from "../../components/Button/Button";

export const UpdateForm = ({ item, setEditMode, createMode }) => {
  const [product, setProduct] = useState(item);
  const productRef = doc(database, "products", item.id);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setProduct((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (createMode) {
        await addDoc(productsCollectionRef, { ...product });
      }
      if (!createMode) {
        await updateDoc(productRef, { ...product });
      }
      dispatch(getProducts());
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(productRef);
      await dispatch(getProducts());
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="modal_label">Image path</label>
      <textarea
        value={product.image}
        onChange={handleChange}
        className="modal_text-area"
        name="image"
      ></textarea>
      <label className="modal_label">Title</label>
      <textarea
        value={product.title}
        onChange={handleChange}
        className="modal_text-area"
        name="title"
      ></textarea>
      <label className="modal_label">Description</label>
      <textarea
        value={product.desc}
        onChange={handleChange}
        className="modal_text-area"
        name="desc"
      ></textarea>
      <label className="modal_label">Price</label>
      <input
        value={product.price}
        onChange={handleChange}
        className="modal_text-area"
        name="price"
        type="number"
      ></input>
      <label className="modal_label">Quantity</label>
      <input
        value={product.quantity}
        onChange={handleChange}
        className="modal_text-area"
        name="quantity"
        type="number"
      />
      <label className="modal_label">Category</label>
      <textarea
        value={product.category}
        onChange={handleChange}
        className="modal_text-area"
        name="category"
      ></textarea>

      <Button text="Save" color="black" type="submit" width="200px" />
      {!createMode && (
        <Button
          text="Delete"
          onClick={handleDelete}
          color="red"
          width="200px"
        />
      )}
    </form>
  );
};
