import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import pkg from "pg";
import { userRoutes } from "./routes.js";
import stripe from "stripe";

dotenv.config();

const Stripe = new stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

const { Pool } = pkg;

const app = express();

const PORT = process.env.REACT_APP_PORT;
const connectionString = process.env.REACT_APP_DB_STRING;

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api", userRoutes);

app.post("/create-checkout-session", async (req, res) => {
  const { price_id, quantity } = req.body;
  try {
    const session = await Stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ["GB"],
      },
      line_items: [
        {
          price: price_id,
          quantity: quantity,
        },
      ],
      mode: "payment",
      // Stay on landing page after redirect?
      success_url: "http://localhost:3000/home/success",
      cancel_url: `http://localhost:3000/home`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session in server", error);
    res.status(500).send("Error creating checkout session");
  }
});

app.get("/get-all-items", async (req, res) => {
  try {
    const products = await Stripe.products.list({
      limit: 10,
    });
    const prices = await Stripe.prices.list({ limit: 10 });

    const filterProducts = products.data.filter((item) => {
      const itemPrice = prices.data.find(
        (price) => price.id === item.default_price
      );
      return itemPrice ? itemPrice.type !== "recurring" : true;
    });

    const productsWithPrices = filterProducts.map((item) => {
      const itemPrice = prices.data.find(
        (price) => price.id === item.default_price
      );
      return {
        ...item,
        default_price: itemPrice ? itemPrice.id : null,
        metadata: {
          ...item.metadata,
          clientPrice: itemPrice
            ? (itemPrice.unit_amount / 100).toFixed(2)
            : "N/A",
        },
      };
    });

    res.json(productsWithPrices);
  } catch (error) {
    console.error("Error fetching data server side", error);
    res.status(500).send("Error fetching data in server");
  }
});

// Subscriptions
app.get("/get-subscription-items", async (req, res) => {
  try {
    const subscriptionProducts = await Stripe.products.list({
      limit: 4,
    });

    res.json(subscriptionProducts);
  } catch (error) {
    console.error("Error fetching subscription items", error);
    res.status(500).send("Error fetching subscriptions in server");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
