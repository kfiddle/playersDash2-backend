const express = require("express");

const { google } = require("googleapis");
const { connectors } = require("googleapis/build/src/apis/connectors");

const playerRoutes = require('./routes/player-routes')

const id = "18gnDk9yLRqjN4mk2eCP-Zu9BCt5vvv-3cgCCz7L7Z8w";

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

const authentication = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const sheets = google.sheets({
    version: "v4",
    auth: client,
  });

  return sheets;
};

const testGet = async () => {
  try {
    const sheets = await authentication();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: id,
      range: "gigs",
    });
    console.log(response.data);
  } catch (e) {
    console.log(e);
  }
};

// testGet();

const testPost = async () => {
  try {
    const sheets = await authentication();
    sheets.spreadsheets.values.append({
      spreadsheetId: id,
      range: "gigs",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [["6", "2/8/2023", "Cirque", "Warner Theater"]],
      },
    });
  } catch (e) {
    console.log("error posting to our sheet");
  }
};

// const getterFunc = async(req, res) => {

// }

app.use('/players', playerRoutes)

// app.use("/players", async (req, res) => {
//   try {
//     const sheets = await authentication();
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: id,
//       range: "players",
//     });

//     const fullSpreadsheet = response.data.values;
//     const propsRow = fullSpreadsheet.shift();

//     const listOfPlayerObs = fullSpreadsheet.reduce((list, playerRow) => {
//       let playerOb = {};

//       for (let j = 0; j < propsRow.length; j++) {
//         playerOb[propsRow[j]] = playerRow[j];
//       }
//       list.push(playerOb);
//       return list;
//     }, []);

//     res.send(listOfPlayerObs);
//   } catch (e) {
//     console.log(e);
//     res.status(500).send();
//   }
// });

app.use("/playerGigs/:pid", async (req, res) => {
  const playerId = req.params.pid;

  try {
    const sheets = await authentication();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: id,
      range: "playerGigs",
    });

    const fullPlayerGigsList = response.data.values;
    const gigsOfPlayer = fullPlayerGigsList.reduce((gigs, nextRow) => {
      if (nextRow[1] === playerId) {
        gigs.push(nextRow[2]);
      }
      return gigs;
    }, []);

    console.log(gigsOfPlayer);
    console.log(playerId);
  } catch (e) {
    console.log(e);
  }
});

app.listen(5000, () => console.log("server is still running on 5000"));
