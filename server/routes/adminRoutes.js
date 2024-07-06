import express from "express";
import multer from "../utils/multer.js";
import {
  addProduct,
  addCategory,
  deleteCategory,
  deleteProduct,
  updateProduct,
} from "../controllers/Admin.js";

const router = express.Router();

router.post("/add-product", multer.array("productImages", 10), addProduct);
router.delete("/delete-product/:id", deleteProduct);
router.patch("/update-product/:id", updateProduct);
router.post("/categories", addCategory);
router.delete("/categories/:id", deleteCategory);
export default router;
