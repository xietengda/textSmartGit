
'use strict'
 
const chalk = require('chalk')
const path = require('path')

const ENV_LIST = [
    {
        //开发环境
        envName: 'dev',
        dirName: 'dev',
        proUrl:'fundar.cn',
        baseUrl:'http://192.168.1.10:8082',
        assetsPublicPath:'./'
    },
    {
        //测试环境
        envName: 'test',
        dirName: path.resolve(__dirname, '../wechain'),
        proUrl:'zhixuexi.h5.com',
        baseUrl: 'http://zhixuexi.h5.com/',
        assetsPublicPath: './'
    },
    {
        //生产环境（命令行参数（process.arg）中prod是保留字，所以使用pro）
        envName: 'pro',
        dirName: path.resolve(__dirname, '../wechain'),
        proUrl:'chjgashapon.webapp.lmh5.com',
        baseUrl: 'http://chjnewbase-api.webapp.lmh5.com/',
        // proUrl:'https://chjgashapon.yaoqingwo.com',
        // baseUrl: 'https://chjnewbase-api.yaoqingwo.com/',
        assetsPublicPath:'./'
    },
 
]
//获取命令行参数 http://nodejs.cn/api/process.html#process_process_argv
const argv = JSON.parse(process.env.npm_config_argv).original || process.argv
const HOST_ENV = argv[2] ? argv[2].replace(/[^a-z]+/ig,"") : ''
const HOST_CONF = HOST_ENV  ? ENV_LIST.find(item => item.envName === HOST_ENV) : ENV_LIST[0]
process.env.BASE_URL = HOST_CONF.baseUrl
process.env.HOST = HOST_CONF.proUrl
console.log(chalk.green('当前环境项目指向域名：'))
console.log(process.env.HOST)
console.log(chalk.green('当前环境：'))
console.log(HOST_ENV)
console.log(chalk.green('当前环境对应的常量：'))
console.log(HOST_CONF)
 
module.exports.HOST_CONF = HOST_CONF
module.exports.ENV_LIST = ENV_LIST