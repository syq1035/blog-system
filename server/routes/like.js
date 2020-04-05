const express = require('express')
const router = express.Router()
const { responseC } = require('../utils/index')
const Like = require('../models/like')

router.post('/new', function(req, res){
  const { article_id, user_id } = req.body
  const like = new Like({
    article_id,
    user_id
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
  const { article_id, user_id } = req.body
  const like = new Like({
    article_id,
    user_id
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
  const { article_id, user_id } = req.query
  Like.findOne({ article_id, user_id })
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
  const { article_id } = req.query
  Like.countDocuments({ article_id })
    .then(count => {
      responseC(res, 200, 0, '', {count: count})
    })
    .catch(err => {
      responseC(res)
    })
})

module.exports = router;