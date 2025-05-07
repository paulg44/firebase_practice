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
  useEffect(() => {
    useAuth.getState().initializeAuthListener();
  }, []);

  const { user, isLoading } = useAuth();

  // const ProtectRoute = ({ children }) => {
  //   const { isLoggedIn, user } = useAuth();
  //   if (!isLoggedIn && !user) {
  //     return <Navigate to="login" replace />;
  //   }

  //   return children;
  // };

  // const AuthenticatedUserRoute = ({ children }) => {
  //   const { isLoggedIn, user } = useAuth();
  //   if (isLoggedIn && user) {
  //     return <Navigate to="home" replace />;
  //   }

  //   return children;
  // };

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/home"
          element={
            // <ProtectRoute>
            <Homepage />
            // </ProtectRoute>
          }
        ></Route>
        <Route
          path="/"
          element={
            // <AuthenticatedUserRoute>
            <SignUpForm />
            // </AuthenticatedUserRoute>
          }
        />
        <Route
          path="/login"
          element={
            // <AuthenticatedUserRoute>
            <LoginForm />
            // </AuthenticatedUserRoute>
          }
        />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/basket" element={<Basket />} />
        <Route
          path="/home/success"
          element={<Success userEmail={user ? user.displayName : "Guest"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
