const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

// create a schema
const answerSchema = new Schema(
  {
    _question: { type: ObjectId, required: true, ref: "Question" },
    _createdBy: { type: String, required: true },
    text: { type: String, required: true }
  },
  { timestamps: true, strict: true }
);

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
