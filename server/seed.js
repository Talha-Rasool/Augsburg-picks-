import "dotenv/config";
import mongoose from "mongoose";
import Product from "./models/Product.js";

const sampleProducts = [
  {
    name: "Nike Air ",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1740",
  },
  {
    name: "Keyboard",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1743862558324-64de6d680fbb?w=500",
  },
  {
    name: "Tablet",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1702390734475-d81dd8ae8fde?w=500",
  },
  {
    name: "Headphones",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1740",
  },
  {
    name: "Laptop wireless mouse",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1928",
  },
  {
    name: "Phones",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1616410011236-7a42121dd981?w=500",
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
