const express = require("express");
const Users = require("../data/usersModel");

const server = express();

server.use(express.json());

server.get("/users", (req, res) => {
  Users.get()
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

server.post("/users", (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ error: "Missing required name field" });
  }

  Users.insert(req.body)
    .then((id) => {
      res.status(201).json({ id });
    })
    .catch((err) => {
      if (!res.headersSent) res.status(500).json({ error: err.message });
    });
});

server.delete("/users/:id", (req, res) => {
  Users.remove(req.params.id)
    .then((count) => {
      if (!count) {
        res.status(404).json({ error: `No user with id ${req.params.id}` });
      }
      res.status(204).json({ deleted: `User with id ${req.params.id}` });
    })
    .catch((err) => {
      if (!res.headersSent) res.status(500).json({ error: err.message });
    });
});

module.exports = server;
