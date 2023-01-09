const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const { deleteFile } = require("../middlewares/FileHandler");
const bill = require("../models/billModel");
const {
  authenticateGoogle,
  uploadToGoogleDrive,
} = require("../services/GoogleDriveServices");

// Done
exports.getAllBill = (req, res, next) => {
  bill
    .find()
    .then((resp) => {
      resp.length === 0 && res.status(200).json("Data masih kosong");
      return res.status(200).json(resp);
    })
    .catch((err) => {
      return res.status(400).json("Error!");
    });
};

exports.getBillById = (req, res, next) => {
  bill
    .findById(req.params.id)
    .then((resp) => {
      if (resp.length === 0)
        return res.status(200).json("Data tidak ditemukan!");
      return res.status(200).json(resp);
    })
    .catch((err) => {
      return res.status(400).json("Error!");
    });
};

// Done
exports.createBill = async (req, res, next) => {
  // const data = { ...req.body };
  // let bill = JSON.parse(data.bill);

  bill
    .create({
      id_reservasi: req.params.id_res,
      total_harga: req.body.total_harga,
      jaminan: req.body.jaminan,
      s_pembayaran: req.body.s_pembayaran,
      s_reservasi: req.body.s_reservasi,
      metode_pembayaran: req.body.metode_pembayaran,
      bukti_pembayaran: null,
    })
    .then((resp) => res.status(201).json(resp))
    .catch((err) => res.status(500).json(err));
};

exports.updateBill = async (req, res, next) => {
  try {
    const bills = bill.findById(req.params.id);
    if (!req.file) {
      res.status(400).json("No file uploaded.");
      return;
    }
    if (!bills) {
      res.status(400).json("Wrong Data!.");
      return;
    }
    const auth = authenticateGoogle();
    const response = await uploadToGoogleDrive(req.file, auth);
    bill
      .findOneAndUpdate(
        { _id: req.params.id },
        { bukti_pembayaran: response.data.id }
      )
      .then((resp) => {
        return res.status(200).json(resp);
      })
      .catch((err) => {
        return res.status(300).json(err);
      });
    deleteFile(req.file.path);
  } catch (err) {
    console.log(err);
    // res.status(500).json({ message: "No file uploaded.", data: err });
  }
};
