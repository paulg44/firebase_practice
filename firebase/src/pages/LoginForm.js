import React, { useState } from "react";
import { parseActionCodeURL, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { NavLink, useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      navigate("/home");
      console.log(user);
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
