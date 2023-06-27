//este archivo arranca la aplicación

import app from './app'
import './database'
const port = process.env.port || 5001
const connectDB = require('./database')

//connectDB()

app.listen(port)
console.log("server listening on port", port);