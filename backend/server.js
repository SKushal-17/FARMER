require('dotenv').config(); // Load environment variables from .env file
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes for authentication
app.use("/auth", authRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send({ status: "Server is running" });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});