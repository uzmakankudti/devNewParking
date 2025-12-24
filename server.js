import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongooseConnection from "./mongo.js";
import appRoutes from "./routes/index.js";

// Load environment variables
dotenv.config();

// Create express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongooseConnection();

// Middlewares
app.use(cors()); // allow requests from frontend
app.use(express.json()); // read JSON body
app.use(express.urlencoded({ extended: true })); // read form data

// Routes
app.use("/api", appRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running fine 🚀",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
