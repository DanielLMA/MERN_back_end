const express = require("express");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const mongoose = require("mongoose")
const cors = require('cors')
require ("dotenv").config()

const app = express();

//Change front end domain here and ... for
app.use(cors({
  origin: process.env.FRONT_END_DOMAIN_LIVE
  // origin: "*"
}))

//getting heroku to work 
app.use(express.static('client/build'));

app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
//--->

//make changes here and connect.js when setting DB_HOST
mongoose
  .connect(
    process.env.DB_HOST,
    { autoIndex: false, useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const passport = require('./config/passport')

app.use(passport.initialize())
app.use(passport.session())

app.use("/uploads", express.static('uploads'))

app.use(morgan("combined"));

app.use(require("./routes"));

//original
// app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));

//calls the error handler middleware when errors arise. 
app.use(require("./middleware/error_handler_middleware"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

module.exports = app;