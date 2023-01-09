const { Client, LocalAuth, Buttons } = require("whatsapp-web.js");
const qrcode = require("qrcode");
var now = new Date().toLocaleString();

const client = new Client({
  authStrategy: new LocalAuth(),
  restartOnAuthFail: true,
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process", // <- this one doesn't works in Windows
      "--disable-gpu",
    ],
  },
});

client.on("qr", (qr) => {
  qrcode.toDataURL(qr, (err, url) => {
    console.log("QR", url);
  });
});

client.on("authenticated", () => {
  console.log("---", `${now} Whatsapp is authenticated!`);
});

client.on("ready", () => {
  console.log("---", `${now} WhatsApp is ready!`);
});


client.on("auth_failure", function () {
  console.log("---", `${now} Auth failure, restarting...`);
});

client.on("disconnected", function () {
  console.log("---", `${now} Disconnected, goodbye...`);
  client.destroy();
  client.initialize();
});

client.initialize();

module.exports = client;
