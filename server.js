const express = require("express");

const { google } = require("googleapis");

const id = "18gnDk9yLRqjN4mk2eCP-Zu9BCt5vvv-3cgCCz7L7Z8w";

const app = express();
// app.use(express.json());

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

testPost();

app.use("/", async (req, res) => {
  try {
    const { sheets } = await authentication();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: id,
      range: "players",
    });
    res.send(response.data);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

app.listen(5000, () => console.log("server is still running on 5000"));
