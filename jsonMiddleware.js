var url = require('url')
var path = require('path')
var fs = require('fs')

var baseFolder = './dist'

/*
处理ajax请求的json文件，模拟服务端 正常、超时和出错时的响应。支持post方法。
使用方法：
    json对象增加可选属性_ajaxFail和_timeout。
    _ajaxFail为true时，http响应状态码为500，ajax请求失败。
    _timeout为超时时间，该时间过后才返回结果，单位为秒。
*/
function handJsonFile(req, res){
  var pathname = url.parse(req.url, true).pathname 

  // 1. 文件未找到，返回404
  var filePath = path.join(baseFolder, 'data', pathname)
  try{
    var fsStats = fs.statSync(filePath)
    var fileExist = fsStats.isFile()
  }catch(e){
    fileExist = false
  }    
  if(!fileExist){
    res.statusCode = 404
    res.end(filePath + ' not found')
    return
  }

  // 解析文件
  var fileString = fs.readFileSync(filePath, {encoding: 'utf8'})
  try{
    var fileJson = JSON.parse(fileString)
  }catch(e){      
    res.statusCode = 500  // 无效的json文件，返回500
    res.end(filePath + '解析异常')
    return
  }
  
  // 2. _ajaxFail设为true时，返回状态码500，ajax请求失败   
  if(fileJson._ajaxFail){
    res.statusCode = 500
    res.end('ajax失败')
    return
  }

  // 3. 未设置_timeout，或_timeout值不是数字，立即返回(_timeout=0)
  var _timeout = fileJson._timeout
  var timeoutVal = (!_timeout || isNaN(_timeout)) ? 0 : parseInt(_timeout)
  setTimeout(function(){
    res.writeHead(200, {'Content-type':'application/json'})
    res.end(fileString)
  }, timeoutVal*1000)
}

module.exports = handJsonFile

