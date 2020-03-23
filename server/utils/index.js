module.exports = {
  responseC (res, status = 500, code = 3, message = '服务器错误', data={}){
    let resData = {}
    resData.message = message
    resData.data = data
    resData.code = code
    res.status(status).json(resData)
  }
}
