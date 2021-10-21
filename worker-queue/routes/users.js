const express = require("express");
const router = express.Router();
const User = require("../models/User");

// @route   POST /queue/users
// @desc    Register a user in git service
// @access  CORS
router.post("/:name", async (req, res) => {
  const name = req.params.name;
  const user = new User(name);
  user.create((id) => {
    console.log(id);
    res.json({ id });
  });
});

// @route   DELETE /queue/users
// @desc    Register a user in git service
// @access  CORS
router.delete("/:name", async (req, res) => {
  const name = req.params.name;
  const user = new User(name);
  user.delete((id) => {
    console.log(id);
    res.json({ id });
  });
});

// @route   GET /queue/users
// @desc    Register a user in git service
// @access  CORS
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = new User(id);
  user.check((status) => {
    console.log(status);
    res.json({ status });
  });
});

module.exports = router;
