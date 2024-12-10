const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  restaurent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurents",
    },
  ],
});
module.exports = mongoose.model("vendors", vendorSchema);
