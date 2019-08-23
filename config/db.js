const mongoose = require("mongoose");
const config = require("config");
// const db = config.get("mongoURI");

// // Mongoose returns promises, let's use async await and try-catch
// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.DB || db, {
//             useNewUrlParser: true,
//             useCreateIndex: true,
//             useFindAndModify: false
//         });

//         console.log("MongoDB Connected...");
//     } catch (err) {
//         console.error(err.message);

//         process.exit(1);
//     }
// };

const connectDB = () => {
  //Returns a promise, second param is a obj where you can pass options
  return mongoose.connect("mongodb://localhost:27017/user-wa", {
    useNewUrlParser: true
  }); // (Protocol, hostname, port,  Name of DB)
  // If name of DB does not exist, it will be created...
};

module.exports = connectDB;
