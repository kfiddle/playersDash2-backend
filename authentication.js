const { google } = require("googleapis");

const authentication = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: "service_account",
      project_id: "playersdash",
      private_key_id: process.env.PRIVATE_KEY_ID,
      private_key: process.env.PRIVATE_KEY,
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    },
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();
  console.log(process.env);

  const sheets = google.sheets({
    version: "v4",
    auth: client,
  });

  return sheets;
};

module.exports = authentication;

