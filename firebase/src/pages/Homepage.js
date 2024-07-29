import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  function handleLogOut(e) {
    signOut(auth)
      .then(() => {
        navigate("/");
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
        console.log("uid", uid);
      } else {
        console.log("user is logged out");
      }
    });
  });
  return (
    <div>
      <h2>Welcome Home</h2>

      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
}

export default Homepage;
