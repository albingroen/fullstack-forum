const express = require("express");
const router = express.Router();
const Answer = require("../schemas/answer");

router.get("/answer/:id", (req, res) => {
  Answer.find({ _question: req.params.id }, (err, answers) => {
    if (err) throw err;

    res.json({ message: "Success", answers: answers });
  });
});

router.post("/answer", async (req, res, err) => {
  await Answer.create({
    _question: req.body.question,
    _createdBy: req.body.createdBy,
    text: req.body.text
  });

  res.json({ message: "Created new answer" });
});

module.exports = router;
