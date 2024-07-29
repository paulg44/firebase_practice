import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { NavLink, useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    setErrors("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setErrors("Incorrect Email or Password");

        console.log(errorCode, errorMessage);
      });
  }

  return (
    <div>
      <form>
        <label htmlFor="email">Enter Email</label>
        <input
          type="email"
          label="Email address"
          className="formInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Enter Password</label>
        <input
          type="password"
          label="Password"
          className="formInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <p style={{ color: "red" }}>{errors}</p>

        <button type="submit" onClick={handleLogin}>
          Log In
        </button>
      </form>

      <p>
        No account yet? <NavLink to="/signup">Sign Up</NavLink>
      </p>
    </div>
  );
}

export default LoginForm;
