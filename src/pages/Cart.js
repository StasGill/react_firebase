import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../components/CartItem/CartItem";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { database } from "../firebase-config";
import { updateCart } from "../store/productsSlice";
import "./cart.css";

const Cart = () => {
  const { cart, products } = useSelector((state) => state.products);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryCollectionRef = collection(database, "orders");

  const deleteItem = (id) => {
    const filteredCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
    dispatch(updateCart(filteredCart));
  };

  const updateQuantity = (id, plus) => {
    let filteredCart = cart.filter((item) => item.id !== id);
    const findItem = cart.find((item) => item.id === id);
    const findProduct = products.find((item) => item.id === id);
    const newObject = { ...findItem };

    if (plus) {
      newObject.quantity = newObject.quantity + 1;
    } else {
      newObject.quantity = newObject.quantity - 1;
    }

    if (newObject.quantity < 1 || newObject.quantity > findProduct.quantity)
      return;

    filteredCart = [...filteredCart, newObject];

    localStorage.setItem("cart", JSON.stringify(filteredCart));

    dispatch(updateCart(filteredCart));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      addDoc(categoryCollectionRef, {
        name: name,
        surname: surname,
        orders: cart,
        complete: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const cartFromLocal = JSON.parse(localStorage.getItem("cart"));
    cartFromLocal && dispatch(updateCart(cartFromLocal));
  }, [dispatch]);

  return (
    <>
      <Header />
      {cart.length === 0 ? (
        <div className="empty_cart">
          <div>
            <h2>Cart is empty</h2>
            <button
              className="card_button"
              onClick={() => navigate(`/`, { replace: true })}
            >
              Back to main
            </button>
          </div>
        </div>
      ) : (
        <div className="card_order">
          <div>
            <h2>Youre cart</h2>
            {cart.map((item) => (
              <CartItem
                image={item.image}
                title={item.title}
                quantity={item.quantity}
                deleteItem={deleteItem}
                updateQuantity={updateQuantity}
                id={item.id}
                key={item.id}
              />
            ))}
          </div>
          <div className="card_form">
            <h2>Customer data</h2>
            <form onSubmit={onSubmit}>
              <input
                placeholder="Youre name"
                className="card_input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              <input
                placeholder="Youre surname"
                className="card_input"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              ></input>
              <input
                placeholder="Telephone number"
                className="card_input"
              ></input>
              <input placeholder="Address" className="card_input"></input>
              <button className="card_button" type="submit">
                Order
              </button>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Cart;
