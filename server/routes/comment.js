const express = require('express')
const router = express.Router()
const { responseC } = require('../utils/index')
const Comment = require('../models/comment')

router.post('/new', function(req, res){
  let { article, user, content, parentId } = req.body
  const comment = new Comment({
    article,
    user,
    content,
    parentId,
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
    }).populate({ 
      path: 'user',  select: 'name avatar' 
    }).select('-__v').lean()
    
  })
  let twoComment = await Promise.all(promises)
  let comments = []
  oneComment.forEach((item, index) => {
    comments.push({...item, children: twoComment[index]})
  })
  responseC(res, 200, 0, '获取评论列表成功', comments)
}
    
module.exports = router;

// let comments = []
//         oneComment.map(item => {
//           Comment.find({parentId: oneComment._id})
//             .populate({ 
//               path: 'user',  select: 'name avatar' 
//             })
//             .then(twoComment => {
//               if(twoComment) {
//                 console.log('two',twoComment)
//                 comments.push({...item, children: twoComment})
//               }else {
//                 comments.push(item)
//               }
//             })
//             return item
//         })
//         responseC(res, 200, 0, '获取评论列表成功', comments)