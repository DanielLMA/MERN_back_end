//app
const express = require("express");
const router = express.Router();

//authentication
const passport = require("passport")

//controllers
const AuthController = require('../controller/auth_controller')

//models
const ImageModel = require('../database/models/Images')
const ContactModel = require("../controller/contact_controller")

//routes
const GalleryRoutes = require("./gallery_routes");
const AuthRoutes = require("./auth_routes");


//Image displaying routes for gallery page. 
router.get("/images", (req,res) => {
    ImageModel.find().then(docs => res.send(docs))
})
//Directs to GalleryRoutes subdirectory for uploading functionality of gallery page.
router.use("/uploadingToGallery", GalleryRoutes);

//Routes for Post and Get of the form from the contact form. 
router.post("/form", (req, res) => {
    console.log(req.body)
    res.sendStatus(200)
    ContactModel.create(req)
})
  router.get("/form", (req, res) => {
      console.log("Route works")
    res.sendStatus(200)
  })

//Routes used for Logging in and creating a user

//For authentication of a new user. Directs to AuthRoute sub-directory. 
router.use("/auth", AuthRoutes);

//Route used to direct a login and authenticate using passport. Login is created using a method within the AuthController. 
router.post('/login', passport.authenticate('local', {
    // successRedirect: "/",
    // failureRedirect: "/login",
    session: false,
}), AuthController.loginCreate)

//Test route for retrieving all users 
router.get('/users', AuthController.getUsers)

module.exports = router;
