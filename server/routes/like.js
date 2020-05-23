const express = require('express')
const router = express.Router()
const { responseC } = require('../utils/index')
const Like = require('../models/like')

router.post('/new', function(req, res){
  const { article, user } = req.body
  const like = new Like({
    article,
    user
  })
  like.save()
    .then(data => {
      responseC(res, 200, 0, '点赞成功') 
    })
    .catch(err => {
      return responseC(res)
    })
})

router.post('/del', function(req, res){
  const { article, user } = req.body
  const like = new Like({
    article,
    user
  })
  Like.deleteOne(like)
    .then(data => {
      responseC(res, 200, 0, '取消点赞') 
    })
    .catch(err => {
      return responseC(res)
    })
})

router.get('/info', function(req, res){
  const { article, user } = req.query
  Like.findOne({ article, user })
    .then(like => {
      if(like) {
        responseC(res, 200, 0, '', {islike: true})
      }
      
    })
    .catch(err => {
      responseC(res)
    })
})

router.get('/count', function(req, res){
  const { article } = req.query
  Like.countDocuments({ article })
    .then(count => {
      responseC(res, 200, 0, '获取文章点赞数', {count: count})
    })
    .catch(err => {
      responseC(res)
    })
})

router.get('/user', function(req, res) {
  const { user } = req.query
  Like.find({ user })
    .populate({ 
      path: 'article', 
      populate: { path: 'author', select: 'avatar name' },
    })
    .then(data => {
      if(data){
        data = data.map(item => {
          return {
            _id: item.article._id,
            title: item.article.title,
            description: item.article.description,
            content: item.article.content,
            create_time: item.article.create_time,
            author: item.article.author
          }
        })
        responseC(res, 200, 0, '获取用户点赞列表成功', data)
      }
    })
    .catch(err => {
      responseC(res)
    })
})

module.exports = router;