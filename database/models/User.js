const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcryptjs')


// Creates the user schema with the email & password. 
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

//Utilizes Passport-Local Mongoose is a Mongoose plugin that simplifies building username and password login with Passport.
UserSchema.plugin(passportLocalMongoose, { usernameField: 'email', usernameUnique: true } )

//bcrypt used to hash the password and compare it for verification. 
UserSchema.methods.verifyPassword = function(password) {
  console.log('VERIFYING PASSWORD...', bcrypt.compareSync(password, this.password))
  return bcrypt.compareSync(password, this.password);
};

//creates the user (mongoose) model as user utilizing the UserSchema. 
const UserModel = mongoose.model("user", UserSchema)

module.exports = { UserModel, UserSchema }
