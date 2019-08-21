const mongoose = require("mongoose"); // Grab mongoose

const connect = () => {
  //Returns a promise, second param is a obj where you can pass options
  return mongoose.connect("mongodb://localhost:27017/heyhey", {
    useNewUrlParser: true
  }); // (Protocol, hostname, port,  Name of DB)
  // If name of DB does not exist, it will be created...
};

//Ids will be auto generated
const apple = new mongoose.Schema({
  name: String
});

//"registering" our schema
//name of collection, schema
const Apple = mongoose.model("apple", apple); //Mongo will pluralize this for us! Easy to relate a student.
//Reference to a model that is a representation of a collection

//We can call this function directly to connect
connect()
  .then(async connection => {
    //Write operations to get the db
    //Call the .create() on our model
    const apple = await Apple.create({ name: "Macintosh" });
    console.log(apple);
  })
  .catch(e => console.error(e));
