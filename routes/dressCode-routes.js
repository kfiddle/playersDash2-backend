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
    console.log(gigId);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

module.exports = router;
