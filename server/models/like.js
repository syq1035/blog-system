const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
  article_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  create_time: { type: Date, default: Date.now }
    
})

module.exports = mongoose.model('Like', likeSchema)