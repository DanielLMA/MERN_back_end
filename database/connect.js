const mongoose = require('mongoose')
// const keys = require('../config/keys')
require ("dotenv").config()

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true })
mongoose.Promise = global.Promise
mongoose.connection.on("error", console.log) 
//connect