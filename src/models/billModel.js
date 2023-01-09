const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Done? I guess
const Bill = new Schema(
  {
    id_reservasi: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "reservasi",
    },
    total_harga: {
      type: Number,
      required: true,
    },
    jaminan: {
      type: Number,
      required: true,
    },
    s_pembayaran: {
      type: String,
      required: true,
    },
    s_reservasi: {
      type: String,
      required: true,
    },
    metode_pembayaran: {
      type: String,
      required: false,
    },
    bukti_pembayaran: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bill", Bill);
