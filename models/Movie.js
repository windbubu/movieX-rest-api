const mongoose = require("mongoose");

//create a movie schema ,define data types for properties
const movieSchema = new mongoose.Schema({
  name: String,
  description: String,
  genre: [String],
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actor" }], //Define a relation to another model
  isNominate: { type: Boolean, default: false },
  released: Number
});

// create movie model from movieSChema and export movie model

module.exports = mongoose.model("Movie", movieSchema);
