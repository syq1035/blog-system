const express = require('express');
const router = express.Router();
const Article = require('../models/article')
const User = require('../models/user')
const { responseC } = require('../utils/index')

const _filter = { 'password': 0, '__v': 0 }

router.post('/new', function(req, res){
  let { title, content, author } = req.body
  const article = new Article({
    title,
    content,
    author
  })
  article.save()
    .then(data => {
      responseC(res, 200, 0, '发布文章成功') 
    })
    .catch(err => {
      return responseC(res)
    })
})

router.get('/list', function(req, res) {
  const pageSize = parseInt(req.query.pageSize)
  const pageNum = parseInt(req.query.pageNum-1)
  Article.count()
    .then(count => {
      Article.find().skip(pageSize * pageNum).limit(pageSize).populate({ path: 'users' })
        .then(data => {
          if(data) {
            responseC(res, 200, 0, '', {articles: data, total: count})
          }
        })
    })
    .catch(err => {
      responseC(res)
    })
})

router.delete('/delete', function(req, res){
  const _id = req.query._id
  Article.remove({_id})
    .then(data => {
      responseC(res, 200, 0, '删除成功')
    })
    .catch(err => {
      responseC(res)
    })
})

router.get('/detail', function(req, res) {
  const _id = req.query._id
  Article.findById(_id)
    .then(article => {
      User.findById(article.author, _filter)
        .then(user => {
          responseC(res, 200, 0, '文章详情', {article, user})
        })
    })
    .catch(err => {
      responseC(res)
    })
})

router.put('/view', function(req, res) {
  const {_id }= req.body
  Article.update({_id},{ $inc: { viewCount: 1 } })
    .then(data => {
      responseC(res, 200, 0, '阅读')
    })
    .catch(err => {
      responseC(res)
    })
})

module.exports = router;