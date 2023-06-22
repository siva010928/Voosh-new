import express from "express";
import { addOrder, getOrder } from "../controllers/orderController.js";
import middleware from "../middleware/index.js";

const router = express.Router();

router.post("/add-order", middleware.decodeToken, addOrder);
router.get("/get-order", middleware.decodeToken, getOrder);

export default router;
