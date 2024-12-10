const jwt = require("jsonwebtoken");
const Vendor = require("../models/VendorSchema");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async function verifyToken(req, res, next) {
  try {
    const token = req.headers["token"];
    if (!token) {
      return res.status(200).json({ message: "Token is required" });
    }
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    const vendor = await Vendor.findById(tokenDecode.id);
    if (!vendor) {
      return res.status(400).json({ message: "vendor not found" });
    }
    req.Vendorid = vendor.id;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
