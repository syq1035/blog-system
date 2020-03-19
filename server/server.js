const express = require('express')
const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/blog'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function() {
  console.log('mongo connect success')
})
const app = express()

app.get('/', function(req,res) {
  res.send('hhhhhh')
})

app.listen(4000,function(){
  console.log('listening in 4000')
})