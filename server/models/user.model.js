import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNo: { type: String },
  alternativeMobile: { type: String },
  dob: { type: Date },
  address: { type: String },
  pincode: { type: String },
  role: { type: String },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  wishlist: [{ type: mongoose.Schema.ObjectId, ref: "Product" }]
});

export default mongoose.model("User", userSchema);
