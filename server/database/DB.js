import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_DB_URI / "vibestore");
if (!connect) {
  console.log("Failed To Connect");
}
