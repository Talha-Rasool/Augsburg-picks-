//import mongoose, { Types } from "mongoose";
import express from "express";
import mongoose from "mongoose";
const { Types } = mongoose;
import Order from "../models/Order.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { customerName, products } = req.body;

  // Debug logging
  console.log("📦 Incoming order data:", { customerName, products });

  if (!customerName?.trim()) {
    return res.status(400).json({ message: "Customer name is required" });
  }

  try {
    // Create order with trimmed name
    const order = new Order({
      customerName: customerName.trim(),
      products: products.map((p) => ({
        productId: new Types.ObjectId(p.productId),
        quantity: p.quantity,
      })),
    });

    const savedOrder = await order.save();
    console.log("💾 Saved order:", savedOrder); // Debug log

    // Verify the order exists in DB
    const dbOrder = await Order.findById(savedOrder._id);
    console.log("🔍 Database verification:", dbOrder ? "Exists" : "Missing!");

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("❌ Order creation failed:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get order by customer name
router.get("/", async (req, res) => {
  const { customerName } = req.query;

  if (!customerName) {
    return res.status(400).json({ message: "Customer name is required" });
  }

  try {
    const orders = await Order.find({
      customerName: { $regex: customerName, $options: "i" },
    }).populate("products.productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE order by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//module.exports = router;
export default router; // This is the critical line
