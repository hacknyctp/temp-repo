const express = require("express");
const connectDB = require("./config/db"); // Grab the DB connection
const path = require("path");
const app = express();
// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false })); //Now we can accept body data
process.env.NODE_ENV = "production";
// Define Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/users"));
app.get("/api", function(req, res) {
  res.send("Welcome to the API");
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
