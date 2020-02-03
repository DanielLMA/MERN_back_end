const { ContactModel } = require("../database/models/Contact")

async function create(req, res) {

    let { email, name, message} = req.body
    
    let cMessage = await ContactModel.create({ email, name, message})
    .catch(err => res.status(500).send(err))
}

async function show(req, res) {
    // let { id } = req.params
    let message = await ContactModel.findById()
    res.render("form/show", { email, name, message })
}

module.exports = {
    create,
    show
}