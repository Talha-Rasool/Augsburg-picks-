dotenv.config();
import cors from "cors";
import express from "express";
//import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js"; // Note .js extension
import orderRoutes from "./routes/orderRoutes.js";
import dotenv from "dotenv";
const app = express();
import connectDB from "./db/connection.js";
import "dotenv/config";

// Middleware
//app.use(cors());
// In server/server.js
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());
connectDB()
  .then(() => {
    // Start server only after DB connection
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.error("Failed to start:", err);
  });

// make seprate file for db connection.
// Database connection
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(async () => {
//     console.log("✅ MongoDB Connected to DB:", mongoose.connection.name);
//     console.log(
//       "📌 Collections:",
//       (await mongoose.connection.db.listCollections().toArray()).map(
//         (c) => c.name
//       )
//     );
//   })
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
