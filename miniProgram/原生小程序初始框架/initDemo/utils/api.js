import request from './request.js'
const _request = new request();
const requestBody = _request.__proto__;
const _apiUrl = 'https://api.hechuangtm.com/';//生产
// const _apiUrl = 'http://122.114.62.254:8084/'; //测试
// const _apiUrl = 'http://192.168.1.200:80/';

class api {

  //获取url补充静态资源
  getUrl() {
    return this._webUrl
  }

  //上传formId
  uploadFormId(formId,memberId){
    let data = {
      formId,
      memberId
    }
    return requestBody.postRequest(_apiUrl + 'wechat/saveFormId', data).then(res => res.data)
  }

  //上传图片，文件
  uploadFile(file){
    let data = {
      file
    }
    return requestBody.uploadFilePost(_apiUrl + 'file/upload', data).then(res => res.data)
  }

  //登录
  loginFun(iv,encryptedData,code) {
    let data = {
      iv,
      encryptedData,
      code
    }
    return requestBody.postRequest(_apiUrl + 'wechat/appLogin', data).then(res => res.data)
  }

  //首页
  getIndexMsg(){
    let data = {}
    return requestBody.getRequest(_apiUrl + 'home/', data).then(res => res.data)
  }


}
export default api