const express = require('express');
const router = express.Router();
const utility = require('utility')
const User = require('../models/user')
const { responseC } = require('../utils/index')

const _filter = { 'password': 0, '__v': 0 }

router.post('/register', function(req, res){
  let { name, password } = req.body
  User.findOne({name: name})
    .then(data => {
      if(data) {
        return res.json({ code: 1, message: '用户名已存在'})
      }
      User.create({ name, password: md5Password(password) })
        .then(d => {
          responseC(res, 200, 0, '注册成功，请登录~', d) 
        })
    })
    .catch(err => {
      return responseC(res)
    })
  
})

router.post('/login', function(req, res) {
  let { name, password } = req.body
  User.findOne({ name, password: md5Password(password) }, _filter)
    .then(data => {
      if(data) {
        let userInfo = {
          _id: data._id,
          name: data.name,
          avatar: data.avatar,
        };
        req.session.userInfo = userInfo
        responseC(res, 200, 0, '登录成功', data)
      } else {
        res.json({code: 1, message: '用户名或密码错误'})
      }
    })
    .catch(err => {
      responseC(res)
    })
})

router.post('/signout', function(req, res) {
  if (req.session.userInfo) {
    req.session.userInfo = null; 
    responseC(res, 200, 0, '登出成功');
  }
})

router.get('/status', function(req, res) {
  if (req.session.userInfo) {
    responseC(res, 200, 0, '', req.session.userInfo);
  } else {
    responseC(res, 200, 1, '请重新登录', req.session.userInfo);
  }
})

router.get('/list', function(req, res) {
  const pageSize = parseInt(req.query.pageSize)
  const pageNum = parseInt(req.query.pageNum-1)
  User.count()
    .then(count => {
      User.find({}, _filter).skip(pageSize * pageNum).limit(pageSize)
        .then(data => {
          if(data) {
            responseC(res, 200, 0, '', {users: data, total: count})
          }
        })
    })
    .catch(err => {
      responseC(res)
    })
})

router.delete('/delete', function(req, res){
  const _id = req.query._id
  User.deleteOne({_id})
    .then(data => {
      responseC(res, 200, 0, '删除成功')
    })
    .catch(err => {
      responseC(res)
    })
})

router.get('/info', function(req, res){
  const _id = req.query._id
  User.findById(_id, _filter)
    .then(user => {
      responseC(res, 200, 0, '', user)
    })
    .catch(err => {
      responseC(res)
    })
})

function md5Password(password) {
  const salt = 'loveShenYanqin'
  return utility.md5(password + salt)
}

module.exports = router;
