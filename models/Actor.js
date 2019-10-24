const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema({
  name: String,
  surname: String,
  birthDate: Date,
  hasOscar: { type: Boolean, default: false },
  gender: { type: String, enum: ["Female", "Male"] } // enum: sadece string içindeki değerleri alabilir
});

// create actor model from movieSChema and export actors model

module.exports = mongoose.model("Actor", actorSchema);
