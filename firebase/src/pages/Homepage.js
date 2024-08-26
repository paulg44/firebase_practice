import React, { useEffect, useState } from "react";

function Homepage() {
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
        <form
          action="http://localhost:3001/create-checkout-session"
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

  return message ? <Message message={message} /> : <ProductDisplay />;
}

export default Homepage;
