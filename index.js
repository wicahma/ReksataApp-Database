const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const reservRouter = require("./src/routes/reservRouter");
const menuRouter = require("./src/routes/menuRouter");
const setupRouter = require("./src/routes/setupLocationRouter");
const billRouter = require("./src/routes/billRouter");
const DB_Connect = require("./src/configs/db");

DB_Connect();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/", reservRouter);
app.use("/", menuRouter);
app.use("/", setupRouter);
app.use("/", billRouter);

app.use((error, req, res, next) => {
  const data = error.data;
  const status = error.status || 500;
  const message = error.message;
  res.status(status).json({
    message: message,
    data: data,
  });
});

app.listen(PORT, () => {
  console.log("Server Up!, Listening on port " + PORT);
  console.log("Establishing connection to database, please wait...");
});
