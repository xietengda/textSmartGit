import {AsyncStorage} from 'react-native'

/**
 *@ClassName:StorageUtils.js
 *@Describe:本地数据存取的简单封装
 *@Author:grofis
 *@Time:2018/8/8 16:00
 **/
export default class StorageUtils {
  /**
     * 获取
     * @param key
     * @returns {Promise<T>|*|Promise.<TResult>}
     */
  static get (key, callback) {
    return AsyncStorage.getItem(key, (error, object) => {
      callback(object, error)
      return object
    })
  }

  static getBack (key) {
    return AsyncStorage.getItem(key, (object) => {
      return object
    })
  }

  /**
     * 保存
     * @param key
     * @param value
     * @returns {*}
     */
  static set (key, value, callback) {
    if (typeof value === 'object') {
      return AsyncStorage.setItem(key, JSON.stringify(value), callback)
    } else {
      return AsyncStorage.setItem(key, value, callback)
    }
  }

  /**
     * 更新
     * @param key
     * @param value
     * @returns {Promise<T>|Promise.<TResult>}
     */
  static update (key, value) {
    StorageUtils.set(key, value)
  }

  /**
     * 删除
     * @param key
     * @returns {*}
     */
  static delete (key) {
    return AsyncStorage.removeItem(key)
  }

  /**
     * 清除所有Storage
     */
  static clear () {
    AsyncStorage.clear()
  }

  /**
     * 获取
     * @param key
     * @returns {Promise<T>|*|Promise.<TResult>}
     */

  static query (key) {
    return AsyncStorage.getItem(key).then((value) => {
      const jsonValue = JSON.parse(value)
      return jsonValue
    })
  }

  /**
     * 保存
     * @param key
     * @param value
     * @returns {*}
     */
  static save (key, value) {
    if (typeof value === 'object') {
      return AsyncStorage.setItem(key, JSON.stringify(value))
    } else {
      return AsyncStorage.setItem(key, value + '')
    }
  }
}
