const { Buffer } = require("node:buffer");
const { google } = require("googleapis");
require("dotenv").config();


const creds = {
  type: "service_account",
  project_id: "playersdash",
  private_key_id: process.env.GOOGLE_CREDENTIALS.PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_CREDENTIALS.PRIVATE_KEY,
  client_email: "players-dashboard@playersdash.iam.gserviceaccount.com",
  client_id: "102575101957035391542",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/players-dashboard%40playersdash.iam.gserviceaccount.com",
};

const authentication = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: creds,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();
  console.log("client below");
  console.log(client);

  const sheets = google.sheets({
    version: "v4",
    auth: client,
  });

  return sheets;
};

module.exports = authentication;
