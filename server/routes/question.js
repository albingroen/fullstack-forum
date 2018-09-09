const express = require("express");
const router = express.Router();
const Question = require("../schemas/question");
const ObjectId = require("mongodb").ObjectID;

router.get("/question/:id", (req, res) => {
  Question.findOne({ _id: ObjectId(req.params.id) }, (err, question) => {
    if (err) throw err;

    const likesCount = question.likes;

    res.json({ message: "Success", question: question });
  });
});

router.post("/question", (req, res) => {
  Question.create({
    _createdBy: req.body.createdBy,
    title: req.body.title,
    text: req.body.text,
    tags: req.body.tags,
    likes: 0
  });

  res.send("New question added...");
});

router.post("/question/add-like/:id", (req, res) => {
  Question.findOneAndUpdate(
    { _id: ObjectId(req.params.id) },
    { $inc: { likes: 1 } },
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );

  Question.findOne({ _id: ObjectId(req.params.id) }, (err, question) => {
    if (err) throw err;

    const likesCount = question.likes;

    res.json({ message: "Success", likes: question.likes });
  });
});

router.post("/question/remove-like/:id", (req, res) => {
  Question.findOneAndUpdate(
    { _id: ObjectId(req.params.id) },
    { $inc: { likes: -1 } },
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );

  Question.findOne({ _id: ObjectId(req.params.id) }, (err, question) => {
    if (err) throw err;

    const likesCount = question.likes;

    res.json({ message: "Success", likes: question.likes });
  });
});

module.exports = router;
