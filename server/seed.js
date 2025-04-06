import "dotenv/config";
import mongoose from "mongoose";
import Product from "./models/Product.js";

const sampleProducts = [
  {
    name: "Earbuds",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=150",
  },
  {
    name: "Smart Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150",
  },
  {
    name: "Bluetooth Speaker",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=150",
  },
  {
    name: "Phone Charger",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=150",
  },
];

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log("Sample products inserted");

    mongoose.connection.close();
  })
  .catch((err) => console.error("Error:", err));
