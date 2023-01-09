const mongoose = require("mongoose");

const DB_Connect = async () => {
  try {
    const conn = await mongoose
      .set("strictQuery", false)
      .connect(process.env.DB_URI);
    console.log(`Host ${conn.connection.host} at port ${conn.connection.port}`);
    console.log("Database Connected!");
    console.log("waiting for whatsapp to connected, please wait again...");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = DB_Connect;
