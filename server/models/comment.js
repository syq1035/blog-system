const mongoose = require('mongoose')

const commetSchema = new mongoose.Schema({
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, validate: /\S+/ },
  create_time: { type: Date, default: Date.now },
    
})

module.exports = mongoose.model('Comment', commetSchema)