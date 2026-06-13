import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";

import connectdb from "./config/db.js";

import authRoute from "./routes/authRoute.js";
import jobRoute from "./routes/jobRoute.js";
import applicationRoute from "./routes/applicationRoute.js";
import profileRoute from "./routes/profileRoute.js";
  
dotenv.config();
connectdb();

const app = express();

/* ---------------- CORS CONFIG ---------------- */
const envOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((origin) => origin.trim()).filter(Boolean)
  : [];
const localDevOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
const allowedOrigins = [...new Set([...envOrigins, ...localDevOrigins])];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.json());

/* ---------------- STATIC FILES ---------------- */
const folders = [
  "uploads",
  "uploads/profiles",
  "uploads/banners",
  "uploads/resumes",
];

folders.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

app.use("/uploads", express.static("uploads"));

/* ---------------- ROUTES ---------------- */
app.use("/api/auth", authRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/applications", applicationRoute);
app.use("/api/profile", profileRoute);


/* ---------------- TEST ROUTE ---------------- */
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});