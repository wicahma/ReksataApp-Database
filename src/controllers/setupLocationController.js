const { validationResult } = require("express-validator");
const setup = require("../models/setupLocationModel");

// Done
exports.getAllSetup = (req, res, next) => {
  setup
    .find()
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => {
      res.status(400).json("Error!");
    });
};

exports.createSetup = (req, res, next) => {
  const title = req.body.title;
  const img = req.body.img;

  const err = validationResult(req);

  if (!err.isEmpty()) {
    const error = new Error("Invalid Data input");
    error.status = 400;
    error.data = err.errors;
    throw error;
  }

  const createSetup = new setup({
    title: title,
    img: img,
  });

  createSetup
    .save()
    .then((resp) => {
      res.status(201).json(resp);
    })
    .catch((err) => {
      res.status(401).json("Error!");
    });
};
