import User from "../models/user.js";
import jwt from "jsonwebtoken";
import admin from "../config/firebase-config.js";

const userExists = async (req, res, next) => {
  const token = req.query.token;
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (decodeValue) {
      req.user = decodeValue;
      const user = await User.findOne({ email: req.user.email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      req.userId = user.userId;
      return res
        .status(200)
        .json({ type: "googleOAUTH", token, message: "User Exists" });
    }
    return res.status(401).json({ error: "Un authorized" });
  } catch (e) {
    return res.status(500).json({ error: "Internal Error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const newUser = await User.create({ name, email, phoneNumber, password });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
    res
      .status(201)
      .json({ type: "basic", token, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { emailOrPhone, password, login_by } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ type: "basic", token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export { createUser, loginUser, userExists };
