const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

//names of routes in index.js
//1. get routes for data (res.json) read file and send
router.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) return res.json(err);
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

//2.post route. get new note and save to db json. res.json(anything)

module.exports = router;

//use as refference
fs.readFile("./db/reviews.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    // Convert string into JSON object
    const parsedReviews = JSON.parse(data);

    // Add a new review
    parsedReviews.push(newReview);

    // Write updated reviews back to the file
    fs.writeFile(
      "./db/reviews.json",
      JSON.stringify(parsedReviews, null, 4),
      (writeErr) =>
        writeErr
          ? console.error(writeErr)
          : console.info("Successfully updated reviews!")
    );
  }
});
