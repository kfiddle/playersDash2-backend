const { Router } = require("express");
const authentication = require('../authentication');
const id = "18gnDk9yLRqjN4mk2eCP-Zu9BCt5vvv-3cgCCz7L7Z8w";


const router = Router();

router.get("/", async (req, res) => {
  try {
    const sheets = await authentication();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: id,
      range: "players",
    });

    const fullSpreadsheet = response.data.values;
    const propsRow = fullSpreadsheet.shift();

    const listOfPlayerObs = fullSpreadsheet.reduce((list, playerRow) => {
      let playerOb = {};

      for (let j = 0; j < propsRow.length; j++) {
        playerOb[propsRow[j]] = playerRow[j];
      }
      list.push(playerOb);
      return list;
    }, []);

    res.send(listOfPlayerObs);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

module.exports = router;
