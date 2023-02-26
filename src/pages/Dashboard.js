import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase-config";
import { Header } from "../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { getProducts } from "../store/productsSlice";
import { Modal } from "../components/Modal/Modal";
import { Footer } from "../components/Footer/Footer";
import { Filters } from "../components/Filters/Filters";
import { Button } from "../components/Button/Button";
import { useParams } from "react-router-dom";
import { UpdateForm } from "../components/UpdateForm/UpdateForm";
import "./signUp.css";

const category = [
  { name: "orders", id: "Orders" },
  { name: "category", id: "Category" },
];

const mock = {
  category: "",
  desc: "",
  image: "",
  price: "",
  quantity: "",
  title: "",
  id: "1",
};

export const Dashboard = () => {
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [product, setProduct] = useState({});
  const { categoryID } = useParams();
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className="container">
        <h2>Admin Dashboard</h2>
        <div>
          <Button
            onClick={() => setCreateMode(true)}
            className="card_button"
            color="black"
            text="Create product"
          />
          <Button
            onClick={handleSignOut}
            className="card_button"
            color="red"
            text="Sign out"
          />
        </div>
        <Filters filters={category} urlParam="admin/dashboard" />
        {!categoryID && (
          <div className="products_container">
            {products.map((item) => (
              <ProductCard
                image={item.image}
                title={item.title}
                desc={item.desc}
                price={item.price}
                key={item.id}
                onClick={() => "addToCartHandler(item)"}
                quantity={item.quantity}
                item={item}
                editMode={true}
                setProduct={setProduct}
                setEditMode={setEditMode}
              />
            ))}
          </div>
        )}
      </div>
      {editMode && (
        <Modal onClick={setEditMode}>
          <UpdateForm item={product} setEditMode={setEditMode} />
        </Modal>
      )}
      {createMode && (
        <Modal onClick={setCreateMode}>
          <UpdateForm item={mock} setEditMode={setCreateMode} createMode />
        </Modal>
      )}
      <Footer />
    </div>
  );
};
