const passport = require("passport");
const { UserModel } = require("../database/models/User");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const LocalStrategy = require('passport-local')

//Passport serialize and deserialize. 
passport.serializeUser((user, done) => {
    done(null, user._id)
}) 
passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id)
        done(null, user)
    }
    catch (error) {
        done(error)
    }
})

//Two strategies used: Local/JWT. 
passport.use(new LocalStrategy({
        usernameField: "email"
    },
    async (email, password, done) => {
        const user = await UserModel.findOne({ email }).catch(done)

        if (!user || !user.verifyPassword(password)) {
            return done(null, false)
        }
        return done(null, user)
    }
))

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SESSION_SECRET
  },
    async (jwt_payload, done) => {
        console.log("jwt accessed")
        const user = await UserModel.findById(jwt_payload.sub).catch(done)
        if (!user) {
            return done(null, false)
        }
        return done(null, user)
    }
  )
);

module.exports = passport;