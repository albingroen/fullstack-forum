const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./db");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/questions", require("./routes/questions"));
app.use("/", require("./routes/question"));
app.use("/", require("./routes/answer"));

app.listen(5000, () => {
  console.log("Running on port 5000");
});
