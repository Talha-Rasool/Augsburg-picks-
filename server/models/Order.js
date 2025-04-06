import mongoose from "mongoose";

// 1. First define the schema
const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 2.  create the model
const Order = mongoose.model("Order", orderSchema);

// 3. Export the model as default
export default Order;
