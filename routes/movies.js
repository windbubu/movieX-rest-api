const express = require("express");
const router = express.Router();

const Movie = require("../models/Movie");
const Actor = require("../models/Actor");

//create a get request handler for movies
router.get("/", async (req, res) => {
  const movies = await Movie.find();

  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movieId = req.params.id;
  const movie = await Movie.findById(movieId);

  // if movie non exist send 404
  if (!movie) return res.status(404).send(`movie with id ${movieId} not exist`);

  res.send(movie);
});

// add an actor to a movie /movieId/actors/:actorId
router.post("/:movieId/actors/:actorId", async (req, res) => {
  const movieId = req.params.movieId;
  const actorId = req.params.actorId;

  const movie = await Movie.findById(movieId).populate("actors");

  // if movie not exist
  if (!movie) return res.status(404).send(`movie with id ${movieId} not exist`);

  const actor = await Actor.findById(actorId);

  // if actor not exist
  if (!actor) return res.status(404).send(`actor with id ${actorId} not exist`);

  const isActorExist = movie.actors.find(actor => actorId === actor.id);

  if (isActorExist)
    return res
      .status(400)
      .send(`actor with id ${actorId} already exist in movie id ${movieId}`);

  movie.actors.push(actor);
  await movie.save();
  res.send(movie);
});

router.get("/:id/actors", async (req, res) => {
  const movieId = req.params.id;
  const movie = await Movie.findById(movieId).populate("actors");

  if (!movie) return res.status(404).send(`movie with id ${movieId} not exist`);

  res.send(movie.actors);
});

//create a POSt request handler for/movies to create a movie in db

router.post("/", async (req, res) => {
  const movie = new Movie(req.body);
  const saved = await movie.save(); // save a movie to mongo db
  res.send(saved);
});

// create a PUT request handler for /movies/:id, to update a movie s data

router.put("/:id", async (req, res) => {
  const movieId = req.params.id; // get id parameter from url
  const updates = req.body; // get request body for updates
  const movie = await Movie.findByIdAndUpdate(movieId, updates, { new: true });

  if (!movie) return res.status(404).send(`movie witd id ${movieId} not exist`);

  res.send(movie);
});

// create a DELETE request handler for /moviest/:id, to delete a movie from db

router.delete("/:id", async (req, res) => {
  const movieId = req.params.id;
  const movie = await Movie.findByIdAndDelete(movieId);

  if (!movie) return res.status(404).send(`movie with id ${movieId} not exist`);

  res.send(movie);
});

module.exports = router;
