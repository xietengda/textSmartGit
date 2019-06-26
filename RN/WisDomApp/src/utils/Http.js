import axios from 'axios'
import qs from 'qs'
import {Platform} from 'react-native'
const API_DOMAIN = Cnf.API_DOMAIN
// requst 拦截
axios.interceptors.request.use((config) => {
  // loading
  return config
}, (error) => {
  // request error
  console.log(error)
  return Promise.reject(error)
})

// response 拦截
axios.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  return Promise.reject(error)
})

function checkStatus (response) {
  // console.log('===============收到请求：', url, response)
  // 如果http请求状态吗码正常。直接返回response
  if (response && response.status === 200) {
    // 可以处理返回数据格式
    return response
  }
  return {status: -404, msg: '网络异常'}
}

function post (url, data) {
  try {
    const configParams = {
      method: 'post',
      baseURL: API_DOMAIN,
      url: url,
      data: qs.stringify(data),
      timeout: 13000,

      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': global.UserToken
      }
    }
    return axios(configParams).then((response) => {
      return checkStatus(response)
    }).catch((error) => {
    })
  } catch (error) {
    console.log('===============请求错误err2：', url, error)
    return error
  }
}

function get (url, data) {
  try {
    const configParams = {
      method: 'get',
      baseURL: API_DOMAIN,
      url: url,
      params: qs.stringify(data), // get 请求时带的参数
      timeout: 13000,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': global.UserToken
      }
    }
    // alert('para-'+qs.stringify(data));
    return axios(configParams).then((response) => {

      console.log('response-x--xx-x--',response);
      return checkStatus(response)
    }).catch((error) => {

    })
  } catch (error) {
    const status = {code: 1, status: '网络发生错误', error}
    return status
  }
}

function uploadImage (file, data) {
  let formData = new FormData() // 因为需要上传多张图片,所以需要遍历数组,把图片的路径数组放入formData中
  formData.append('Filename', file.fileName) // 这里的files就是后台需要的key
  let para = {uri: Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri, name: 'image.jpg', type: 'multipart/form-data'}
  formData.append('userfile', para)
  try {
    const configParams = {
      method: 'post',
      baseURL: API_DOMAIN,
      url: Cnf.IMG_DOMAIN + '01/upload',
      data: data.length>0 ? data : formData,
      timeout: 13000,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      }
    }
    return axios(configParams).then((response) => {
      return checkStatus(response)
    }).catch((error) => {
    })
  } catch (error) {
    return error
  }
}

export {
  post, // 表单形式提交
  get,
  uploadImage,
}
