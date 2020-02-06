const mongoose = require("mongoose")
const Schema = mongoose.Schema 

//Image schema requiring name, data, path in order to be used for retrieving cloudinary images.
const ImageSchema = new Schema( {
    imageName: {
        type: String,
        default: "none",
        required: true
    },
    imageData: {
        type: String,
        required: true
    },
    imagePath: {
    	type: String,
    	required:true
    },
    slug: {
        type: String,
    	required:true
    }  
})

const Image = mongoose.model("Image", ImageSchema)

module.exports = { Image, ImageSchema} ;