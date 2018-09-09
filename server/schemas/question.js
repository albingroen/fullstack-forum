const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

// create a schema
const questionSchema = new Schema(
  {
    _createdBy: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    tags: { type: Array, required: true, min: 1, max: 5 },
    likes: { type: Number, required: true }
  },
  { timestamps: true, strict: true }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
