/*
* @Author: liqihui
* @Date:  2018/12/19 5:29 PM
* @Todo: WisdomApp
* @Last Modified by: liqihui
*/
import conf from './Conf.json'
import appCnf from './App.json'
import StylesConfig from './StylesConfig'
import {storage} from '../utils/Storage';
global.Cnf = appCnf[conf.mode]
global.globalStyles = StylesConfig
global.storage = storage
global.defaultImg = 'http://wechatapppro-1252524126.file.myqcloud.com/appmxyzh3hm8218/image/compress/5045828024d9b4eae5190a876fc7f1f1.jpg';
