import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNo: { type: String },
  alternativeMobile: { type: String },
  dob: { type: Date },
  address: { type: String },
  pincode: { type: String },
});

module.exports = mongoose.model("User", userSchema);
