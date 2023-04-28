const { Router } = require("express");
const authentication = require("../authentication");
const id = "18gnDk9yLRqjN4mk2eCP-Zu9BCt5vvv-3cgCCz7L7Z8w";

const sheetToObjects = require("../sheetToObjects");

const getter = require("../sheetGetter");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const fullSpreadsheet = await getter("dressCodes");
    const listOfDressCodeObs = sheetToObjects(fullSpreadsheet);
    res.send(listOfDressCodeObs);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get("/:gigId", async (req, res) => {
  try {
    const gigId = req.params.gigId;
    const fullGigs = await getter("gigs");
    const gigDress = sheetToObjects(fullGigs).find(
      (gig) => gig.id === gigId
    ).dress;

    const fullDress = await getter("dressCodes");

    const dressToReturn = fullDress.slice(1).reduce((dressDeets, nextRow) => {
      if (nextRow[0] === gigDress) {
        dressDeets = nextRow.slice(1);
      }
      return dressDeets;
    }, []);

    res.send(dressToReturn);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

module.exports = router;
