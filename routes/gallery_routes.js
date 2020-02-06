//app
const express = require("express");
const router = express.Router();
const app = express();

//dependencies, authentication 
const bodyParser= require('body-parser');
const { celebrate, Joi } = require("celebrate");


//controllers
const GalleryController = require("../controller/gallery_controller");

app.use(bodyParser.urlencoded({extended: true}));

router.get("/getImages",GalleryController.getImages);

router.post('/postImage', celebrate({
    body: {
        imageName: Joi.string().required(),
        imageData: Joi.string().required(),
        imagePublicId: Joi.string().required(),
        slug: Joi.string().required()
    }
}), GalleryController.postImage);

router.put('/updateImage/:id', celebrate({
    body: {
        imageName: Joi.string().required(),
        imageData: Joi.string().required(),
        imagePublicId: Joi.string().required(),
        slug: Joi.string().required()
    }
}), GalleryController.updateImage);

router.delete('/deleteImage/:id', GalleryController.deleteImage);

module.exports = router; 