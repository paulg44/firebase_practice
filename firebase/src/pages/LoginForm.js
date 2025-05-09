import React, { useState } from "react";
import "../css/loginForm.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth.js";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const { login } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();

    const result = await login(email, password);
    if (result.success) {
      navigate("/home");
    } else {
      setErrors(result.error || "Login Failed");
    }
  }

  return (
    <div className="loginFormContainer">
      <form className="loginForm">
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
        No account yet? <NavLink to="/">Sign Up</NavLink>
      </p>
    </div>
  );
}

export default LoginForm;
