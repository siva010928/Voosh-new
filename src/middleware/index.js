import admin from "../config/firebase-config.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

class Middleware {
  async decodeToken(req, res, next) {
    const [loginType, token] = req.headers.authorization.split(" ");
    if (loginType === "googleOAUTH") {
      try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        if (decodeValue) {
          req.user = decodeValue;
          const user = await User.findOne({ email: req.user.email });
          if (!user) {
            return res.status(401).json({ error: "User not found" });
          }
          req.userId = user._id;
          return next();
        }
        return res.status(401).json({ error: "Un authorized" });
      } catch (e) {
        return res.status(500).json({ error: "Internal Error" });
      }
    } else if (loginType === "basic") {
      if (!token) {
        return res
          .status(401)
          .json({ error: "Authorization token not provided" });
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Invalid token" });
        }
        req.userId = decoded.userId;
        next();
      });
    }
  }
}

export default new Middleware();
