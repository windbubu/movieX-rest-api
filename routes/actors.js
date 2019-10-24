const express = require("express");
const router = express.Router();

const Actor = require("../models/Actor");
//create a get request handler for actors
router.get("/", async (req, res) => {
  const actors = await Actor.find(); // get all actors from the actor model

  res.send(actors); // send all actors in response
});

router.get("/:id", async (req, res) => {
  const actorId = req.params.id;
  const actor = await Actor.findById(actorId);

  // if actor non exist send 404
  if (!actor) return res.status(404).send(`actor with id ${actorId} not exist`);

  res.send(actor);
});

router.post("/", async (req, res) => {
  const actor = new Actor(req.body);
  const saved = await actor.save();
  res.send(saved);
});

router.put("/:id", async (req, res) => {
  const actorId = req.params.id;
  const updates = req.body;
  const actor = await Actor.findByIdAndUpdate(actorId, updates, {
    new: true
  });

  if (!actor) return res.status(404).send(`actor with id ${actorId} not exist`);

  res.send(actor);
});

router.delete("/", async (req, res) => {
  const actorId = req.params.id;
  const actor = await Actor.findByIdAndDelete(ActorId);

  if (!deleted)
    return res.status(404).send(`actor with id ${actorId} not exist`);

  res.send(actor);
});
module.exports = router;
