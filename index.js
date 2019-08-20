const express = require("express");
const fetch = require("node-fetch");
const PORT = process.env.PORT || 5000;

const app = express(); // Init express

// Example with github api, this is middleware
getLocation = async (req, res, next) => {
  try {
    console.log("Grabbing user data....");
    //De-structure from the response
    const { username } = req.params; //Note the params
    console.log(req.params);
    console.log(`Grabbing data for ${username}`);
    //Await the API request
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json(); //Grab the key value pair JS representation
    let { location } = data;
    if (location == null) {
      return res.send(`User ${username} did not provide a location :(`);
    }
    return res.send(`User ${username} is located in ${location}`);
  } catch (err) {
    console.error(err);
    console.log("An error ocurred");
    res.status(500); //Respond with a server error
  }
};

//Make the route on the app given the username
//Note that :username will be passed as this.params
app.get("/location/:username", getLocation); // When that endpoint is hit, use this "getLocation function"

app.get("/", (req, res) => res.send("Hello from home"));

// Tell the express app to listen
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
