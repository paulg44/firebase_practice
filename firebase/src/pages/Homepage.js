import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase.js";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState("Login");
  const [userEmail, setUserEmail] = useState("");

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        navigate("/login");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log("error signing out");
      });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setIsLoggedIn("Logout");
        setUserEmail(user.displayName);
        console.log("uid", uid);
      } else {
        console.log("user is logged out");
      }
    });
  });
  return (
    <div>
      <h2>Welcome Home</h2>

      {/* This would be a username in a production application */}
      <p>{userEmail}</p>

      <button onClick={handleLogOut}>{isLoggedIn}</button>
    </div>
  );
}

export default Homepage;
