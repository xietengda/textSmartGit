import request from './request.js'
class api {
  constructor() {
    this._apiUrl = 'https://xml.51itmap.com/qdapi/'
    this._webUrl = 'https://wechatxml.51itmap.com/'
    this._baseUrl = this._apiUrl + '?act='
    this._request = new request
    this._request.setErrorHandler(this.errorHander)
    this._request.setSignSecret('e2f3efdd889e1bab39c981ad46993fda')
    this._request.setSignKey('cdbbf90ec69b7f9df6ff301e58bbff1b')
    var obj = {}
    obj.version = 'v1.0.3'
    this._request.setSignParam(obj)
  }

  /**
   * 统一的异常处理方法 
   */
  errorHander(res) {
    console.error(res)
  }

  //获取url补充静态资源
  getUrl() {
    return this._webUrl
  }

  //检查用户是否存在
  checkUserExist(openid) {
    let data = {
      openid
    }
    return this._request.getRequest(this._baseUrl + 'user/checkUserExist', data).then(res => res.data)
  }

  //检查用户登录状态是否正常
  checkSession(openid) {
    let data = {
      openid
    }
    return this._request.getRequest(this._baseUrl + 'passport/checkSession', data).then(res => res.data)
  }

  //登录
  login(username, password, openid = '') {
    let data = {
      username,
      password,
      openid
    }
    return this._request.postRequest(this._baseUrl + 'passport/act_login', data).then(res => res.data)
  }
}
export default api