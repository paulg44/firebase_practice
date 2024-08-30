import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./config/firebase.js";
import SignUpForm from "./pages/SignUpForm.js";
import LoginForm from "./pages/LoginForm.js";
import Homepage from "./pages/Homepage.js";
import NavBar from "./components/NavBar.js";
import Success from "./pages/Success.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState("Login");
  const [userEmail, setUserEmail] = useState("Guest");

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        // navigate("/login");
        setIsLoggedIn("Login");
        setUserEmail("Guest");
        console.log("Signed out successfully");
      })
      .catch(() => {
        console.log("error signing out");
      });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setIsLoggedIn("Logout");
        setUserEmail(user.displayName);
        // fetchAllDataTest();
        console.log("uid", uid, user);
        // Retrieve ID token?
      } else {
        console.log("user is logged out");
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <NavBar
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        handleLogOut={handleLogOut}
      />
      <Routes>
        <Route path="/home" element={<Homepage />}></Route>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/home/success"
          element={<Success userEmail={userEmail} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
