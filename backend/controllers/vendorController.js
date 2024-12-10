const Vendor = require("../models/VendorSchema.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const vendorRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const checkingEmail = await Vendor.find({ email });
    if (checkingEmail && checkingEmail.length > 0) {
      return res.status(400).json({ message: "this user already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const saveUser = new Vendor({
      username,
      email,
      password: hashPassword,
    });
    await saveUser.save();
    return res.status(200).json({ success: "user Register successfully" });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkEmailPass = await Vendor.findOne({ email });
    if (
      !checkEmailPass ||
      !(await bcrypt.compare(password, checkEmailPass.password))
    ) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }
    const token = jwt.sign({ id: checkEmailPass._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ success: "Login successfully", token, vendor: checkEmailPass });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server Error: " + e.message });
  }
};

const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("restaurent");
    return res.status(200).json({ vendors });
  } catch (e) {
    return res.status(400).json({ message: "Internal server Error" });
  }
};

const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById({ _id: req.params.vendorId }).populate(
      "restaurent"
    );
    if (!vendor) {
      return res.status(401).json({ message: "vendor not found" });
    }
    return res.status(200).json({ vendor });
  } catch (e) {
    return res.status(400).json({ message: "Internal server Error" });
  }
};
module.exports = { vendorRegister, vendorLogin, getAllVendors, getVendorById };
