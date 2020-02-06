const { Image }  = require('../database/models/Images');

//retrieving images for gallery_page.js
function getImages(req,res){
	Image.find(function(err, images){
		if (err) return next(err);
    	res.json(images);		
	});
}

//posting images on gallery_page.js
function postImage(req, res, next){
	Image.create(req.body, function (err, image) {
	    if (err) return next(err);
	    res.json(image);
  	});
}

//updating images on gallery_page.js
function updateImage(req, res, next){
	Image.findByIdAndUpdate(req.params.id, req.body, function (err, image) {
	    if (err) return next(err);
	    res.json(image);
	});
}

//removing images on gallery_page.js
function deleteImage(req, res, next){
	Image.findByIdAndRemove(req.params.id, req.body, function (err, deletedimage) {
	    if (err) return next(err);
	    res.json(deletedimage);
	});
}

module.exports = {
    getImages,
    postImage,
    updateImage,
    deleteImage
}