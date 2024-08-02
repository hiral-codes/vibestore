import express from "express";
const router = express.Router();
import {
  addToCart,
  addToWishlist,
  createOrder,
  createUser,
  getCategory,
  getProducts,
  getProductWithReviews,
  getSingleCategory,
  postReview,
  removeFromWishlist
} from "../controllers/User.js";

router.get("/products", getProducts);
router.get("/product/:id", getProductWithReviews);
router.get("/categories", getCategory);
router.get("/categories/:id", getSingleCategory);
router.post("/post-review", postReview);
router.post("/register", createUser);
router.post("/add-to-cart", addToCart)
router.post("/add-to-wishlist", addToWishlist)
router.delete("/remove-from-wishlist", removeFromWishlist)
router.post("/check-out", createOrder)

export default router;
