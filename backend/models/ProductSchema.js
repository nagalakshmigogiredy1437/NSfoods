const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: [
      {
        type: String,
        enum: ["veg", "non-veg"],
      },
    ],
  },
  image: {
    type: String,
  },
  bestseller: {
    type: String,
  },
  description: {
    type: String,
  },
  restaurent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurents",
    },
  ],
});

module.exports = mongoose.model("products", productSchema);
