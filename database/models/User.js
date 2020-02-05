const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcryptjs')


// Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email', usernameUnique: true } )

UserSchema.methods.verifyPassword = function(password) {
  console.log('VERIFYING PASSWORD...', bcrypt.compareSync(password, this.password))
  return bcrypt.compareSync(password, this.password);
};

const UserModel = mongoose.model("user", UserSchema)

module.exports = { UserModel, UserSchema }
