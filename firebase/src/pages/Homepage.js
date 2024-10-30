import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/homepage.css";

function Homepage() {
  const [products, setProducts] = useState([]);
  const [itemQuantity, setItemQuantity] = useState(1);

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

  async function handleStripeCheckout(price_id, quantity) {
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
            quantity,
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
        <h2>Single Sale Items/with quantity</h2>
        <div className="itemCardsContainer">
          {products.map((item) => (
            <div key={item.id} className="itemCard">
              <h3>{item.name}</h3>
              <img src={item.images[0]} alt={item.name} />
              <p>{item.description}</p>
              <button
                type="submit"
                className="shopCardBtn"
                onClick={() =>
                  handleStripeCheckout(item.default_price, itemQuantity)
                }
              >
                Buy for £{item.metadata.clientPrice}
              </button>
              <button
                disabled={itemQuantity === 1}
                onClick={() => setItemQuantity(itemQuantity - 1)}
                type="button"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max="10"
                value={itemQuantity}
                name="Item Quantity"
                readOnly
              />
              <button
                disabled={itemQuantity === 10}
                onClick={() => setItemQuantity(itemQuantity + 1)}
                type="button"
              >
                +
              </button>
            </div>
          ))}
        </div>
        <Link to="/subscriptions">Go to subscriptions</Link>
      </div>
    </div>
  );
}

export default Homepage;
