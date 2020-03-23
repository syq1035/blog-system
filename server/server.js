const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const usersRouter = require('./routes/users')

const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/Blog'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function() {
  console.log('mongo connect success')
})

const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/user', usersRouter);


app.listen(4000, function(){
  console.log('listening in 4000')
})