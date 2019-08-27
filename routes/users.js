const express = require("express");
const router = express.Router(); //Get express' router
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const zipcodes = require("zipcodes");
const auth = require("../middleware/requireAuth");
const fetch = require("node-fetch");

//Registering user --> Use a put req ---> CREAT (C)RUD
// @ route      POST api/users
// @desc        Register a user
// @access      Public
//Add validation using express validator //Checks: (FIELD, MESSAGE, condition) If it's NOT NOT Empty (Two F --> True, meaning it is empty(tnx discrete math)) post the message
router.post(
  "/signup",
  [
    check("username", "Please add a name")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email ").isEmail(),
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
        process.env.JWS || config.get("jwtSecret"),
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

//Sign in Authentication
router.post(
  "/login",
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
    const { email, password } = req.body; //De-structure the request's data

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
        process.env.JWS || config.get("jwtSecret"), //res.json the token as a object
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

//GETS A LOGGED IN USER ---> READ C(R)UD
// If it's a GET request, authenticate the user and return the users' info
//If we get a post request from the root, it's a sign in, so grab
// @route       GET api/auth
// @desc        Get a logged in user
// @access      Private
//Anything we need to protect a route, we just need to use our middleware...
router.get("/user", auth, async (req, res) => {
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

//Updating a user --> Use a put req ---> CREAT CR(U)D
router.post("/update", auth, async (req, res) => {
  //Pull out the data
  const id = req.id;
  let user = await User.findById(id).select("-password"); // Return all but the PW
  //Assume we are sent a json {"field":"field to edit",
  //                            "value":"updated value"
  //                            }
  const { field, value } = req.body;
  console.log(field);
  //Make sure the field is a valid field(Day or Zipcode)
  //If it's a day of the week, modify that day on their DB record

  //Get the updated user from the db
  user = await User.findById(req.id).select("-password");

  //Return the updated user here.
}); //Note that "/" here refers to the prefix of "api/users" + "/"

//Get users' weather
router.get("/weather", auth, async (req, res) => {
  try {
    // Grab the user
    const user = await User.findById(req.id).select("-password"); //
    console.log(user);
    const zip = user.zipCode;
    console.log(zip);
    const API_KEY = process.env.OWM || config.get("OWM");
    const weather = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&APPID=${API_KEY}`
    );
    const data = await weather.json();
    await console.log(data);
    const weatherDesc = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;
    const currTemp = data.main.temp;
    const currHum = data.main.humidity;
    const payload = {
      weatherDesc,
      currTemp,
      currHum,
      weatherIcon
    };
    res.json(payload);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}); //Note that "/" here refers to the prefix of "api/users" + "/"

//Get users' 5 day weather
router.get("/5day-weather", auth, async (req, res) => {
  try {
    // Grab the user
    const user = await User.findById(req.id).select("-password"); //
    console.log(user);
    const zip = user.zipCode;
    console.log(zip);
    const API_KEY = process.env.OWM || config.get("DARK");
    // const weather = await fetch(
    //   `http://api.openweathermap.org/data/2.5/forecast?zip=${zip}&units=imperial&APPID=${API_KEY}`
    // );
    console.log(zipcodes.lookup(zip));
    const { latitude, longitude } = zipcodes.lookup(zip);
    // console.log("LAt:" + lat + "LONG" + long);
    const weather = await fetch(
      `https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`
    );
    let data = await weather.json();
    // // data = data.list[0];
    await console.log(data);
    const weatherDesc = data.currently.summary,
      weatherIcon = data.minutely.icon,
      temp = data.currently.temperature,
      minutelySummarry = data.minutely.summary,
      minutelyRainPrecip =
        parseInt(data.minutely.data[0].precipProbability) * 100,
      humidity = data.currently.humidity;
    // tempMin = data.main.temp_min,
    // tempMax = data.main.temp_max,
    // main = data.main;
    const payload = {
      weatherDesc,
      temp,
      weatherIcon,
      minutelySummarry,
      minutelyRainPrecip,
      humidity
    };
    res.json(payload);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}); //Note that "/" here refers to the prefix of "api/users" + "/"

module.exports = router;
