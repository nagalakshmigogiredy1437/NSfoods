const Product = require("../models/ProductSchema");
const Restaurent = require("../models/RestaurentSchema");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage: storage });

const addProducts = async (req, res) => {
  try {
    const { productName, price, category, bestseller, description } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const restId = req.params.restId;
    const restaurent = await Restaurent.findById({ _id: restId });
    if (!restaurent) {
      return res.status(401).json({ message: "restaurent not found" });
    }

    const product = new Product({
      productName,
      price,
      image,
      category,
      bestseller,
      description,
      restaurent: restaurent._id,
    });
    const saveProduct = await product.save();
    restaurent.product.push(saveProduct);
    await restaurent.save();
    return res.status(200).json({ saveProduct });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal server Error" });
  }
};

const getProductByRest = async (req, res) => {
  try {
    const restId = req.params.restId;
    const restaurent = await Restaurent.findById({ _id: restId }).populate(
      "product"
    );
    if (!restaurent) {
      return res.status(401).json({ message: "restaurent not found" });
    }
    const restName = restaurent.restName;
    const products = await Product.find({ restaurent: restId });
    return res.status(200).json({ restName, products });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal server Error" });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete({ _id: productId });
    if (!deletedProduct) {
      return res.status(401).json({ message: "product not found" });
    }
    return res.status(200).json({ success: "product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal server Error" });
  }
};
const allProducts = async (req, res) => {
  try {
    const allproducts = await Product.find();
    if (!allproducts) {
      return res.status(401).json({ message: "products not found" });
    }
    return res.status(200).json({ allproducts });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal server Error" });
  }
};

module.exports = {
  addProducts: [upload.single("image"), addProducts],
  getProductByRest,
  deleteProductById,
  allProducts,
};
