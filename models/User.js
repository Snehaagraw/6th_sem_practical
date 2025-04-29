const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  age: {
    type: Number,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  gender: String,
  isLegal: {
    type: Boolean,
    required: true
  }
});

userSchema.plugin(passportLocalMongoose); // adds username & password

module.exports = mongoose.model('User', userSchema);
