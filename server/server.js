dotenv.config();
import cors from "cors";
import express from "express";
import productRoutes from "./routes/productRoutes.js"; // Note .js extension
import orderRoutes from "./routes/orderRoutes.js";
import dotenv from "dotenv";
const app = express();
import connectDB from "./db/connection.js";
import "dotenv/config";

// Middleware
//app.use(cors());
// In server/server.js
//"http://localhost:3000"
app.use(
  cors({
    origin: "*",
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

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
