import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase.js";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState("Login");
  const [userEmail, setUserEmail] = useState("");
  // const [dbUID, setDbUID] = useState("");

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        navigate("/login");
        console.log("Signed out successfully");
      })
      .catch(() => {
        console.log("error signing out");
      });
  }

  // Should I make the ID of the database the UID???
  async function fetchAllDataTest() {
    try {
      const reponse = await fetch("/api/data");
      const data = await reponse.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data from DB");
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setIsLoggedIn("Logout");
        setUserEmail(user.displayName);
        fetchAllDataTest();
        console.log("uid", uid, user);
        // Retrieve ID token?
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
