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
  Article.countDocuments()
    .then(count => {
      Article.find().skip(pageSize * pageNum).limit(pageSize).populate({ path: 'users' })
        .populate([
          { path: 'author', select: 'name' }
        ])
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

router.get('/info', function(req, res) {
  const author = req.query.author
  Article.find({author: author})
    .then(article => {
      responseC(res, 200, 0, '', article)
    })
    .catch(err => {
      responseC(res)
    })
})

router.put('/view', function(req, res) {
  const {_id }= req.body
  Article.updateOne({_id},{ $inc: { viewCount: 1 } })
    .then(data => {
      responseC(res, 200, 0, '阅读')
    })
    .catch(err => {
      responseC(res)
    })
})

router.get('/search', function(req, res) {
  const {text} = req.query
  Article.find({
    $or: [ //多条件，数组
      {title : {$regex : text, $options: '$i'}},
      {content : {$regex : text, $options: '$i'}}
    ]
  }).populate([
    { path: 'author', select: 'name avatar' }
  ])
  .then(data => {
    if(data) {
      responseC(res, 200, 0, '搜索成功', data)
    }
  })
})

module.exports = router;