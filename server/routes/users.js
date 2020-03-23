const express = require('express');
const router = express.Router();
const utility = require('utility')
const User = require('../models/user')
const { responseC } = require('../utils/index')

router.post('/register', function(req, res, next){
  let { name, password } = req.body
  console.log(req.body)

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

router.post('/login', function(req, res, next) {
  let { name, password } = req.body
  User.findOne({ name, password: md5Password(password) })
    .then(data => {
      if(data) {
        res.cookie('userid', data._id)
        responseC(res, 200, 0, '登录成功')
      } else {
        res.json({code: 1, massage: '用户名或密码错误'})
      }
    })
    .catch(err => {
      responseC(res)
    })
})

router.get('/', function(req, res, next) {
  res.json({key:1,username:"wyy"});
});

function md5Password(password) {
  const salt = 'loveShenYanqin'
  return utility.md5(password + salt)
}
module.exports = router;
