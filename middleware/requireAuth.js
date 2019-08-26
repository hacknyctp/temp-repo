const jwt = require("jsonwebtoken");
const config = require("config");

//Middleware is a function that has access to the req/response cycle/object.
module.exports = function(req, res, next) {
  //Get the token from the header
  const token = req.header("x-auth-token");
  //Check if there is a token
  if (!token) {
    return res.status(401).json({
      msg: "No token, authorization failed."
    });
  }
  //If there is a token..
  try {
    //Verify the Token in the header, pass in our JWT secret
    const decoded = jwt.verify(
      token,
      process.env.jwtSecret || config.get("jwtSecret")
    );
    console.log(decoded);
    req.id = decoded.user.id;
    console.log(req.id);
    next(); // move on
  } catch (err) {
    res.status(401).json({
      msg: "Token is invalid!"
    });
  }
};
