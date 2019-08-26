const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/requireAuth");
// If it's a GET request, authenticate the user and return the users' info
//If we get a post request from the root, it's a sign in, so grab

// @route       GET api/auth
// @desc        Get a logged in user
// @access      Private
//Anything we need to protect a route, we just need to use our middleware...
router.get("/", auth, async (req, res) => {
  try {
    // console.log(req.body);
    const id = req.id;
    // console.log(id.user);
    console.log(req.id);
    const user = await User.findById(id).select("-password"); // Return all but the PW
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}); //Note that "/" here refers to the prefix of "api/users" + "/"

//Sign in Authentication
router.post(
  "/",
  [
    check("email", "Please include a valid email"), //Check we got an email
    check("password", "Password is required").exists() //Check we have a pw
  ],
  async (req, res) => {
    //This is from express-validator and returns the errors from the checks given the request
    const errors = validationResult(req);
    //If the requirements were NOT met
    if (!errors.isEmpty()) {
      //Return a status of 400 and an array of the errors
      return res.status(400).json({
        errors: errors.array()
      });
    }

    //If no errors were found(meaning we got a email and pw)
    const { email, password } = req.body; //Destructure the request's data

    //See if it's valid and see if we can hash it and login
    try {
      //Use the User model's method findOne to check if the email is actually registered
      let user = await User.findOne({
        email
      });
      if (!user) {
        return res.status(400).json({
          msg: "Email not registered!"
        });
      }
      console.log(user);

      //If the email exits, let's check the password via a bcrypt.compare hashing
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          msg: "Incorrect password!"
        });
      }

      //If the pw is correct give this payload for jwt
      const payload = {
        user: {
          id: user.id
        }
      };
      //jwt takes: Sign, payload, options, and a call back
      //When it expires they'll have to log back in
      jwt.sign(
        //Sign the jwt with the payload given the secret and set it to expire.
        payload,
        process.env.JWS || config.get("jwtSecret"),
        {
          expiresIn: 46000
        }, //res.json the token as a object
        (err, token) => {
          if (err) throw err;
          res.json({
            token
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
); //Note that "/" here refers to the prefix of "api/users" + "/"

module.exports = router;
