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
  humidityPercentage: { type: Number },
  country: { type: String },
  city: { type: String },
  zipCode: { type: Number, default: 11216 },
  M: {
    type: String,
    default: "8"
  },
  Tu: {
    type: String,
    default: "8"
  },
  W: {
    type: String,
    default: "8"
  },
  Th: {
    type: String,
    default: "8"
  },
  F: {
    type: String,
    default: "8"
  },
  Sa: {
    type: String,
    default: "8"
  },
  Su: { type: String, default: "8" }
});

// Example adding a schema method using "this"
userSchema.methods.getEmail = function() {
  return this.email;
};
userSchema.methods.getPassword = function() {
  return this.password;
};

module.exports = mongoose.model("user", userSchema);
