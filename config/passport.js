const passport = require("passport");
const { UserModel } = require("../database/models/User");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const LocalStrategy = require('passport-local')
require ("dotenv").config()

//SERIALIZE AND DESERIALIZE 
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

//STRATEGIES. MAY CONVERT ALL TO JWT STRATEGY IN THE END. 
passport.use(new LocalStrategy({
        usernameField: "email"
    },
    async (email, password, done) => {
        const user = await UserModel.findOne({ email }).catch(done)

        if (!user || !user.verifyPasswordSync(password)) {
            return done(null, false)
        }
        return done(null, user)
    }
))
passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // secretOrKey: keys.secretOrKey
    secretOrKey: process.env.SESSION_SECRET
  },
    async (jwt_payload, done) => {
        const user = await UserModel.findById(jwt_payload.sub).catch(done)
        if (!user) {
            return done(null, false)
        }
        return done(null, user)
    }
  )
);

// passport.serializeUser(UserModel.serializeUser());
// passport.deserializeUser(UserModel.deserializeUser());

// passport.use(new JwtStrategy({
//         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//         secretOrKey: process.env.SESSION_SECRET
//     },
//     async (jwt_payload, done) => {
//         try{
//             const user = await UserModel.findById(jwt_payload.sub);

//             if (!user) {
//                 return done(null, false);
//             }

//             return done(null, user);           
//         } catch (error) {
//             return done(error);
//         }
//     }
// ));

module.exports = passport;