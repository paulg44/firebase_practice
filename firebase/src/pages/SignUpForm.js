import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase.js";

function SignUpForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function passwordChecker(password) {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (password.match(passwordRegex)) {
      return true;
    } else {
      setError(
        "Password must contain an uppercase letter, digit, special character and be 8 or more characters long."
      );
    }
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (passwordChecker(password)) {
      try {
        await createUserWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            const user = userCredential.user;

            updateProfile(user, {
              displayName: username,
            });
            navigate("/login");
            console.log(user);
          }
        );
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        console.log(errorCode, errorMessage);
      }
    }
  }

  return (
    <div>
      <form id="signUpForm">
        <label htmlFor="email">Enter Email</label>
        <input
          type="email"
          label="Email address"
          className="formInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="username">Enter Username</label>
        <input
          type="username"
          label="Username"
          className="formInput"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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