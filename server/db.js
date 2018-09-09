const mongoose = require("mongoose");

const DB_USER = "admin" || process.env.DB_USER;
const DB_PASSWORD = "admin123" || process.env.DB_PASSWORD;
const DB_HOST = "ds151012.mlab.com:51012" || process.env.DB_HOST;
const DB_NAME = "example-forum" || process.env.DB_NAME;

const mongoUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

mongoose.connect(
  mongoUrl,
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to mongodb");
});

module.exports = db;
