module.exports = {
  responseC (res, status = 500, code = 3, message = '服务器错误', data={}){
    let resData = {}
    resData.data = data
    resData.code = code
    resData.message = message
    res.status(status).json(resData)
  }
}
