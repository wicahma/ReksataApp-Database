const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Done? I guess
const Reservasi = new Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    nomor: {
      type: Number,
      required: true,
    },
    jumlahOrang: {
      type: Number,
      required: true,
    },
    tanggal: {
      type: String,
      required: true,
    },
    mulaiRes: {
      type: String,
      required: true,
    },
    selesaiRes: {
      type: String,
      required: true,
    },
    pilihanRuangan: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "setup",
    },
    opsionalRuangan: {
      type: String,
      required: false,
    },
    makananID: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("reservasi", Reservasi);
