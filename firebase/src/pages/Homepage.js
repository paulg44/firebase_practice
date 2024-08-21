import React, { useEffect, useState } from "react";

function Homepage() {
  const [message, setMessage] = useState("");

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

  // Stripe Product
  const ProductDisplay = () => {
    return (
      <section>
        <div className="product">
          <img
            src="https://images.unsplash.com/photo-1515606378517-3451a4fa2e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW9uZXl8ZW58MHx8MHx8fDA%3D"
            alt="my money to display"
          />
          <div className="description">
            <h3>Buy this product</h3>
            <h5>£20</h5>
          </div>
        </div>
        <form action="/create-checkout-session" method="POST">
          <button type="submit">Checkout</button>
        </form>
      </section>
    );
  };

  // Stripe Message
  const Message = ({ message }) => {
    return (
      <section>
        <p>{message}</p>
      </section>
    );
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation");
    }

    if (query.get("cancelled")) {
      setMessage("Order cancelled -- continue to shop around");
    }
  }, []);

  return message ? (
    // <div>
    //   <h2>Auth & Stripe Testing Homepage</h2>
    //   <p>
    //     If you see this page you have successfully registered and logged in to
    //     this application. Please follow the instruction below to test the stripe
    //     payment system if you wish
    //   </p>

    // </div>

    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}

export default Homepage;
