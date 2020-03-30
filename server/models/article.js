const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  // 文章标题
	title: { type: String, required: true, validate: /\S+/ },

	// 作者
	author: { type: String, required: true },

	// 文章内容
	content: { type: String, required: true, validate: /\S+/ },

	// 标签
	tags: { type: Array, default: [] },

	// 浏览次数
	viewCount: { type: Number, default: 0 },

	//点赞次数
	likeCount: {type: Number, default: 0},

	// 评论次数
  commentCount: { type: Number, default: 0 },

  // 文章发布状态 => 0 草稿，1 已发布
  state: { type: Number, default: 1 },
  
  // 创建日期
	create_time: { type: Date, default: Date.now },

	// 最后修改日期
	update_time: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Articles', articleSchema)