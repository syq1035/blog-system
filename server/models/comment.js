const mongoose = require('mongoose')

const commetSchema = new mongoose.Schema({
  article_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, validate: /\S+/ },
  create_time: { type: Date, default: Date.now },
    
})

module.exports = mongoose.model('Comment', commetSchema)