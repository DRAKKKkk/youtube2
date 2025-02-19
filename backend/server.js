import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}));

// app.get("/", (req, res) => {
//   res.send("YouTube Clone API is running!");
// });

app.get("/", (req, res) => {
  res.send("YouTube Clone API is running!");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});
// Import Routes
import loginRoutes from "./routes/loginRoutes.js";
import registerRoutes from "./routes/registerRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";

// Use Routes
app.use("/api/login", loginRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));