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
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
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