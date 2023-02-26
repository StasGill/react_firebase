import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CartIcon } from "../assets/CartIcon";
import { Filters } from "../components/Filters/Filters";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { addToCart, getProducts, updateCart } from "../store/productsSlice";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const [all, setAll] = useState("true");
  const { categoryID } = useParams();
  const { products, category, cart } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const addToCartHandler = (item) => {
    const isItemInCart = cart.find((data) => data.id === item.id);
    localStorage.setItem(
      "cart",
      JSON.stringify([...cart, { ...item, quantity: 1 }])
    );
    !isItemInCart && dispatch(addToCart(item));
  };

  const handleClick = () => {
    navigate(`../admin/dashboard`, { replace: true });
  };

  useEffect(() => {
    const cartFromLocal = JSON.parse(localStorage.getItem("cart"));
    cartFromLocal && dispatch(updateCart(cartFromLocal));
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (categoryID === undefined) {
      setAll(true);
    } else {
      setAll(false);
    }
  }, [categoryID]);

  return (
    <>
      <div
        className="cart_container"
        onClick={() => navigate(`../cart`, { replace: true })}
      >
        <CartIcon />
        <span className="cart_counter">{cart.length !== 0 && cart.length}</span>
      </div>
      <Header />
      <div className="container">
        <Filters filters={category} urlParam="category" />
        <div className="products_container">
          {products
            .filter((item) => all || item.category === categoryID)
            .map((item) => (
              <ProductCard
                image={item.image}
                title={item.title}
                desc={item.desc}
                price={item.price}
                key={item.id}
                onClick={() => addToCartHandler(item)}
              />
            ))}
        </div>
      </div>
      <Footer handleClick={handleClick} />
    </>
  );
};

export default Home;
