const express = require("express");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const mongoose = require("mongoose")
// const expressSession = require('express-session')
// const MongoStore = require('connect-mongo')(expressSession)
require ("dotenv").config()

// const { UserModel } = require('./database/models/User')

// const db = require("./config/keys").mongoURI;

const app = express();

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// app.use(expressSession({
//     secret: process.env.SESSION_SECRET,
//     cookie: {
//         expires: 600000000 
//     },
//     store: new MongoStore({ mongooseConnection: mongoose.connection })
// }))

mongoose
  .connect(
    "mongodb+srv://danade:123abc@cluster0-ejgeo.mongodb.net/test?retryWrites=true&w=majority",
    { autoIndex: false, useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Atlas successfully connected"))
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

app.get('/', (req, res) => res.send("API Running"));

module.exports = app;


// // const app = require('./app.js')

// const express = require("express");
// const mongoose = require("mongoose");
// const passport = require("passport");
// const users = require("./routes/api/users");
// const app = express();

// // DB Config
// const db = require("./config/keys").mongoURI;

// // Connect to MongoDB
// mongoose
//   .connect(
//     db,
//     { useNewUrlParser: true }
//   )
//   .then(() => console.log("MongoDB successfully connected"))
//   .catch(err => console.log(err));

//   //using the JWT strategy for authentication 
//   passport.use(new JwtStrategy({
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: process.env.SESSION_SECRET
//   },
//     async (jwt_payload, done) => {
//       const user = await UserModel.findById(jwt_payload.sub).catch(done)

//       if (!user) {
//         return done(null, false)
//       }

//       return done(null, user)
//     }
//   )
//   )

// // Passport middleware
// app.use(passport.initialize());

// //needed? only for local strategy
// app.use(passport.session())

// // Passport config
// require("./config/passport")(passport);

// // Routes
// app.use("/api/users", users);

// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Server up and running on port ${port} !`));

// app.get('/', (req, res) => res.send("API Running"));

// module.exports = app 