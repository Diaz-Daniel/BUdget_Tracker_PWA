const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
//https://safe-ravine-76830.herokuapp.com/
const PORT = 3306 || process.env.PORT;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/Transaction";

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Transaction", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

//heroku link: https://frozen-mountain-09300.herokuapp.com/
