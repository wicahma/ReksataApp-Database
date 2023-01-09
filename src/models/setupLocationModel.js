const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Done? I guess
const Setup = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("setup", Setup);
