import Category from "../models/category.model.js";
import { Review, Product } from "../models/product.model.js";
import Cart from "../models/cart.model.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt'

// Create User
export const createUser = async (req, res) => {
  const {
    firstName, lastName, email, password, dob, mobileNo, alternativeMobile, address, pincode
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dob,
      mobileNo,
      alternativeMobile,
      address,
      pincode
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getCategory = async (req, res) => {
  try {
    const category = await Category.find();
    if (category.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSingleCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (category.length === 0) {
      return res.status(404).json({ message: "No category found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const postReview = async (req, res) => {
  const { userId, review, rating, productId } = req.body;
  try {
    const newReview = {
      userId,
      productId,
      review,
      rating
    };
    // Push the new review object directly to the product's reviews array
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $push: { reviews: newReview } },
      { new: true }
    ).populate('reviews.userId');

    res.status(201).json({ product: updatedProduct, message: "Review Posted" });
  } catch (error) {
    console.error("Error Posting Review:", error);
    res.status(400).json({ message: "Error Posting Review", error: error.message });
  }
};

export const getProductWithReviews = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId)
      .populate({
        path: 'reviews.userId',
        select: 'firstName lastName'
      });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error Fetching Product:", error);
    res.status(500).json({ message: "Error Fetching Product", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
    await User.findByIdAndUpdate(userId, { cart: cart._id });
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Error adding to cart' });
  }
}

export const createOrder = async (req, res) => {
  const { userId, address, orderItems, orderPrice } = req.body;
  try {
    // Create a new order
    const newOrder = new Order({
      orderPrice,
      customer: userId,
      orderItems,
      address,
    });

    // Save the order to database
    const savedOrder = await newOrder.save();

    // Remove items from the user's cart
    await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order' });
  }
}

// Add To wishlist

export const addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    // Check if the product is already in the user's wishlist
    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ error: 'Product already in wishlist' });
    }
    // Add productId to user's wishlist array
    user.wishlist.push(productId);
    await user.save();
    res.status(200).json({ message: 'Product added to wishlist successfully' });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ error: 'Error adding to wishlist' });
  }
}

export const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the product is in the user's wishlist
    if (!user.wishlist.includes(productId)) {
      return res.status(400).json({ error: 'Product not in wishlist' });
    }

    // Remove productId from user's wishlist array
    user.wishlist = user.wishlist.filter(item => item !== productId);
    await user.save();

    res.status(200).json({ message: 'Product removed from wishlist successfully' });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ error: 'Error removing from wishlist' });
  }
}



