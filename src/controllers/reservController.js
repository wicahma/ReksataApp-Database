const { validationResult } = require("express-validator");
const reservasi = require("../models/reservModel");
// const { Client, LocalAuth, Buttons } = require("whatsapp-web.js");
// const client = require("../services/WhatsappClient");

// Done
exports.getAllReserv = (req, res, next) => {
  reservasi
    .find()
    .then((resp) => {
      if (resp.length === 0) return res.status(200).json(null);
      return res.status(200).json(resp);
    })
    .catch((err) => {
      return res.status(400).json("Error!");
    });
};

// Done
exports.getReservByID = (req, res, next) => {
  reservasi.findById(req.params.rid).then((resp) => {
    if (resp !== null) {
      res.status(200).json(resp);
    } else {
      res.status(404).json(resp);
    }
  });
};

// Done
exports.getReservByKey = (req, res, next) => {
  let tanggal = req.query.tanggal;
  !tanggal
    ? res.status(404).json(null)
    : reservasi.find({ tanggal: tanggal }).then((resp) => {
        resp.length === 0
          ? res.status(404).json(null)
          : res.status(201).json(resp);
      });
};

// Done
exports.createReserv = (req, res, next) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    const error = new Error("Invalid Input ID");
    error.status = 400;
    error.data = err.errors;
    throw error;
  }

  const createRes = new reservasi({
    nama: req.body.nama,
    nomor: req.body.nomor,
    jumlahOrang: req.body.jumlahOrang,
    tanggal: req.body.tanggal,
    mulaiRes: req.body.mulaiRes,
    selesaiRes: req.body.selesaiRes,
    pilihanRuangan: req.body.pilihanRuangan,
    opsionalRuangan: req.body.opsionalRuangan,
    makananID: req.body.makananID,
  });
  createRes
    .save()
    .then((resp) => {
      const messages = `*Piw piw, new reservation goes brrr*
      
- ID : ${resp._id}
- Nama : ${resp.nama}
- Nomor : ${resp.nomor}
- Jumlah Orang : ${resp.jumlahOrang}
- Tanggal : ${resp.tanggal}
- Mulai : ${resp.mulaiRes}
- Selesai : ${resp.selesaiRes}
- Pilihan Ruangan : ${resp.pilihanRuangan}
- Opsional Ruangan : ${resp.opsionalRuangan}
- Makanan ID : ${
        resp.makananID.length === 0
          ? "Tidak memesan makan!"
          : `Ada memesan makan!`
      }`;
      // const pengguna = client.sendMessage(`${resp.nomor}@c.us`, messages);
      // const barista = client.sendMessage(`6285751080434@c.us`, messages);
      return res.status(201).json({ id: resp._id });
    })
    .catch((err) => {
      return res.status(201).json(err);
    });
};

// Unfinished
exports.updateReserv = (req, res, next) => {
  const id = req.body.id;
  const nama = req.body.name;
  const nomor = req.body.nomor;
  const jumlahOrang = req.body.jumlahOrang;
  const tanggal = req.body.tanggal;
  const mulaiRes = req.body.mulaiRes;
  const selesaiRes = req.body.selesaiRes;
  const pilihanRuangan = req.body.pilihanRuangan;
  const opsionalRuangan = req.body.opsionalRuangan;
  const makananID = req.body.makananID;
  res.json({
    url: `${req.originalUrl}`,
    message: "Data Reservasi berhasil diupdate!",
    data: {
      id: id,
      nama: nama,
      nomor: nomor,
      jumlahOrang: jumlahOrang,
      tanggal: tanggal,
      mulaiRes: mulaiRes,
      selesaiRes: selesaiRes,
      pilihanRuangan: pilihanRuangan,
      opsionalRuangan: opsionalRuangan,
      makananID: makananID,
    },
  });
  next();
};

exports.deleteReserv = (req, res, next) => {
  const id = req.body.id;
  res.json({
    url: `${req.originalUrl}`,
    message: "Data Reservasi berhasil dihapus!",
    data: {
      id: id,
    },
  });
  next();
};
