import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./database/DB.js";

const app = express();
dotenv.config();

connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
