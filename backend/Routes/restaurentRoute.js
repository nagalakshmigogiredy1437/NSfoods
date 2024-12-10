const express = require("express");
const restaurentController = require("../controllers/restaurentController");
const verifyToken = require("../middleware/Verifytoken");

const router = express.Router();

router.post("/addRest", verifyToken, restaurentController.addRestaurent);
router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.headersSent("Content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "uploads", imageName));
});
router.post("/:restId", restaurentController.deleteRestaurentById);

module.exports = router;
