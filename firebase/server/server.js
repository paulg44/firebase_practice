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
  const session = await Stripe.checkout.sessions.create({
    line_items: [
      {
        price: process.env.REACT_APP_STRIPE_TEST_PRICE,
        // NOT SAFE
        quantity: 1,
      },
    ],
    mode: "payment",
    // Stay on landing page after redirect?
    success_url: `http://localhost:3001/home`,
    cancel_url: `http://localhost:3001/home`,
  });

  res.redirect(303, session.url);
});

app.post("/create-checkout-session/2ndProduct", async (req, res) => {
  const session = await Stripe.checkout.sessions.create({
    line_items: [
      {
        price: process.env.REACT_APP_STRIPE_TEST_PRICE_TWO,
        // NOT SAFE
        quantity: 1,
      },
    ],
    mode: "payment",
    // Stay on landing page after redirect?
    success_url: `http://localhost:3001/home`,
    cancel_url: `http://localhost:3001/home`,
  });

  res.redirect(303, session.url);
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
