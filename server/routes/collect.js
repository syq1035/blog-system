const express = require('express')
const router = express.Router()
const { responseC } = require('../utils/index')
const Collect = require('../models/collect')

router.post('/new', function(req, res){
  const { article, user } = req.body
  const collect = new Collect({
    article,
    user
  })
  collect.save()
    .then(data => {
      responseC(res, 200, 0, '收藏成功') 
    })
    .catch(err => {
      return responseC(res)
    })
})

router.post('/del', function(req, res){
  const { article, user } = req.body
  const collect = new Collect({
    article,
    user
  })
  Collect.remove(collect)
    .then(data => {
      responseC(res, 200, 0, '取消收藏') 
    })
    .catch(err => {
      return responseC(res)
    })
})

router.get('/info', function(req, res){
  const { article, user } = req.query
  Collect.findOne({ article, user })
    .then(collect => {
      if(collect){
        responseC(res, 200, 0, '', {iscollect: true})
      }
    })
    .catch(err => {
      responseC(res)
    })
})

router.get('/user', function(req, res) {
  const { user } = req.query
  Collect.find({ user })
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
            viewCount:item.viewCount,
            create_time: item.article.create_time,
            author: item.article.author
          }
        })
        responseC(res, 200, 0, '', data)
      }
    })
    .catch(err => {
      responseC(res)
    })
})

module.exports = router;