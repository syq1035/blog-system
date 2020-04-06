const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, default: '' },
  password: { type: String, required: true, default: '' },

  //用户类型 0：管理员，1：普通用户
  type: { type: Number, default: 1 },

  phone: { type: String, default: '' },
  avatar: { type: String, default: '' },
  create_time: { type: Date, default: Date.now },
  update_time: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', userSchema)