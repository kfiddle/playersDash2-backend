const { Router } = require("express");
const getter = require("../sheetGetter");
const sheetToObjects = require("../sheetToObjects");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const fullSpreadsheet = await getter("library");
    const libraryObs = sheetToObjects(fullSpreadsheet);
    res.send(libraryObs);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get("/:gigId", async (req, res) => {
  try {
    const gigId = req.params.gigId;
    const pieceGigs = await getter("pieceGigs");
    const pieceGigObs = sheetToObjects(pieceGigs);

    const gigPieceIds = pieceGigObs
      .filter((pieceGig) => pieceGig.gig_id === gigId)
      .map((pieceGig) => pieceGig.piece_id);

    const library = await getter("library");
    const piecesToReturn = sheetToObjects(library)
      .filter((piece) => gigPieceIds.includes(piece.id))
      .sort((piece1, piece2) => {
        if (piece1.order < piece2.order) return -1;
        if (piece1.order > piece2.order) return 1;
        return 0;
      });

    res.send(piecesToReturn);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

module.exports = router;
