const { Router } = require("express");
const authentication = require("../authentication");
const id = "18gnDk9yLRqjN4mk2eCP-Zu9BCt5vvv-3cgCCz7L7Z8w";

const sheetToObjects = require("../sheetToObjects");

const getter = require("../sheetGetter");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const fullSpreadsheet = await getter("players");
    const listOfPlayerObs = sheetToObjects(fullSpreadsheet);
    res.send(listOfPlayerObs);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get("/gigs-of-player/:pid", async (req, res) => {
  const playerId = req.params.pid;

  try {
    const allPlayerGigs = await getter("playerGigs");

    const gigIdsOfPlayer = allPlayerGigs.reduce((gigs, nextRow) => {
      if (nextRow[1] === playerId) {
        gigs.push(nextRow[2]);
      }
      return gigs;
    }, []);

    const allGigs = await getter("gigs");
    const gigObs = sheetToObjects(allGigs);
    const gigsOfPlayer = gigObs.filter((gig) =>
      gigIdsOfPlayer.includes(gig.id)
    );

    res.send(gigsOfPlayer);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get("/cancel-gig/:pid/:gigId", async (req, res) => {
  const gigId = req.params.gigId;
  const playerId = req.params.pid;

  try {
    const allPlayerGigs = await getter("playerGigs");
    let row;

    for (let pg of allPlayerGigs) {
      if (pg[1] === playerId && pg[2] === gigId)
        row = allPlayerGigs.indexOf(pg) + 1;
    }

    const sheets = await authentication();
    sheets.spreadsheets.values.clear({
      spreadsheetId: id,
      range: `playerGigs!${row}:${row}`,
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
