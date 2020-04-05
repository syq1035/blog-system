const express = require('express')
const router = express.Router()
const { responseC } = require('../utils/index')
const Collect = require('../models/collect')

router.post('/new', function(req, res){
  const { article_id, user_id } = req.body
  const collect = new Collect({
    article_id,
    user_id
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
  const { article_id, user_id } = req.body
  const collect = new Collect({
    article_id,
    user_id
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
  const { article_id, user_id } = req.query
  Collect.findOne({ article_id, user_id })
    .then(collect => {
      if(collect){
        responseC(res, 200, 0, '', {iscollect: true})
      }
    })
    .catch(err => {
      responseC(res)
    })
})

module.exports = router;