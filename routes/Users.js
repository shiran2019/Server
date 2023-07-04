const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/Authmiddleware");
const { sign } = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const listOfusers = await User.findAll();
  res.json(listOfusers);
});

router.post("/", async (req, res) => {
  const { password, role, user } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      user: user,
      password: hash,
      role: role,
    });
  });

  res.json("SUCCESS");
});

router.post("/login", async (req, res) => {
  const { password, user } = req.body;
  const existingUser = await User.findOne({ where: { user: user } });
  if (!existingUser) {
    res.json({ error: "User Doesn't Exist" });
  } else {
    bcrypt.compare(password, existingUser.password).then((match) => {
      if (!match) {
        res.json({ error: "Wrong Username and Password Combination" });
      } else {
        const accessToken = sign({ user: existingUser.user }, "sec");
        res.json(accessToken);
      }
    });
  }
});

router.get("/auth", validateToken, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
