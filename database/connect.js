const mongoose = require('mongoose')

//Connects the database using mongoose for schema integration. 
mongoose.connect(process.env.LOCAL_DB_HOST, { useNewUrlParser: true })
mongoose.Promise = global.Promise
mongoose.connection.on("error", console.log) 
