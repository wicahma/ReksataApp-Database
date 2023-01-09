const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Done? I guess
const Menu = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    jenis: {
      type: Boolean,
      required: true,
    },
    harga: {
      type: Number,
      required: true,
    },
    deskripsi: {
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

module.exports = mongoose.model("menu", Menu);
