const express = require("express");
const router = express.Router();
const Question = require("../schemas/question");

router.route("/").get((req, res) => {
  Question.find({}, (err, questions) => {
    if (err) throw err;

    res.json({ message: "Success", questions: questions });
  });
});

module.exports = router;
