const mongoose = require("mongoose")
const Schema = mongoose.Schema


//contact schema for contact form from contact_page.js in react app. 
const ContactSchema = new Schema( {
    email: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    message: {
        type: String
    }
})

const ContactModel = mongoose.model("Message", ContactSchema)

module.exports = { ContactModel, ContactSchema };