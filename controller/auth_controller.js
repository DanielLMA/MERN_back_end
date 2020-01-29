const { UserModel }  = require('../database/models/User')
const JWTService = require("../services/jwt_service");
const HTTPError = require('http-errors')


function register(req, res, next) {
    console.log(req.body)
    const { email, password } = req.body;
    const user = new UserModel({ email, password });

    UserModel.register(user, password, (err, user) => { 
        if (err) {
            return next(new HTTPError(500, err.message));
        }

        const token = JWTService.generateToken(user);

        return res.json({ token });        
    });
}

async function logout(req, res) {
    req.logout()
    res.redirect('/')
}

async function loginNew(req, res) { 
    res.render('pages/login')
}

async function loginCreate(req, res) {
    const token = jwt.sign({ sub: req.user._id }, process.env.SESSION_SECRET)
    res.json(token)
}

module.exports = {
    register,
    logout,
    loginNew,
    loginCreate
}







//! auth controller before modularizing
// const jwt = require("jsonwebtoken")
// const keys = require('../config/keys')
// require ("dotenv").config()

// // Render the user registration form
// async function registerNew(req, res) {
//     res.render('auth/register')
// }

// // Create a new user
// async function registerCreate(req, res) {
//     const { email, password } = req.body

//     const user = await UserModel.create({  email, password })

//     req.login(user, (err) => {
//         if (err) {
//             return next(err)
//         }
//         loginCreate(req, res)
//     })
//     //res.json & pass token
//     // res.redirect("/dashboard")
// }