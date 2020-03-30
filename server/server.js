const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
const session = require('express-session');

const userRouter = require('./routes/user')
const articleRouter = require('./routes/article')

const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/Blog'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function() {
  console.log('mongo connect success')
})

const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(
	session({
		secret: 'shenyanqin',
		name: 'session_id', //# 在浏览器中生成cookie的名称key，默认是connect.sid
		resave: true,
		saveUninitialized: true,
		cookie: { maxAge: 60 * 1000 * 30, httpOnly: true }, //过期时间
	})
)

app.use(morgan('dev'));

app.use('/user', userRouter)
app.use('/article', articleRouter)


app.listen(4000, function(){
  console.log('listening in 4000')
})