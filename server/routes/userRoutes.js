import express from "express";
const router = express.Router();
import { getCategory, getProducts, getSingleCategory } from "../controllers/User.js";

router.get("/products", getProducts);
router.get("/categories", getCategory);
router.get("/categories/:id", getSingleCategory);

export default router;
