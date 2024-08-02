import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

// Connecting Database
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error Connecting DB:", error);
  }
};
