const express = require("express");
const passport = require("passport")
const router = express.Router();
const PageController = require('../controller/page_controller')
const AuthController = require('../controller/auth_controller')
const { authRedirect, authorise } = require('../middleware/auth_middleware')

router.get("/", PageController.index);
 
router.get('/register', authRedirect, AuthController.registerNew)

router.post('/register', AuthController.registerCreate)

router.get('/dashboard', passport.authenticate('jwt', {session: false}), PageController.dashboard)

router.get('/logout', AuthController.logout)

router.get('/login', authRedirect, AuthController.loginNew)

//! shouldn't this be jwt? not local? Reason is, we use both. 
//local and successRedirect before jwt 
router.post('/login', passport.authenticate('jwt', {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    session: false,
}), AuthController.loginCreate)

module.exports = router;
