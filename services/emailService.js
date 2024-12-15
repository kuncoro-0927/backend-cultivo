const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  // service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Cegah error sertifikat
  },
});

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Registration",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOTPEmail };
// sendEmail.js
// const nodemailer = require("nodemailer");
// const { oauth2Client } = require("../config/googleAuth");
// // const generateOTP = require("../controllers/EmailVerifyController"); // Mengimpor fungsi OTP

// // Fungsi untuk mengirim OTP ke email

// // const otp = generateOTP(); // Menghasilkan OTP baru

// const accessToken = await oauth2Client.getAccessToken(); // Mendapatkan access token dari OAuth2

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: "kuncorokhitan271@gmail.com", // Email pengirim
//     clientId: process.env.GOOGLE_CLIENT_ID_NODEMAILER,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET_NODEMAILER,
//     refreshToken: process.env.REFRESH_TOKEN,
//     accessToken: accessToken.token, // Menggunakan access token
//   },
// });

// // const mailOptions = {
// //   from: "YOUR_EMAIL@gmail.com",
// //   to: email, // Email penerima (email yang didaftarkan)
// //   subject: "Your OTP Code",
// //   text: `Your OTP code is: ${otp}`,
// // };

// const sendOTPEmail = async (email, otp) => {
//   const mailOptions = {
//     from: "kuncorokhitan271@gmail.com",
//     to: email,
//     subject: "Your OTP for Registration",
//     text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
//   };

//   await transporter.sendMail(mailOptions);
// };
// //   try {
// //     const info = await transporter.sendMail(mailOptions);
// //     console.log("OTP sent: " + info.response);
// //   } catch (error) {
// //     console.error("Error sending OTP:", error);
// //   }
// // };

// module.exports = sendOTPEmail;

// const nodemailer = require("nodemailer");
// const { getNewAccessToken } = require("../config/googleAuth"); // Mengimpor oauth2Client dari googleAuth.js

// // Fungsi untuk mengirim OTP email
// const sendOTPEmail = async (email, otp) => {
//   try {
//     // Mendapatkan token akses untuk autentikasi menggunakan OAuth2
//     const accessToken = await getNewAccessToken();

//     // Konfigurasi transporter Nodemailer menggunakan OAuth2
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: "kuncorokhitan271@gmail.com", // Email pengirim
//         clientId: process.env.GOOGLE_CLIENT_ID_NODEMAILER,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET_NODEMAILER,
//         refreshToken: process.env.REFRESH_TOKEN,
//         accessToken: accessToken.token, // Gunakan token akses yang didapat dari OAuth2
//       },
//     });

//     // Konfigurasi email
//     const mailOptions = {
//       from: "kuncorokhitan271@gmail.com",
//       to: email,
//       subject: "Your OTP for Registration",
//       text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
//     };

//     // Kirim email
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", info.response);
//   } catch (error) {
//     console.error("Error sending OTP email:", error);
//   }
// };

// module.exports = { sendOTPEmail };
// const nodemailer = require("nodemailer");
// const { getNewAccessToken } = require("../config/googleAuth");

// async function sendEmail() {
//   // Mendapatkan access token baru
//   const accessToken = await getNewAccessToken();

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: "kuncorokhitan271@gmail.com", // Email pengirim
//       clientId: process.env.GOOGLE_CLIENT_ID_NODEMAILER,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET_NODEMAILER,
//       refreshToken: process.env.REFRESH_TOKEN,
//       accessToken: accessToken, // Menggunakan access token yang baru
//     },
//   });

//   const mailOptions = {
//     from: "your-email@gmail.com", // Email pengirim
//     to: "recipient@example.com", // Email penerima
//     subject: "Test Email",
//     text: "This is a test email sent using Nodemailer and Google OAuth2.",
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent: " + info.response);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// }

// sendEmail();
