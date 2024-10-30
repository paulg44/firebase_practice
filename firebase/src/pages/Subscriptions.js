import { useEffect, useState } from "react";
import "../css/subscriptions.css";

function Subscriptions() {
  const [subscription, setSubscription] = useState([]);

  useEffect(() => {
    const fetchSubscriptionProducts = async () => {
      try {
        const subscriptionResponse = await fetch(
          "http://localhost:3000/get-subscription-items"
        ).then((subscriptionData) => {
          return subscriptionData.json();
        });
        setSubscription(subscriptionResponse.data);
        console.log(subscriptionResponse);
      } catch (error) {
        console.error(
          "Error fetching subscription products client side",
          error
        );
      }
    };
    fetchSubscriptionProducts();
  }, []);

  return (
    <div className="subscriptions">
      <h2>Welcome to your subscriptions</h2>
      <div className="subscriptionContainer">
        {subscription.map((sub) => (
          <div key={sub.id} className="subscriptionCard">
            <h3>{sub.name}</h3>
            <img src={sub.images[0]} alt={sub.name} />
            <p>{sub.description}</p>
            <button type="submit">Subscribe</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subscriptions;
