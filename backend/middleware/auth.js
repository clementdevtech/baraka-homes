import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  //console.log("🔍 Incoming Authorization Header:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Malformed token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log("✅ JWT Decoded:", decoded);

    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      console.warn("⚠️ Token valid but user not found in DB");
      return res.status(401).json({ message: "Invalid token" });
    }

    /*console.log("👤 Authenticated User:", {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role,
    });*/

    next();
  } catch (err) {
    console.error("❌ JWT Verification Error:", err.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const adminMiddleware = (req, res, next) => {
  if (req.user?.role !== "admin") {
    console.warn("🚫 Forbidden: Non-admin tried to access admin route", {
      user: req.user?.email,
      role: req.user?.role,
    });
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
