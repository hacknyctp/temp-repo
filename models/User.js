const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
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
  },
  rainPercentage: {
    type: Number
  },
  humidityPercentage: {
    type: Number
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  zipCode: {
    type: Number,
    default: 11216
  },
  M: {
    type: String
  },
  Tu: {
    type: String
  },
  W: {
    type: String
  },
  Th: {
    type: String
  },
  F: {
    type: String
  },
  Sa: {
    type: String
  },
  Su: {
    type: String
  }
});

// Example adding a schema method using "this"
userSchema.methods.getEmail = function() {
  return this.email;
};

module.exports = mongoose.model("user", userSchema);
