import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();

app.use(bodyParser.json());
app.use(cors());
dotenv.config();

// Connecting Database
mongoose.connect(process.env.MONGO_DB_URI);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
