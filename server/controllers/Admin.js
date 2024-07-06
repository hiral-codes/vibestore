import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import cloudinary from "../utils/cloudinary.js";

// Add Product
export const addProduct = async (req, res) => {
  const {
    title,
    brand,
    description,
    category,
    price,
    stock,
    rating,
    numberofReviews,
  } = req.body;
  try {
    let productImages = [];
    if (req.files) {
      const uploadPromises = req.files.map((file) => {
        return cloudinary.uploader.upload(file.path, {
          folder: "product_images",
        });
      });
      const results = await Promise.all(uploadPromises);
      productImages = results.map((result) => result.secure_url);
    }

    const newProduct = new Product({
      title,
      brand,
      description,
      productImages,
      category,
      price,
      stock,
      rating,
      numberofReviews,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Delete Product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    brand,
    description,
    category,
    price,
    stock,
    rating,
    numberofReviews,
  } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let productImages = product.productImages;
    if (req.files) {
      const uploadPromises = req.files.map((file) => {
        return cloudinary.uploader.upload(file.path, {
          folder: "product_images",
        });
      });
      const results = await Promise.all(uploadPromises);
      productImages = results.map((result) => result.secure_url);
    }

    product.title = title || product.title;
    product.brand = brand || product.brand;
    product.description = description || product.description;
    product.category = category || product.category;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.rating = rating || product.rating;
    product.numberofReviews = numberofReviews || product.numberofReviews;
    product.productImages = productImages;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }
  try {
    const category = new Category({ name });
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await category.deleteOne();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
