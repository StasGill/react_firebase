import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./signUp.css";
import { auth } from "../firebase-config";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log({ user });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="overlay">
      <div className="container">
        <div className="signUp">
          <h1>SignUp</h1>
          <form onSubmit={onSubmit}>
            <label className="label">Name</label>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <label className="label">Email</label>
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Name"
            />
            <label className="label">Password</label>
            <input
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Name"
            />
            <button className="button" type="submit">
              SignUp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
