const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const MONGODB_URL = require("./config/mongodb");

const actorsRoutes = require("./routes/actors"); // iöport actors router
const moviesRoutes = require("./routes/movies"); // iöport movies router
const app = express();

//connect mongoose to mongodb
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }) // give options to connect avoid mongoose deprecation warnings
  .then(() => console.log("connected to mongodb..."))
  .catch(err => console.log("Error:", err));

app.use(express.json()); //accecpt json format for request body
app.use(cors()); // use cors library to allow cross origin request(ajax işin içine girince oldu bu-)

app.use("/movies", moviesRoutes); //Set initial root of movies for movies router
app.use("/actors", actorsRoutes); //Set initial root of actors for movies router

const PORT = process.env.PORT || 3000; // set port fron environment variables,if not set default to 3000
app.listen(PORT, () => console.log(`Server is listenin on port ${PORT}`));
