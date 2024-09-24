import React, { useEffect, useState } from "react";
import "../css/homepage.css";

function Homepage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProductsFromStripe = async () => {
      try {
        const stripeResponse = await fetch(
          "http://localhost:3000/get-all-items"
        ).then((productData) => {
          return productData.json();
        });
        setProducts(stripeResponse);
        console.log(stripeResponse);
      } catch (error) {
        console.error("Error fetching data client side", error);
      }
    };
    fetchAllProductsFromStripe();
  }, []);

  async function handleStripeCheckout(price_id) {
    try {
      const stripeCheckoutResponse = await fetch(
        "http://localhost:3000/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price_id,
          }),
        }
      );

      const session = await stripeCheckoutResponse.json();
      if (session.url) {
        window.location.href = session.url;
      }
    } catch (error) {
      console.error("Error checking out product", error);
    }
  }

  return (
    <div className="homepage">
      <div className="itemsContainer">
        {products.map((item) => (
          <div key={item.id} className="itemCard">
            <h3>{item.name}</h3>
            <img src={item.images[0]} alt={item.name} />
            <p>{item.description}</p>
            <button
              type="submit"
              className="shopCardBtn"
              onClick={() => handleStripeCheckout(item.default_price)}
            >
              Buy for £{item.metadata.clientPrice}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
