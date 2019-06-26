import md5 from './md5.js'
var urlEncode = function (param, key, encode) {
  if (param == null) return '';
  var paramStr = '';
  var t = typeof (param);
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
};
class request {
  constructor() {
    this._defaultHeader = { 'content-type': 'application/x-www-form-urlencoded' }
    this._header = this._defaultHeader
  }

  /**
   * 设置统一的异常处理
   */
  setErrorHandler(handler) {
    this._errorHandler = handler;
  }

  /**
   * 设置Key Secret
   */
  setSignSecret(secret) {
    this._secret = secret
  }
  setSignKey(key) {
    this._key = key
  }

  /**
    * 设置常规参数
    */
  setSignParam(param) {
    this._param = param
  }

  /**
   * GET类型的网络请求
   */
  getRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'GET')
  }

  /**
   * DELETE类型的网络请求
   */
  deleteRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'DELETE')
  }

  /**
   * PUT类型的网络请求
   */
  putRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'PUT')
  }

  /**
   * POST类型的网络请求
   */
  postRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'POST')
  }

  /**
   * 图片上传请求
   */
  uploadImage(url, img, data, name) {
    return this.upload(url, img, data, name)
  }

  /**
   * 上传请求
   */
  upload(url, files, data, name) {
    var data = Object.assign(data, this._param);
    data.api_key = this._key
    data.api_sign = this.sign(data)
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: url,
        filePath: files,
        name: name,
        formData: data,
        success: (res => {
          if (res.statusCode === 200) {
            //200: 服务端业务处理正常结束
            resolve(res)
          } else {
            //其它错误，提示用户错误信息
            if (this._errorHandler != null) {
              //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
              this._errorHandler(res)
            }
            reject(res)
          }
        }),
        fail: (res => {
          if (this._errorHandler != null) {
            this._errorHandler(res)
          }
          reject(res)
        })
      })
    })
  }

  /**
   * 获取get的URL
   */
  getRquestUrl(url, data) {
    var data = Object.assign(data, this._param);//Object.assign合并对象
    data.device = 'xcx'
    data.timestamp = Date.parse(new Date()) / 1000
    data.api_key = this._key
    data.api_sign = this.sign(data);
    return url + urlEncode(data);
  }

  /**
   * 网络请求
   */
  requestAll(url, data, header, method) {
    var data = Object.assign(data, this._param);//Object.assign合并对象
    data.device = 'xcx'
    data.timestamp = Date.parse(new Date()) / 1000
    data.api_key = this._key
    data.api_sign = this.sign(data);
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        header: header,
        method: method,
        success: (res => {
          if (res.statusCode === 200) {
            //200: 服务端业务处理正常结束
            resolve(res)
          } else {
            //其它错误，提示用户错误信息
            if (this._errorHandler != null) {
              //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
              this._errorHandler(res)
            }
            reject(res)
          }
        }),
        fail: (res => {
          if (this._errorHandler != null) {
            this._errorHandler(res)
          }
          reject(res)
        })
      })
    })
  }

  /**
   * 签名
   */
  sign(data) {
    var str = ''
    var data = this.objKeySort(data);
    for (var p in data) {
      str = str + p + data[p];
    }
    var str = this._key + str + this._secret
    return md5.md5(str).toLowerCase();
  }

  objKeySort(arys) {
    var newkey = Object.keys(arys).sort();
    var newObj = {};
    for (var i = 0; i < newkey.length; i++) {
      newObj[newkey[i]] = arys[newkey[i]];
    }
    return newObj;
  }
}

export default request