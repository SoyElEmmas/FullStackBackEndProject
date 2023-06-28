//este archivo arranca la aplicación

import app from './app'
import './database'
import dotenv from "dotenv"

const port = process.env.port || 5000
const connectDB = require('./database')

//connectDB()

app.listen(port)
console.log("server listening on port", port);