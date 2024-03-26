const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

//get route for data (res.json) read file and send
router.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
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
    const newNote = {
      id: uuidv4(), // Generate UUID
      ...req.body, // Include other properties of the note
    };

    notes.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4), (writeErr) =>
      writeErr ? res.json(writeErr) : res.sendStatus(201)
    );
  });
});

//Deletes notes upon request
router.delete("/api/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read file." });

    const notes = JSON.parse(data);
    const filteredNotes = notes.filter((note) => note.id !== req.params.id);

    fs.writeFile(
      "./db/db.json",
      JSON.stringify(filteredNotes, null, 4),
      (writeErr) => {
        if (writeErr)
          return res.status(500).json({ error: "Failed to write file." });

        res
          .status(200)
          .json({
            message: "Note deleted successfully.",
            notes: filteredNotes,
          });
      }
    );
  });
});

module.exports = router;
