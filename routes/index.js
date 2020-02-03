const express = require("express");
const router = express.Router();
const passport = require("passport")
const AuthRoutes = require("./auth_routes");
const PageController = require('../controller/page_controller')
const AuthController = require('../controller/auth_controller')
const ImageModel = require('../database/models/Images')
const ContactModel = require("../controller/contact_controller")
// const { authRedirect, authorise } = require('../middleware/auth_middleware')

router.get("/images", (req,res) => {
    ImageModel.find().then(docs => res.send(docs))
})

router.post("/form", (req, res) => {
    console.log(req.body)
    res.send(200)
    // ContactModel.create()
  })
  
  router.get("/form", (req, res) => {
    res.send(200)
  })

router.use("/auth", AuthRoutes);

// router.get('/dashboard', passport.authenticate('jwt', {session: false}), PageController.dashboard)
// router.get("/", PageController.index);
//local and successRedirect hashed before jwt 
router.post('/login', passport.authenticate('local', {
    // successRedirect: "/",
    // failureRedirect: "/login",
    session: false,
}), AuthController.loginCreate)

router.get('/users', AuthController.getUsers)


//?previous routes before modularize. 
// router.get('/register', authRedirect, AuthController.registerNew)
// router.post('/register', AuthController.registerCreate)
// router.get('/logout', AuthController.logout)
// router.get('/login', authRedirect, AuthController.loginNew)

module.exports = router;
