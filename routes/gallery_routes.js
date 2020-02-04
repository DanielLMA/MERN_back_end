const express = require("express");
const router = express.Router();
const bodyParser= require('body-parser');
const { celebrate, Joi } = require("celebrate");
const GalleryController = require("../controller/gallery_controller");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

router.get("/getImages",GalleryController.getImages);

router.post('/postImage', celebrate({
    body: {
        imageName: Joi.string().required(),
        imageData: Joi.string().required(),
        imagePath: Joi.string().required(),
        slug: Joi.string().required()
    }
}), GalleryController.postImage);

router.put('/updateImage/:id', celebrate({
    body: {
        imageName: Joi.string().required(),
        imageData: Joi.string().required(),
        imagePath: Joi.string().required(),
        slug: Joi.string().required()
    }
}), GalleryController.updateImage);

router.delete('/deleteImage/:id', GalleryController.deleteImage);

module.exports = router; 