const express = require('express')
const router = express.Router()
const { responseC } = require('../utils/index')
const Comment = require('../models/comment')

router.post('/new', function(req, res){
  let { article_id, user_id, content } = req.body
  const comment = new Comment({
    article_id,
    user_id,
    content
  })
  comment.save()
    .then(data => {
      responseC(res, 200, 0, '评论成功') 
    })
    .catch(err => {
      return responseC(res)
    })
})

module.exports = router;