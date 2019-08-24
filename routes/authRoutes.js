const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();

router.post("/signup", async (req, res) => {
  let { email, password } = req.body;
  try {
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ email, password });
    await user.save();

    console.log(`user email ${user.getEmail()}`);
    console.log(`user password ${user.getPassword()}`);
    // Load hash from your password DB.
    const valid = bcrypt.compare("strin", hash);
    if (valid) {
      console.log("pw matches");
    }

    //Do we want to add in the "expires in"?
    //jwt token created token when signing up
    const token = jwt.sign(
      { userId: user._id, pw: user.password },
      config.get("jwtSecret")
    );
    console.log(token);
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
