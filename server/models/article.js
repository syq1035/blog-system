const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  // 文章标题
	title: { type: String, required: true, validate: /\S+/ },

	// 文章关键字（SEO）
	keyword: [{ type: String, default: '' }],

	// 作者
	author: { type: String, required: true, validate: /\S+/ },

	// 文章描述
	desc: { type: String, default: '' },

	// 文章内容
	content: { type: String, required: true, validate: /\S+/ },

	// 字数
  numbers: { type: String, default: 0 },
  
  // 文章发布状态 => 0 草稿，1 已发布
  state: { type: Number, default: 1 },
  
  // 创建日期
	create_time: { type: Date, default: Date.now },

	// 最后修改日期
	update_time: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Aeticle', articleSchema)