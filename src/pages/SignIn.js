import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // auth.currentUser.email
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log({ user });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="overlay_signin">
      <div className="container">
        <div className="signUp">
          <h1>Admin Sign In</h1>
          <form onSubmit={onSubmit}>
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
            />
            <button className="button" type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
