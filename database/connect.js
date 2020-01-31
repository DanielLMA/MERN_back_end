const mongoose = require('mongoose')

//Change here and server.js when setting DB_HOST
mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true })
mongoose.Promise = global.Promise
mongoose.connection.on("error", console.log) 

//test12