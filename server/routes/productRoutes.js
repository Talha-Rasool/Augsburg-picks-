import express from "express";
const router = express.Router();
import Product from "../models/Product.js";

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//module.exports = router;
export default router; // This is the critical line
