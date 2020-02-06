//app
const express = require("express");
const router = express.Router();

//dependencies. Express middleware
const { celebrate, Joi } = require("celebrate");

//controllers
const AuthController = require("../controller/auth_controller");

//Joi used for validation of email & password 
router.post("/register", celebrate({
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}), AuthController.register);

module.exports = router;