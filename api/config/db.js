const mongoose = require("mongoose");

const dbURI = "mongodb://localhost:27017/game-on";

const options = {
  reconnectTries: 1, // Number.MAX_VALUE,
  poolSize: 10
};

mongoose.connect(dbURI, options).then(() => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

// require any models
// require("../models/MainSchema");