// import React, { useEffect, useState } from "react";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from "../config/firebase.js";
// import { useNavigate } from "react-router-dom";

function Homepage() {
  // // Should I make the ID of the database the UID???
  // async function fetchAllDataTest() {
  //   try {
  //     const response = await fetch("/api/data");
  //     const data = await response.json();
  //     console.log(data);
  //     // setUserEmail(data[0].username);
  //   } catch (error) {
  //     console.error("Error fetching data from DB");
  //   }
  // }

  return (
    <div>
      <h2>Auth & Stripe Testing Homepage</h2>
      <p>
        If you see this page you have successfully registered and logged in to
        this application. Please follow the instruction below to test the stripe
        payment system if you wish
      </p>
    </div>
  );
}

export default Homepage;
