const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
// const User = mongoose.model("User"); //Grab the model
const User = require("../models/User");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(req.body);
    const user = new User({ email, password });
    await user.save();

    //Do we want to add in the "expires in"?
    //jwt token created token when signing up
    const token = jwt.sign({ userId: user._id }, config.get("jwtSecret"));
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
