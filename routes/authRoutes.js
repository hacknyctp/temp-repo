const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();
const auth = require("../middleware/requireAuth");
// If it's a GET request, authenticate the user
router.get("/", auth, async (req, res) => {
  try {
    console.log(req);
    const user = await User.findById(req.user).select("-password"); // Return all but the PW
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  let { email, password, name } = req.body;
  try {
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password });
    await user.save();

    console.log(`Email ${user.getEmail()}`);
    console.log(`Password ${user.getPassword()}`);
    const valid = bcrypt.compare(password, hash);
    if (valid) {
      console.log("pw matches");
    }

    //Do we want to add in the "expires in"?
    //jwt token created token when signing up
    const token = jwt.sign(
      { userId: user._id, pw: user.password },
      config.get("jwtSecret")
    );
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
