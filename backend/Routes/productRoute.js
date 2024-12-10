const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/addProduct/:restId", productController.addProducts);
router.get("/:restId/products", productController.getProductByRest);
router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.headersSent("Content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "uploads", imageName));
});

router.delete("/:productId", productController.deleteProductById);
router.get("/all-products", productController.allProducts);

module.exports = router;
