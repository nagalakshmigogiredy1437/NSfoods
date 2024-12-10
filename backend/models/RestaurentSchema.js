const mongoose = require("mongoose");

const restaurentSchema = new mongoose.Schema({
  restName: {
    type: "String",
    required: "true",
    unique: "true",
  },
  area: {
    type: "String",
    required: "true",
  },
  category: {
    type: [
      {
        type: "String",
        enum: ["veg", "non-veg"],
      },
    ],
  },
  region: {
    type: [
      {
        type: "String",
        enum: ["south-indian", "north-indian", "chinese", "bakary"],
      },
    ],
  },
  offer: {
    type: "String",
  },
  image: {
    type: "String",
  },
  vendor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendors",
    },
  ],
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
});

module.exports = mongoose.model("restaurents", restaurentSchema);
