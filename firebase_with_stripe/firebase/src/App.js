import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./config/firebase.js";
import SignUpForm from "./pages/SignUpForm.js";
import LoginForm from "./pages/LoginForm.js";
import Homepage from "./pages/Homepage.js";
import NavBar from "./components/NavBar.js";
import Success from "./pages/Success.js";
import Basket from "./components/Basket.js";
import Subscriptions from "./pages/Subscriptions.js";
import { useAuth } from "./auth/useAuth.js";

function App() {
  const [loggedIn, setLoggedIn] = useState("Login");
  const [userEmail, setUserEmail] = useState("Guest");

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        setLoggedIn("Login");
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
        setLoggedIn("Logout");
        setUserEmail(user.displayName);
        console.log("uid", uid, user);
      } else {
        console.log("user is logged out");
      }
    });
  }, []);

  const ProtectRoute = ({ children }) => {
    const { isLoggedIn, user } = useAuth();
    if (!isLoggedIn && !user) {
      return <Navigate to="login" replace />;
    }

    return children;
  };

  const AuthenticatedUserRoute = ({ children }) => {
    const { isLoggedIn, user } = useAuth();
    if (isLoggedIn && user) {
      return <Navigate to="homepage" replace />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <NavBar
        isLoggedIn={loggedIn}
        userEmail={userEmail}
        handleLogOut={handleLogOut}
      />
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectRoute>
              <Homepage />
            </ProtectRoute>
          }
        ></Route>
        <Route
          path="/"
          element={
            <AuthenticatedUserRoute>
              <SignUpForm />
            </AuthenticatedUserRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthenticatedUserRoute>
              <LoginForm />
            </AuthenticatedUserRoute>
          }
        />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/basket" element={<Basket />} />
        <Route
          path="/home/success"
          element={<Success userEmail={userEmail} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
