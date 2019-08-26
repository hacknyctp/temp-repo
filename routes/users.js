const express = require("express");
const router = express.Router(); //Get express' router
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/requireAuth");
const fetch = require("node-fetch");

//POST:Submitting some data/adding contact
//GET:Fetch/getting data
//PUT: Update something
//DELETE: Remove something

//Registering user--> Use a put req
// @ route      POST api/users
// @desc        Register a user
// @access      Public
//Add validation using express validator //Checks: (FIELD, MESSAGE, condition) If it's NOT NOT Empty (Two F --> True, meaning it is empty(tnx discrete math)) post the message
router.post(
  "/",
  [
    check("username", "Please add a name")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //If the requirements were NOT met
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      }); //Send a error code and an array of the errors
    }
    //Pull out the data
    const {
      username,
      email,
      password,
      rainPercentage,
      humidityPercentage,
      country,
      city,
      zipCode,
      M,
      Tu,
      W,
      Th,
      F,
      Sa,
      Su
    } = req.body;
    // const user = req.b
    console.log(req.body);
    //Check to see if there is a user with that email
    try {
      let user = await User.findOne({
        email
      }); //Go though the MongoDB and see if the email is already registered
      if (user) {
        return res.status(400).json({
          msg: "User email already in use!"
        });
      }

      //User the user model to make a new user
      console.log("3I made it!");
      //If the email is not already in use..
      user = new User({
        username: username,
        email: email,
        password: password
      });

      //Use bcrypt for password encryption, returns a promise
      const salt = await bcrypt.genSalt(10); //The salt is needed for encryption, higher #rounds=more secure

      user.password = await bcrypt.hash(password, salt); //Gives us a hashed version of the password
      //Save it in the db
      await user.save();
      console.log("4I made it!");

      //Payload  for jwt
      const payload = {
        user: {
          id: user.id
        }
      };
      //jwt takes: Sign, payload, options, and a call back
      //When it expires they'll have to log back in
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 46000
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("SERVER ERROR");
    }
  }
); //Note that "/" here refers to the prefix of "api/users" + "/"

//Get users' weather

router.get("/weather", auth, async (req, res) => {
  try {
    // Grab the user
    const user = await User.findById(req.id).select("-password"); //
    console.log(user);
    const zip = user.zipCode;
    console.log(zip);

    const weather = await fetch(
      // `https://api.darksky.net/forecast/8f5f8c216e72042abc1ee249745ed98c/37.8267,-122.4233`
      `https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&zipcode=${zip}&oneobservation=true&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg`
    );
    const data = await weather.json();
    await console.log(data.observations.location);
    res.json(data.observations.location[0]["observation"][0]["skyDescription"]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}); //Note that "/" here refers to the prefix of "api/users" + "/"

module.exports = router;
