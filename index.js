const express = require("express");
const connectDB = require("./config/db"); // Grab the DB connection
const path = require("path");
const app = express();
// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false })); //Now we can accept body data
// Define Routes
app.use("/api/users", require("./routes/users"));
app.get("/api", function(req, res) {
  return res.status(200).json({
    msg: "Welcome to the API"
  });
});
app.get("/", function(req, res) {
  res.send(
    "Go to https://documenter.getpostman.com/view/7764095/SVfNv9Uc?version=latest  to see the API use case examples "
  );
  //Put jwt into HTTP only cookie so js cant access it
  //Dont use local storage for jwt
});
// // Serve static assets in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//   );
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
