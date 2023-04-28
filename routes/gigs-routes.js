const { Router } = require("express");
const getter = require("../sheetGetter");
const sheetToObjects = require("../sheetToObjects");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const fullSpreadsheet = await getter("gigs");
    const listOfGigsObs = sheetToObjects(fullSpreadsheet);
    res.send(listOfGigsObs);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

module.exports = router;
