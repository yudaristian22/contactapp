const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  bio: {
    type: String,
    require: true,
  },
  birthdate: {
    type: Date,
    require: true,
  },
  created: {
    type: String,
    require: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
