const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Example adding a schema method using "this"
userSchema.methods.getEmail = function() {
  return this.email;
};
userSchema.methods.getPassword = function() {
  return this.password;
};

module.exports = mongoose.model("user", userSchema);
