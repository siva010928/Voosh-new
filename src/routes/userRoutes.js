import express from "express";
import {
  createUser,
  loginUser,
  userExists,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/user-exists", userExists);
router.post("/add-user", createUser);
router.post("/login-user", loginUser);

export default router;
