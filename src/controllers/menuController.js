const { validationResult } = require("express-validator");
const menu = require("../models/menuModel");

// Done
exports.getAllMenu = (req, res, next) => {
  menu
    .find()
    .then((resp) => {
      return res.status(200).json(resp);
    })
    .catch((err) => {
      return res.status(400).json("Error!");
    });
};

// Done
exports.createMenu = (req, res, next) => {
  const title = req.body.title;
  const jenis = req.body.jenis;
  const harga = req.body.harga;
  const deskripsi = req.body.deskripsi;
  const img = req.body.img;

  const err = validationResult(req);

  if (!err.isEmpty()) {
    const error = new Error("Invalid Data input");
    error.status = 400;
    error.data = err.errors;
    throw error;
  }

  const createMenu = new menu({
    title: title,
    jenis: jenis,
    harga: harga,
    deskripsi: deskripsi,
    img: img,
  });

  createMenu
    .save()
    .then((resp) => {
      res.status(201).json(resp);
    })
    .catch((err) => {
      res.status(401).json("Error!");
    });
};
