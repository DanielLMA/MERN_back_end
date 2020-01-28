const { UserModel } = require('../database/models/User')
const jwt = require("jsonwebtoken")
// const keys = require('../config/keys')
require ("dotenv").config()

// Render the user registration form
async function registerNew(req, res) {
    res.render('auth/register')
}

// Create a new user
async function registerCreate(req, res) {
    const { email, password } = req.body

    const user = await UserModel.create({  email, password })

    req.login(user, (err) => {
        if (err) {
            return next(err)
        }
        loginCreate(req, res)
    })
    //res.json & pass token
    // res.redirect("/dashboard")
}

async function logout(req, res) {
    req.logout()
    res.redirect('/')
}

async function loginNew(req, res) { 
    res.render('pages/login')
}

//removed SESSION_SECRET? replace with keys.secretOrKey 
async function loginCreate(req, res) {
    const token = jwt.sign({ sub: req.user._id }, process.env.SESSION_SECRET)
    res.json(token)
}

module.exports = {
    registerNew,
    registerCreate,
    logout,
    loginNew,
    loginCreate
}