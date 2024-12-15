// const { google } = require("googleapis");
// const oauth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_CLIENT_ID_NODEMAILER, // Client ID untuk Nodemailer
//   process.env.GOOGLE_CLIENT_SECRET_NODEMAILER, // Client Secret untuk Nodemailer
//   "http://localhost:5000/cultivo/api/oauth2callback" // Redirect URI
// );

// // Mengatur refresh token dari .env
// oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// // Fungsi untuk memperbarui access token menggunakan refresh token
// async function getNewAccessToken() {
//   try {
//     const { credentials } = await oauth2Client.refreshAccessToken();
//     console.log("New Access Token:", credentials.access_token);
//     return credentials.access_token;
//   } catch (error) {
//     console.error("Error refreshing access token:", error);
//     throw error;
//   }
// }

// // Ekspos fungsi untuk digunakan di tempat lain
// module.exports = {
//   getNewAccessToken,
//   oauth2Client,
// };
