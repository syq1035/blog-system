const express = require('express')
const router = express.Router()
const { responseC } = require('../utils/index')
const Comment = require('../models/comment')

router.post('/new', function(req, res){
  let { article, user, content, parentId, to } = req.body
  const comment = new Comment({
    article,
    user,
    content,
    parentId,
    to
  })
  comment.save()
    .then(data => {
      responseC(res, 200, 0, '评论成功') 
    })
    .catch(err => {
      return responseC(res)
    })
})

router.get('/article', getCommentsByArticleId)
async function getCommentsByArticleId(req, res) {
  const { article } = req.query
  let oneComment = await Comment.find({ article, parentId: null }).populate({ 
    path: 'user',  select: 'name avatar' 
  }).lean()
  var promises = oneComment.map(item => {
    return Comment.find({
        parentId: item._id
    }).populate([
      { path: 'user',  select: 'name avatar' },
      { path: 'to',  select: 'name' },
    ]).select('-__v').lean()
    
  })
  let twoComment = await Promise.all(promises)
  let comments = []
  oneComment.forEach((item, index) => {
    comments.push({...item, children: twoComment[index]})
  })
  responseC(res, 200, 0, '获取评论列表成功', comments)
}

router.get('/allCount', function(req, res) {
  Comment.aggregate([
    {
      $group:{
        _id: '$article',
        commentCount: { $sum: 1 }
      },
    }
  ]).then(data => {
    if(data){
      responseC(res, 200, 0, '文章评论数量', data)
    }
  })
  .catch(err => {
    responseC(res)
  })
})

router.get('/list', function(req, res) {
  const pageSize = parseInt(req.query.pageSize)
  const pageNum = parseInt(req.query.pageNum-1)
  Comment.count()
    .then(count => {
      Comment.find().skip(pageSize * pageNum).limit(pageSize)
        .populate([
          { path: 'user', select: 'name' },
          { path: 'to', select: 'name' },
          { path: 'article', select: 'title' }
        ])
        .then(data => {
          if(data) {
            responseC(res, 200, 0, '', {comments: data, total: count})
          }
        })
    })
    .catch(err => {
      responseC(res)
    })
})

router.delete('/delete', function(req, res){
  const _id = req.query._id
  Comment.remove({_id})
    .then(data => {
      responseC(res, 200, 0, '删除成功')
    })
    .catch(err => {
      responseC(res)
    })
})

module.exports = router;
