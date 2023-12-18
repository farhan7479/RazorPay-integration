import express from "express";
import { config } from "dotenv";
import paymentRoute from "./routes/paymentRoutes.js";
import cors from "cors";
import { connectDB } from "./config/database.js";
import Razorpay from "razorpay";

config({ path: "./config/config.env" });

connectDB();

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", paymentRoute);

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.KEY_ID })
);

export const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.SECRET_KEY,
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`Server is working on http://localhost:${PORT}`)
);
