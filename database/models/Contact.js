const mongoose = require("mongoose")
const Schema = mongoose.Schema

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