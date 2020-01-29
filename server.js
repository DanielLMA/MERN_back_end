const express = require("express");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const mongoose = require("mongoose")
const cors = require('cors')
require ("dotenv").config()

const app = express();

app.use(cors({
  origin: process.env.FRONT_END_DOMAIN
}))

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

mongoose
  .connect(
    "mongodb+srv://danade:123abc@cluster0-ejgeo.mongodb.net/test?retryWrites=true&w=majority",
    { autoIndex: false, useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const passport = require('./config/passport')

app.use(passport.initialize())
app.use(passport.session())

app.use(morgan("combined"));

app.use(require("./routes"));

app.use(express.static("public"));

app.use(require("./middleware/error_handler_middleware"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

module.exports = app;