import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import pkg from "pg";
import { userRoutes } from "./routes.js";
import stripe from "stripe";
const Stripe = new stripe("");

dotenv.config();

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
  const session = await Stripe.Checkout.SessionsResource.create({
    line_items: [
      {
        price: process.env.REACT_APP_PRICE,
        // NOT SAFE
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${PORT}?success=true`,
    cancel_url: `${PORT}?cancelled=true`,
  });

  res.redirect(303, session.url);
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
