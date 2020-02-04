const { Image }  = require('../database/models/Images');

function getImages(req,res){
	Image.find(function(err, images){
		if (err) return next(err);
    	res.json(images);		
	});
}

function postImage(req, res, next){
	Image.create(req.body, function (err, image) {
	    if (err) return next(err);
	    res.json(image);
  	});
}

function updateImage(req, res, next){
	Image.findByIdAndUpdate(req.params.id, req.body, function (err, image) {
	    if (err) return next(err);
	    res.json(image);
	});
}

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