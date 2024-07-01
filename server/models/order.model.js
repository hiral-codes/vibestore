import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  orderPrice: {
    type: String,
    required: true,
  },
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  orderItems: {
    type: [orderItemSchema],
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: [
      "PENDING",
      "ACCEPTED",
      "CANCELLED",
      "READY TO SHIP",
      "SHIPPED",
      "OUT OF DELEVERY",
      "DELEVERED",
    ],
    default: "PENDING",
  },
});

export const Order = mongoose.model("Orders", orderSchema);
