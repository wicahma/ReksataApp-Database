const fs = require("fs");
const { google } = require("googleapis");

const authenticateGoogle = () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: `${__dirname}/decoded-bulwark-355214-da9fe8f95135.json`,
    scopes: "https://www.googleapis.com/auth/drive",
  });
  return auth;
};

async function generatePublicUrl(fileId, drive) {
  try {
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    const result = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink",
    });
    return result;
  } catch (err) {
    console.log(err);
  }
}

const uploadToGoogleDrive = async (file, auth) => {
  const fileMetadata = {
    name: file.originalname,
    parents: ["1i1YJrL3BUkEnE0qLEzizbmIEAVzY1pzJ"], 
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  const driveService = google.drive({ version: "v3", auth });

  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: "id",
  });
  const publicURL = generatePublicUrl(response.data.id, driveService);
  publicURL
    .then((res) => {
      console.log("data ID berhasil dibuat", res);
    })
    .catch((err) => {
      console.log("error, data id gagal dibuat", err);
    });
  return response;
};

module.exports = {
  authenticateGoogle,
  uploadToGoogleDrive,
};
