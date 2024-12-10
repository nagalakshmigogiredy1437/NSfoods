const Restaurent = require("../models/RestaurentSchema");
const Vendor = require("../models/VendorSchema");
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

const addRestaurent = async (req, res) => {
  try {
    const { restName, area, category, region, offer } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const vendorId = await Vendor.findById(req.Vendorid);
    if (!vendorId) {
      return res.status(400).json({ message: "vendor not found" });
    }
    const restaurent = new Restaurent({
      restName,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendorId._id,
    });
    const saveRest = await restaurent.save();
    vendorId.restaurent.push(saveRest);
    await vendorId.save();

    return res.status(200).json({ message: "Restaurent added successfully" });
  } catch (e) {
    return res.status(400).json({ message: "Internal server Error" });
  }
};
const deleteRestaurentById = async (req, res) => {
  try {
    const restId = req.params.restId;
    const deletedRest = await Restaurent.findByIdAndDelete({ _id: restId });
    if (!deletedRest) {
      return res.status(401).json({ message: "restaurent not found" });
    }
    return res.status(200).json({ success: "restaurent deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal server Error" });
  }
};

module.exports = {
  addRestaurent: [upload.single("image"), addRestaurent],
  deleteRestaurentById,
};
