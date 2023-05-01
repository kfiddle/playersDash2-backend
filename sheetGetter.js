const authentication = require('./authentication');
// const authentication = require('./.env');
const id = "18gnDk9yLRqjN4mk2eCP-Zu9BCt5vvv-3cgCCz7L7Z8w";

const getter = async (tab) => {
  try {
    const sheets = await authentication();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: id,
      range: tab,
    });

    return response.data.values;
  } catch (e) {
    throw new Error("Could not retrieve list from google sheet");
  }
};

module.exports = getter;