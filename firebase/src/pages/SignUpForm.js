import React, { useState } from "react";
import "../css/signUpForm.css";
import { NavLink, useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth } from "../config/firebase.js";
import { useAuth } from "../auth/useAuth.js";

function SignUpForm() {
  const navigate = useNavigate();
  const { signup, error } = useAuth();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  function passwordChecker(password) {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (password.match(passwordRegex)) {
      return true;
    } else {
      console.log(
        "Password must contain an uppercase letter, digit, special character and be 8 or more characters long."
      );
    }
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (passwordChecker(password)) {
      await signup(email, username, password);
      navigate("/login");
    }
  }

  return (
    <div className="signUpMain">
      <h2>Welcome to Auth/Stripe application</h2>
      <p>Description of site to go here</p>
      <form id="signUpForm">
        <label htmlFor="email">Enter Email</label>
        <input
          id="email"
          type="email"
          label="Email address"
          className="formInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          data-cy="emailInput"
        />
        <label htmlFor="username">Enter Username</label>
        <input
          id="username"
          type="username"
          label="Username"
          className="formInput"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          data-cy="usernameInput"
        />
        <label htmlFor="password">Enter Password</label>
        <input
          id="password"
          type="password"
          label="Password"
          className="formInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          data-cy="passwordInput"
        />

        <p style={{ color: "red" }}>{error}</p>

        <button type="submit" onClick={onFormSubmit}>
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <NavLink to="/login">Log in</NavLink>
      </p>
    </div>
  );
}

export default SignUpForm;
