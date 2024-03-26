const express = require("express");
const router = express.Router();
const path = require("path");

//route to get root page
router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

//route to get notes.html
router.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/notes.html"))
);

module.exports = router;
