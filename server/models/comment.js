const mongoose = require('mongoose')

const commetSchema = new mongoose.Schema({
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true, validate: /\S+/ },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
  create_time: { type: Date, default: Date.now },
    
})

module.exports = mongoose.model('Comment', commetSchema)