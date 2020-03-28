const express = require('express');
const router = express.Router();
const Article = require('../models/article')
const { responseC } = require('../utils/index')

router.post('/new', function(req, res){
  let { title, content } = req.body
  const article = new Article({
    title,
    content,
    author: req.cookies.userid
  })
  article.save()
    .then(data => {
      responseC(res, 200, 0, '发布文章成功') 
    })
    .catch(err => {
      return responseC(res)
    })
})

module.exports = router;