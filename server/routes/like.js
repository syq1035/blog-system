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
  // Like.find({ article, user }).then(d=>{
  //   if(!d){
  //     like.save()
  //     .then(data => {
  //       responseC(res, 200, 0, '点赞成功') 
  //     })
  //   }
  // })
  // .catch(err => {
  //   return responseC(res)
  // })
})

router.post('/del', function(req, res){
  const { article, user } = req.body
  Like.deleteOne({ article, user })
    .then(data => {
      if(data) {
        responseC(res, 200, 0, '取消点赞') 
      }
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
            viewCount:item.viewCount,
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

router.get('/allCount', function(req, res) {
  Like.aggregate([
    {
      $group:{
        _id: '$article',//分组条件
        likeCount: { $sum: 1 }//类似于.count 但这是是管道函数　　所以还需要加上$sum关键词
      },
    }
  ]).then(likeCount => {
    if (req.session.userInfo) {
      Like.find({user: req.session.userInfo._id})
        .then((likeArticle) => {
          if(likeArticle){
            likeArticle = likeArticle.map(item => {
              return item.article
            })
          }
          responseC(res, 200, 0, '文章点赞数量', {likeCount: likeCount, likeArticle: likeArticle})
        })
    } 
    else{
      responseC(res, 200, 0, '文章点赞数量', {likeCount: likeCount, likeArticle: []})
    }
  })
  .catch(err => {
    responseC(res)
  })
})

module.exports = router;