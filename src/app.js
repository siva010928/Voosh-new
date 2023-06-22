import express from "express";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cors from "cors";

const app = express();

if (process.env.NODE_ENV === "DEV") app.use(morgan("dev"));

app.use(cors());

// Body parser
app.use(express.json({ limit: "10kb" }));

// Middleware
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);

export default app;
