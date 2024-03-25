const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

//get route for data (res.json) read file and send
router.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    console.log(err);
    if (err) return res.json(err);
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

//get new note and save to db json. res.json(anything)
router.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) return res.json(err);
    const notes = JSON.parse(data);
    notes.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4), (writeErr) =>
      writeErr ? res.json(writeErr) : res.sendStatus(201)
    );
  });
});

module.exports = router;
