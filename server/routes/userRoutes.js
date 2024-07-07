import express from "express";
const router = express.Router();
import {
  getCategory,
  getProducts,
  getSingleCategory,
  getSingleProduct,
} from "../controllers/User.js";

router.get("/products", getProducts);
router.get("/products/:id", getSingleProduct);
router.get("/categories", getCategory);
router.get("/categories/:id", getSingleCategory);

export default router;
