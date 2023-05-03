const express = require("express");

const { google } = require("googleapis");

const playerRoutes = require("./routes/player-routes");
const dressCodeRoutes = require("./routes/dressCode-routes");
const libraryRoutes = require("./routes/library-routes");

const id = "18gnDk9yLRqjN4mk2eCP-Zu9BCt5vvv-3cgCCz7L7Z8w";

require('dotenv').config();
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/players", playerRoutes);
app.use("/dress-codes", dressCodeRoutes);
app.use("/library", libraryRoutes);

console.log(process.env);

app.listen(process.env.PORT || 5000);

// app.listen(5000, () => console.log("server is still running on 5000"));

// const authentication = async () => {
//   const auth = new google.auth.GoogleAuth({
//     keyFile: 'credentials',
//     scopes: "https://www.googleapis.com/auth/spreadsheets",
//   });

//   const client = await auth.getClient();

//   const sheets = google.sheets({
//     version: "v4",
//     auth: client,
//   });

//   return sheets;
// };

// const testGet = async () => {
//   try {
//     const sheets = await authentication();
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: id,
//       range: "gigs",
//     });
//     console.log(response.data);
//   } catch (e) {
//     console.log(e);
//   }
// };

// testGet();

// const testPost = async () => {
//   try {
//     const sheets = await authentication();
//     sheets.spreadsheets.values.append({
//       spreadsheetId: id,
//       range: "gigs",
//       valueInputOption: "USER_ENTERED",
//       resource: {
//         values: [["6", "2/8/2023", "Cirque", "Warner Theater"]],
//       },
//     });
//   } catch (e) {
//     console.log("error posting to our sheet");
//   }
// };
