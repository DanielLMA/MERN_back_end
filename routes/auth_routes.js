const express = require("express");
const router = express.Router();
const { celebrate, Joi } = require("celebrate");
const AuthController = require("../controller/auth_controller");

router.post("/register", celebrate({
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}), AuthController.register);

router.post("/form", (req, res) => {
    console.log(req.body)
    res.send(200)
    // FormModel.create(savedData)
  })
  
  router.get("/form", (req, res) => {
    res.send(200)
  })

module.exports = router;