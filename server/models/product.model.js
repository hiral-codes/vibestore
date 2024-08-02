import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    review: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true
    }
  },
  { timestamps: true }
);

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
    sizes: { type: Object },
    colours: { type: Object },
    price: { type: Number, required: true, default: 0 },
    stock: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const Review = mongoose.model("Reviews", reviewSchema);
const Product = mongoose.model("Product", productSchema);

export { Review, Product };
