import React, { useEffect, useState } from "react";
import "../css/homepage.css";

function Homepage() {
  // Stripe Product
  const ProductDisplay = () => {
    return (
      <section>
        <div className="product">
          <img
            src="https://plus.unsplash.com/premium_photo-1664304188646-47b168d698aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFuYW5hfGVufDB8fDB8fHww"
            alt="banana"
          />
          <div className="description">
            <h3>Buy this Banana</h3>
            <h5>£20</h5>
          </div>
        </div>
        <form
          action="http://localhost:3001/create-checkout-session"
          method="POST"
        >
          <button type="submit">Checkout</button>
        </form>
        <div className="product">
          <img
            src="https://plus.unsplash.com/premium_photo-1668772704261-b11d89a92bad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBwbGV8ZW58MHx8MHx8fDA%3D"
            alt="apple"
          />
          <div className="description">
            <h3>Buy this Apple</h3>
            <h5>£10</h5>
          </div>
        </div>
        <form
          action="http://localhost:3001/create-checkout-session/2ndProduct"
          method="POST"
        >
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

  const [message, setMessage] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation");
    }

    if (query.get("cancelled")) {
      setMessage("Order cancelled -- continue to shop around");
    }
  }, []);

  return (
    <div className="homepage">
      {message ? <Message message={message} /> : <ProductDisplay />}
    </div>
  );
}

export default Homepage;
