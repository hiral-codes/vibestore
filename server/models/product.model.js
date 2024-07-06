import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    productImages: [
      {
        type: String,
      },
    ],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    price: { type: String, required: true, default: 0 },
    stock: {
      type: String,
      default: 0,
    },
    rating: { type: Number },
    numberofReviews: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
