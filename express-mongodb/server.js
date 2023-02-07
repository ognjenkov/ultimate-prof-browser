require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

const cors = require('cors');

app.use(cors({
    origin:"http://127.0.0.1:5173",
    methods:"GET,POST,PUT,DELETE,PATCH",
    credentials:true
}))

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', ()=> console.error("connected to db"))

app.use(express.json())

const professorRouter = require('./routes/professors')
app.use('/professors', professorRouter)
app.listen(3000, ()=> console.log("server started 3000"))

