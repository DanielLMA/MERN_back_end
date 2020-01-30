const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


// Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email', usernameUnique: true } )

const UserModel = mongoose.model("user", UserSchema)

module.exports = { UserModel, UserSchema }
